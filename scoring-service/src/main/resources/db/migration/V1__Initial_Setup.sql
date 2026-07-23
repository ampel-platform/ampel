CREATE TYPE AMPEL_SCORE AS ENUM ('RED', 'YELLOW', 'GREEN');

-- This is an implicit type conversion to simply ease working with the desired enum in JPA.
CREATE CAST (VARCHAR as AMPEL_SCORE) WITH INOUT AS IMPLICIT;

CREATE TABLE IF NOT EXISTS laboratory_scores
(
    SCORE_ID                     VARCHAR          NOT NULL PRIMARY KEY,
    SCORING_SYSTEM_NAME          VARCHAR          NOT NULL,
    SCORING_SYSTEM_VERSION       VARCHAR          NOT NULL,
    MEDICAL_CASE_ID              VARCHAR          NOT NULL,
    SCORE                        AMPEL_SCORE      NOT NULL DEFAULT CAST('GREEN' AS AMPEL_SCORE),
    SCORING_SYSTEM_SEVERITY_CODE VARCHAR,
    ANALYTE_NAME                 VARCHAR          NOT NULL,
    ANALYTE_VALUE                DOUBLE PRECISION NOT NULL,
    ANALYTE_UNIT                 VARCHAR,
    ANALYTE_MEASURED_AT          TIMESTAMP        NOT NULL,
    SCORE_CALCULATED_AT          TIMESTAMP        NOT NULL
);
