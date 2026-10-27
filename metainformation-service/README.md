# Metainformation Service

A service responsible for capturing events related to metainformation and turning them into queryable resources.
In its current state only patient related metainformation is supported.

> [!IMPORTANT]
> This service is backed by a database for storing information, either long-term or temporarily. This database has to be
> a PostgreSQL database!

## Configuration

Use the following environment variables in order to adjust this service.

### Database

The database is used for both, the inbox and the actual application data.

| EnvVar            | Description                                       | Default |
|-------------------|---------------------------------------------------|---------|
| DATABASE_HOST     | Hostname of the PostgreSQL database.              |         |
| DATABASE_PORT     | Port of the PostgreSQL database.                  | `5432`  |
| DATABASE_NAME     | Name of the database.                             |         |
| DATABASE_USERNAME | Username for authenticating against the database. |         |
| DATABASE_PASSWORD | Password for authenticating against the database. |         |

### Inbox

| EnvVar                                                 | Description                                                                                     | Default          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------|------------------|
| INBOX_CLEANUP_RATE_MS                                  | Invocation rate of the inbox cleanup process in ms.                                             | `60000` (1min)   |
| INBOX_CLEANUP_MAX_ITEMS                                | Maximum number of inbox records getting cleaned per invocation.                                 | `1000`           |
| INBOX_CLEANUP_ITEM_AGE_THRESHOLD_MS                    | Duration of how long an inbox record is in `COMPLETED` state before being eligible for cleanup. | `900000` (15min) |
| INBOX_STALENESS_RESOLVER_RATE_MS                       | Invocation rate of the inbox staleness resolver process in ms.                                  | `60000` (1min)   |
| INBOX_STALENESS_RESOLVER_MAX_ITEMS                     | Maximum number of stalled inbox records getting resolved per invocation.                        | `1000`           |
| INBOX_STALENESS_RESOLVER_ITEM_PROCESSING_AGE_THRESHOLD | Duration of how long an inbox record is in `PROCESSING` state before being rendered stalled.    | `300000` (5min)  |
| INBOX_PROCESSING_RATE_MS                               | Invocation rate of the inbox processing process in ms.                                          | `2000` (2sec)    |
| INBOX_PROCESSING_MAX_ITEMS                             | Maximum number of inbox records being processed per invocation.                                 | `50`             |
| INBOX_PROCESSING_RETRY_BASE_INTERVAL_MS                | Base interval in ms for calculating an exponential retry.                                       | `1000` (1sec)    |
| INBOX_PROCESSING_MAX_RETRIES                           | Maximum number of retries for processing an inbox record before rendering it `FAILED`.          | `5`              |

### Misc

| EnvVar                  | Description                                                          | Default          |
|-------------------------|----------------------------------------------------------------------|------------------|
| SERVER_PORT             | Port to use for the web server.                                      | `8080`           |
| KAFKA_BOOTSTRAP_SERVERS | List of servers (comma separated) for connecting to a Kafka cluster. | `localhost:9092` |
