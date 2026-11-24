package eu.ampel_platform.messaging_sdk.inbox.persistence.db;

import eu.ampel_platform.messaging_sdk.inbox.model.*;
import eu.ampel_platform.messaging_sdk.inbox.persistence.InboxPayloadSerializationException;
import eu.ampel_platform.messaging_sdk.inbox.persistence.InboxPayloadSerializer;
import eu.ampel_platform.messaging_sdk.inbox.persistence.InboxRecordRepository;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Range;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static java.util.Objects.requireNonNull;

/**
 * A storage solution for {@link InboxRecord}s backed by a PostgreSQL database, using JDBI as an abstraction layer.
 *
 * @since 2.0.0
 */
public final class JdbiPostgresInboxRecordRepository implements InboxRecordRepository {

    private final RowMapper<InboxRecordEntity> fullRowMapper = new InboxRecordEntityRowMapper();
    private final RowMapper<String> idColumnRowMapper = new InboxRecordIdRowMapper();

    private final Jdbi jdbi;
    private final InboxPayloadSerializer payloadSerializer;

    /**
     * Creates a new {@link JdbiPostgresInboxRecordRepository} instance backed by the given {@link Jdbi} instance.
     * </p>
     * Makes use of {@link InboxPayloadSerializer} for serializing a record's payload so that it can be stored within
     * the database using a dedicated column type.
     *
     * @param jdbi              the <code>JDBI</code> instance for database interaction and transaction handling.
     * @param payloadSerializer serializer for transforming a record's payload to a storable blob
     */
    public JdbiPostgresInboxRecordRepository(@NotNull Jdbi jdbi,
                                             @NotNull InboxPayloadSerializer payloadSerializer) {
        this.jdbi = requireNonNull(jdbi, "JDBI instance must not be null");
        this.payloadSerializer = requireNonNull(payloadSerializer, "payload serializer must not be null");
    }

    @Override
    public List<InboxRecord> claimPendingRecords(@Range(from = 1, to = Integer.MAX_VALUE) int batchSize) {

        return jdbi.withHandle(dbHandle -> {
            // To keep things aligned application's time is being used as a reference since the database can run on
            // different settings.
            var referenceTime = Instant.now();

            var sql = """
                    -- Keep the CTE!
                    -- It's necessary for allowing subsequent ordering of claimed records. Otherwise, claimed records
                    -- are gonna be returned without ordering since ORDER BY is not allowed on UPDATE statements.
                    WITH claimed AS (
                        UPDATE inbox_records
                        SET lifecycle_status = 'PROCESSING',
                            updated_at       = :now
                        WHERE id IN (SELECT id
                                     FROM inbox_records
                                     WHERE partition_key NOT IN (SELECT DISTINCT ON (inbox_records.partition_key) partition_key
                                                                 FROM inbox_records
                                                                 WHERE lifecycle_status IN ('PROCESSING', 'FAILED')
                                                                    -- waiting but waiting time already elapsed
                                                                    OR (lifecycle_status IN ('WAITING_FOR_RETRY')
                                                                     AND (next_retry_at > :now)))
                                     AND lifecycle_status IN ('PENDING', 'WAITING_FOR_RETRY')
                                     ORDER BY created_at
                                     -- important for explicitly lock the affected rows
                                     FOR UPDATE
                                     LIMIT :limit)
                        RETURNING *
                    )
                    SELECT * FROM claimed ORDER BY created_at
                    """;

            return dbHandle.createQuery(sql)
                    .bind("now", referenceTime)
                    .bind("limit", batchSize)
                    .map(fullRowMapper)
                    .map(entity -> entity.toModel(payloadSerializer))
                    .list();
        });
    }

    @Override
    public void store(@NotNull InboxRecord record) {

        jdbi.useHandle(dbHandle -> {
            var sql = """
                    INSERT INTO inbox_records (
                        id,
                        partition_key,
                        payload,
                        payload_type,
                        lifecycle_status,
                        created_at,
                        processed_at,
                        failure_count,
                        next_retry_at,
                        updated_at
                    ) VALUES (
                              :id,
                              :partitionKey,
                              :payload,
                              :payloadType,
                              :lifecycleStatus,
                              :createdAt,
                              :processedAt,
                              :failureCount,
                              :nextRetryAt,
                              :updatedAt)
                    ON CONFLICT (id) DO NOTHING -- deduplication happens here
                    """;

            var entity = InboxRecordEntity.fromModel(record, payloadSerializer);
            dbHandle.createUpdate(sql)
                    .bind("id", entity.id())
                    .bind("partitionKey", entity.partitionKey())
                    .bind("payload", entity.payload())
                    .bind("payloadType", entity.payloadType())
                    .bind("lifecycleStatus", entity.lifecycleStatus())
                    .bind("createdAt", entity.createdAt())
                    .bind("processedAt", Optional.ofNullable(entity.processedAt())
                            .map(Timestamp::from)
                            .orElse(null))
                    .bind("failureCount", entity.failureCount())
                    .bind("nextRetryAt", Optional.ofNullable(entity.nextRetryAt())
                            .map(Timestamp::from)
                            .orElse(null))
                    .bind("updatedAt", Optional.ofNullable(entity.updatedAt())
                            .map(Timestamp::from)
                            .orElse(null))
                    .execute();
        });
    }

    @Override
    public void update(@NotNull InboxRecord record) {
        jdbi.useHandle(dbHandle -> {
            var sql = """
                    UPDATE inbox_records
                    SET
                        partition_key = :partitionKey,
                        payload = :payload,
                        payload_type = :payloadType,
                        lifecycle_status = :lifecycleStatus,
                        created_at = :createdAt,
                        processed_at = :processedAt,
                        failure_count = :failureCount,
                        next_retry_at = :nextRetryAt,
                        updated_at = :updatedAt
                    WHERE id = :recordId
                    """;

            var entity = InboxRecordEntity.fromModel(record, payloadSerializer);
            dbHandle.createUpdate(sql)
                    .bind("partitionKey", entity.partitionKey())
                    .bind("payload", entity.payload())
                    .bind("payloadType", entity.payloadType())
                    .bind("lifecycleStatus", entity.lifecycleStatus())
                    .bind("createdAt", entity.createdAt())
                    .bind("processedAt", Optional.ofNullable(entity.processedAt())
                            .map(Timestamp::from)
                            .orElse(null))
                    .bind("failureCount", entity.failureCount())
                    .bind("nextRetryAt", Optional.ofNullable(entity.nextRetryAt())
                            .map(Timestamp::from)
                            .orElse(null))
                    .bind("updatedAt", Optional.ofNullable(entity.updatedAt())
                            .map(Timestamp::from)
                            .orElse(null))
                    .bind("recordId", entity.id())
                    .execute();
        });
    }

    @Override
    public void deleteById(@NotNull List<InboxRecordId> recordIds) {
        jdbi.useHandle(dbHandle -> {
            if (recordIds.isEmpty()) {
                return;
            }

            var sql = """
                    DELETE FROM inbox_records
                    WHERE id IN (<recordIds>)
                    """;

            dbHandle.createUpdate(sql)
                    .bindList("recordIds", recordIds.stream().map(InboxRecordId::id).toList())
                    .execute();
        });
    }

    @Override
    public Optional<InboxRecord> findById(@NotNull InboxRecordId id) {
        return jdbi.withHandle(dbHandle -> {
            var sql = """
                    SELECT * FROM inbox_records WHERE id = :recordId
                    """;

            return dbHandle.createQuery(sql)
                    .bind("recordId", id.id())
                    .map(fullRowMapper)
                    .map(entity -> entity.toModel(payloadSerializer))
                    .findOne();
        });
    }

    @Override
    public List<InboxRecordId> findCompletedRecordIds(@NotNull Duration ageThreshold,
                                                      @Range(from = 1, to = Integer.MAX_VALUE) int batchSize) {
        return jdbi.withHandle(dbHandle -> {
            // To keep things aligned application's time is being used as a reference since the database can run on
            // different settings.
            var referenceTime = Instant.now();

            var sql = """
                    SELECT * FROM inbox_records
                    WHERE lifecycle_status = :lifecycleStatus
                        AND (:now - updated_at) >= :ageThreshold
                    ORDER BY processed_at
                    LIMIT :limit
                    """;

            return dbHandle.createQuery(sql)
                    .bind("now", referenceTime)
                    .bind("ageThreshold", ageThreshold)
                    .bind("lifecycleStatus", InboxRecordLifecycleState.COMPLETED.name())
                    .bind("limit", batchSize)
                    .map(idColumnRowMapper)
                    .map(InboxRecordId::new)
                    .list();
        });
    }

    @Override
    public List<InboxRecord> findStalledRecords(@NotNull Duration stallThreshold,
                                                @Range(from = 1, to = Integer.MAX_VALUE) int batchSize) {
        return jdbi.withHandle(dbHandle -> {
            // To keep things aligned application's time is being used as a reference since the database can run on
            // different settings.
            var referenceTime = Instant.now();

            var sql = """
                    SELECT * FROM inbox_records
                    WHERE lifecycle_status = 'PROCESSING'
                        AND (:now - updated_at) >= :thresholdInterval
                    ORDER BY updated_at
                    LIMIT :limit
                    """;

            return dbHandle.createQuery(sql)
                    .bind("now", referenceTime)
                    .bind("thresholdInterval", stallThreshold)
                    .bind("limit", batchSize)
                    .map(fullRowMapper)
                    .map(entity -> entity.toModel(payloadSerializer))
                    .list();
        });
    }

    @Override
    public List<InboxRecord> findFailedRecords(@Range(from = 1, to = Integer.MAX_VALUE) int batchSize) {
        return jdbi.withHandle(dbHandle -> {
            var sql = """
                    SELECT * FROM inbox_records
                    WHERE lifecycle_status = 'FAILED'
                    ORDER BY updated_at
                    LIMIT :limit
                    """;

            return dbHandle.createQuery(sql)
                    .bind("limit", batchSize)
                    .map(fullRowMapper)
                    .map(entity -> entity.toModel(payloadSerializer))
                    .list();
        });
    }

    private static class InboxRecordEntityRowMapper implements RowMapper<InboxRecordEntity> {
        @Override
        public InboxRecordEntity map(ResultSet rs, StatementContext ctx) throws SQLException {
            return new InboxRecordEntity(
                    rs.getString("id"),
                    rs.getString("partition_key"),
                    rs.getBytes("payload"),
                    rs.getString("payload_type"),
                    rs.getString("lifecycle_status"),
                    rs.getTimestamp("created_at").toInstant(),
                    Optional.ofNullable(rs.getTimestamp("processed_at"))
                            .map(Timestamp::toInstant)
                            .orElse(null),
                    Optional.ofNullable(rs.getTimestamp("next_retry_at"))
                            .map(Timestamp::toInstant)
                            .orElse(null),
                    Optional.ofNullable(rs.getTimestamp("updated_at"))
                            .map(Timestamp::toInstant)
                            .orElse(null),
                    rs.getInt("failure_count"));
        }
    }

    private static class InboxRecordIdRowMapper implements RowMapper<String> {
        @Override
        public String map(ResultSet rs, StatementContext ctx) throws SQLException {
            return rs.getString("id");
        }
    }

    private record InboxRecordEntity(
            @NotNull String id,
            @NotNull String partitionKey,
            byte[] payload,
            @NotNull String payloadType,
            @NotNull String lifecycleStatus,
            @NotNull Instant createdAt,
            Instant processedAt,
            Instant nextRetryAt,
            Instant updatedAt,
            int failureCount
    ) {

        static @NotNull InboxRecordEntity fromModel(InboxRecord record, InboxPayloadSerializer payloadSerializer) {
            var serializedPayload = payloadSerializer.serialize(record.getPayload());
            var payloadType = record.getPayload().getClass().getName();

            return new InboxRecordEntity(
                    record.getId().id(),
                    record.getPartitionKey().key(),
                    serializedPayload,
                    payloadType,
                    record.getLifecycle().state().name(),
                    record.getLifecycle().createdAt(),
                    record.getLifecycle().processedAt(),
                    record.getLifecycle().processingError().nextRetryAt(),
                    record.getLifecycle().updatedAt(),
                    record.getLifecycle().processingError().failureCount());
        }

        @NotNull InboxRecord toModel(InboxPayloadSerializer payloadSerializer) {
            Class<?> typeHint;
            try {
                typeHint = Class.forName(payloadType());
            } catch (ClassNotFoundException e) {
                throw new InboxPayloadSerializationException("message type '%s' is unknown"
                        .formatted(payloadType()), e);
            }
            var deserializedPayload = payloadSerializer.deserialize(payload(), typeHint);

            return InboxRecord.restore(
                    new InboxRecordId(id()),
                    new InboxRecordPartitionKey(partitionKey()),
                    deserializedPayload,
                    new InboxRecordLifecycle(
                            InboxRecordLifecycleState.valueOf(lifecycleStatus()),
                            createdAt(),
                            processedAt(),
                            updatedAt(),
                            new InboxRecordProcessingFailure(
                                    failureCount(),
                                    nextRetryAt())));
        }
    }
}
