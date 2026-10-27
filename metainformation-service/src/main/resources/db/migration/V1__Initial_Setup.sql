------------------------------------------------------------------------------------------------------------------------
-- INBOX                                                                                                              --
------------------------------------------------------------------------------------------------------------------------
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

CREATE INDEX IF NOT EXISTS idx_inbox_records_lifecycle_status
    ON inbox_records (lifecycle_status);

CREATE INDEX IF NOT EXISTS idx_inbox_records_partition_key
    ON inbox_records (partition_key);

------------------------------------------------------------------------------------------------------------------------
-- PATIENT METAINFORMATION                                                                                            --
------------------------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS patient_metainformation
(
    patient_id               VARCHAR(255) NOT NULL,
    patient_firstname        VARCHAR(255),
    patient_lastname         VARCHAR(255),
    patient_sex              VARCHAR(7),
    patient__date_of_birth   DATE,
    patient__medical_case_id VARCHAR(255) UNIQUE,
    PRIMARY KEY (patient_id)
);

CREATE INDEX IF NOT EXISTS idx_patient_information_medical_case
    ON patient_metainformation (patient__medical_case_id);
