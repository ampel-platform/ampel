CREATE TABLE IF NOT EXISTS inbox_records
(
    id               VARCHAR(255) NOT NULL,
    partition_key    VARCHAR(255) NOT NULL,
    payload          BYTEA        NOT NULL,
    payload_type     VARCHAR(255) NOT NULL,
    lifecycle_status VARCHAR(17)  NOT NULL,
    created_at       TIMESTAMP    NOT NULL,
    processed_at     TIMESTAMP,
    failure_count    INT          NOT NULL DEFAULT 0,
    next_retry_at    TIMESTAMP,
    updated_at       TIMESTAMP,
    PRIMARY KEY (id)
);
