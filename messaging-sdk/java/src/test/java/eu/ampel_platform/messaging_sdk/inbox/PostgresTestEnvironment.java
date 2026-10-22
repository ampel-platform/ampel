package eu.ampel_platform.messaging_sdk.inbox;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.postgres.PostgresPlugin;
import org.jetbrains.annotations.TestOnly;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.postgresql.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

import javax.sql.DataSource;
import java.util.Objects;
import java.util.Optional;

@TestOnly
public final class PostgresTestEnvironment {

    private static final String POSTGRESQL_IMAGE = "postgres:18-alpine3.24";
    private static final String DATABASE_NAME = "ampel-test";
    private static final String DATABASE_USERNAME = "test";
    private static final String DATABASE_PASSWORD = "testPW";

    private final PostgreSQLContainer database;

    private PostgresTestEnvironment(PostgreSQLContainer container) {
        database = Objects.requireNonNull(container, "PostgreSQL container must not be null");
    }

    public static PostgresTestEnvironment createDefault() {
        Optional.ofNullable(PostgresTestEnvironment.class.getResource("/db/database_init.sql"))
                .orElseThrow(() -> new RuntimeException("could not locate necessary database init script"));

        var container = new PostgreSQLContainer(DockerImageName.parse(POSTGRESQL_IMAGE))
                .withDatabaseName(DATABASE_NAME)
                .withUsername(DATABASE_USERNAME)
                .withPassword(DATABASE_PASSWORD)
                .waitingFor(Wait.forLogMessage(".*ready to accept connections.*", 1))
                .withInitScript("db/database_init.sql");

        return new PostgresTestEnvironment(container);
    }

    public void startEnvironment() {
        database.start();
    }

    public void stopEnvironment() {
        database.stop();
    }

    public Jdbi getJdbiInstance() {
        return Jdbi.create(getDataSource())
                .installPlugin(new PostgresPlugin());
    }

    private DataSource getDataSource() {
        var dataSourceConfig = new HikariConfig();
        dataSourceConfig.setJdbcUrl(database.getJdbcUrl());
        dataSourceConfig.setUsername(DATABASE_USERNAME);
        dataSourceConfig.setPassword(DATABASE_PASSWORD);

        return new HikariDataSource(dataSourceConfig);
    }
}
