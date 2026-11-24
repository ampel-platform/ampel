------------------------------------------------------------------------------------------------------------------------
-- SCORES                                                                                                             --
------------------------------------------------------------------------------------------------------------------------

CREATE TYPE AMPEL_SCORE AS ENUM ('RED', 'YELLOW', 'GREEN');

-- This is an implicit type conversion to simply ease working with the desired enum in JPA.
CREATE CAST (VARCHAR as AMPEL_SCORE) WITH INOUT AS IMPLICIT;

CREATE TABLE IF NOT EXISTS laboratory_scores
(
    SCORE_ID                        VARCHAR          NOT NULL PRIMARY KEY,
    SCORING_SYSTEM_NAME             VARCHAR          NOT NULL,
    SCORING_SYSTEM_VERSION          VARCHAR          NOT NULL,
    MEDICAL_CASE_ID                 VARCHAR          NOT NULL,
    SCORE                           AMPEL_SCORE      NOT NULL DEFAULT CAST('GREEN' AS AMPEL_SCORE),
    SCORING_SYSTEM_SEVERITY_CODE    VARCHAR,
    SCORING_SYSTEM_SEVERITY_COMMENT TEXT,
    ANALYTE_NAME                    VARCHAR          NOT NULL,
    ANALYTE_VALUE                   DOUBLE PRECISION NOT NULL,
    ANALYTE_UNIT                    VARCHAR,
    ANALYTE_MEASURED_AT             TIMESTAMP        NOT NULL,
    SCORE_CALCULATED_AT             TIMESTAMP        NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_laboratory_scores_medical_case
    ON laboratory_scores (MEDICAL_CASE_ID);

------------------------------------------------------------------------------------------------------------------------
-- OUTBOX                                                                                                             --
------------------------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS outbox_record
(
    id             VARCHAR(255)             NOT NULL,
    status         VARCHAR(20)              NOT NULL,
    record_key     VARCHAR(255)             NOT NULL,
    record_type    VARCHAR(255)             NOT NULL,
    payload        TEXT                     NOT NULL,
    context        TEXT,
    created_at     TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at   TIMESTAMP WITH TIME ZONE,
    failure_count  INT                      NOT NULL,
    failure_reason VARCHAR(1000),
    next_retry_at  TIMESTAMP WITH TIME ZONE NOT NULL,
    partition_no   INTEGER                  NOT NULL,
    handler_id     VARCHAR(1000)            NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS outbox_instance
(
    instance_id    VARCHAR(255) PRIMARY KEY,
    hostname       VARCHAR(255)             NOT NULL,
    port           INTEGER                  NOT NULL,
    status         VARCHAR(50)              NOT NULL,
    started_at     TIMESTAMP WITH TIME ZONE NOT NULL,
    last_heartbeat TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at     TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at     TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS outbox_partition
(
    partition_number INTEGER PRIMARY KEY,
    instance_id      VARCHAR(255),
    version          BIGINT                   NOT NULL DEFAULT 0,
    updated_at       TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_outbox_record_record_key_created
    ON outbox_record (record_key, created_at);

CREATE INDEX IF NOT EXISTS idx_outbox_record_partition_status_retry
    ON outbox_record (partition_no, status, next_retry_at);

CREATE INDEX IF NOT EXISTS idx_outbox_record_status_retry
    ON outbox_record (status, next_retry_at);

CREATE INDEX IF NOT EXISTS idx_outbox_record_status
    ON outbox_record (status);

CREATE INDEX IF NOT EXISTS idx_outbox_record_record_key_completed_created
    ON outbox_record (record_key, completed_at, created_at);

CREATE INDEX IF NOT EXISTS idx_outbox_instance_status_heartbeat
    ON outbox_instance (status, last_heartbeat);

CREATE INDEX IF NOT EXISTS idx_outbox_instance_last_heartbeat
    ON outbox_instance (last_heartbeat);

CREATE INDEX IF NOT EXISTS idx_outbox_instance_status
    ON outbox_instance (status);

CREATE INDEX IF NOT EXISTS idx_outbox_partition_instance_id
    ON outbox_partition (instance_id);
