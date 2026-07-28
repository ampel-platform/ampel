# Scoring Service

A service responsible for reading processing Ampel messages associated with scores. These messages are ingested into a
database and made retrievable through HTTP endpoints.

> [!IMPORTANT]
> This service is backed by a database for storing information, either long-term or temporarily. This database has to be
> a PostgreSQL database!

## Configuration

Use the following environment variables in order to adjust this service:

| EnvVar                  | Description                                                                    | Default               |
|-------------------------|--------------------------------------------------------------------------------|-----------------------|
| DATABASE_HOST           | Hostname of the PostgreSQL database.                                           |                       |
| DATABASE_PORT           | Port of the PostgreSQL database.                                               |                       |
| DATABASE_NAME           | Name of the database.                                                          |                       |
| DATABASE_USERNAME       | Username for authenticating against the database.                              |                       |
| DATABASE_PASSWORD       | Password for authenticating against the database.                              |                       |
| KAFKA_BOOTSTRAP_SERVERS | List of servers (comma separated) for connecting to a Kafka cluster.           | `localhost:9092`      |
| MESSAGES_DLQ_TOPIC_NAME | Name of a Kafka topic that acts as a DLQ (Dead Letter Queue) for this service. | `scoring-service-dlq` |
| SERVER_PORT             | Port to use for the web server.                                                | `8080`                |

> [!IMPORTANT]
> Make sure that the DLQ topic already exists within the used Kafka cluster as this service does __not__ attempt to
> create it itself.
