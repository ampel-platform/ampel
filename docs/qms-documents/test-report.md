# Test Report - *Product Name*

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |

# 1. Overview

| Field | Value |
|---|---|
| **Objective** | This protocol serves as evidence that the planned tests were performed as part of product verification and validation. |
| **Location** | *local site* |
| **Date** | Day-Month-Year |

# 2. Product

| Product name   | Version |
| -------------- | ------- |
| *Product name* | *1.0*   |

# 3. Participants

| Name | Affiliation | Role / Responsibility |
|---|---|---|
| _Project lead name_ | *Hospital Name* | Test acceptor (acceptance test) |
| _Technical expert name_ | *Hospital Name* | Test executor (system test, unit/integration test) |
| _Technical tester name_ | *Hospital Name* | Test executor (acceptance test, unit/integration test) |
| _Data processing expert name_ | *Hospital Name* | Test acceptor (acceptance test, system test, unit/integration test) |
| _Medical and risk expert name_ | *Hospital Name* | Test acceptor (system test, unit/integration test) |

# 4. Summary

## 4.1 Acceptance Tests

| Metric ID | Metric name                      | Description                                                                                                             | Value | Status     |
| --------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----- | ---------- |
| UBM_StA   | Stakeholder requirement coverage | The percentage of requirements in [[stakeholder-requirements]] that could be considered fulfilled by at least one test. | 100%  | Sufficient |
| UBM_ABN   | Number of acceptance testers     | The number of users who signed off on the acceptance test as stakeholders.                                              | 10    | Sufficient |

## 4.2 System Tests

| Metric ID | Metric name | Description | Value | Status |
|---|---|---|---|---|
| UBM_SyA | System requirement coverage | The percentage of requirements in [[system-requirements]] that could be considered fulfilled by at least one test. | 100% | Sufficient |

## 4.3 Unit and Integration Tests

| Metric ID | Metric name                                  | Description                                                                                                                                                                                                                                 | Value | Status     |
| --------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ---------- |
| UBM_ADA   | Architecture and design requirement coverage | The percentage of requirements in [[architecture]] that could be considered fulfilled by at least one test.                                                                                                                                 | 100%  | Sufficient |
| UBM_COV   | Code coverage                                | The percentage of all “instructions” (also called “statements”) in the code that were covered by a test case. Framework and configuration modules, SOUPs, and the scoring component that was tested without automation were not considered. | 64%   | Sufficient |
| UBM_RIS   | Tests per risk control measure               | Average number of tests per risk control measure from the requirements in [[architecture]].                                                                                                                                                 | 1.9   | Sufficient |

![](assets/Tests%20per%20risk%20control%20measure.png)

# 5. Acceptance Tests

| Test object ID | Test object name                                                  | Priority | Status    | Error class |
| -------------- | ----------------------------------------------------------------- | -------- | --------- | ----------- |
| StA_NA_001     | Aggregated *product name* status (overall CDSS status in the HIS) | Medium   | Completed | None        |
| StA_NA_002     | Transition to *product name* detail information                   | Medium   | Completed | None        |
| StA_NA_003     | CDSS overview                                                     | Medium   | Completed | None        |
| StA_NA_004     | Support notifications (detail view)                               | Medium   | Completed | None        |
| StA_NA_005     | Contributing data (detail view)                                   | Low      | Completed | None        |
| StA_NA_006     | Further information (detail view)                                 | Low      | Completed | None        |
| StA_NA_007     | Traceability (detail view)                                        | Medium   | Completed | None        |
| StA_NA_008     | Feedback (detail view)                                            | Low      | Completed | None        |
| StA_NA_009     | Email notification                                                | Medium   | Completed | None        |
| StA_NA_010     | Email attribution                                                 | Medium   | Completed | None        |
| StA_NA_011     | Email traceability                                                | Medium   | Completed | None        |
| StA_NA_016     | Near-real-time processing                                         | Medium   | Completed | None        |
| StA_NA_017     | AKI scoring algorithm                                             | High     | Completed | None        |

## 5.1 AT_01 - *Product name* User Test

| Test ID | Test name                | Test specification      | Priority | Status    | Error class |
| ------- | ------------------------ | ----------------------- | -------- | --------- | ----------- |
| AT_01   | *Product name* user test | [[test-specifications]] | High     | Completed | None        |

### 5.1.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| ATF_01 | LAMPE user test | See [[test-specifications]] | TR_M_05 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

# 6. System Tests

| Test object ID      | Test object name                                                         | Priority | Status    | Error class |
| ------------------- | ------------------------------------------------------------------------ | -------- | --------- | ----------- |
| SyA_ES_NS_UI        | User interface                                                           | Medium   | Completed | None        |
| SyA_ES_HS_PC        | *Hospital name* standard PC hardware                                     | Medium   | Completed | None        |
| SyA_ES_HS_VM        | Linux virtual machine                                                    | High     | Completed | None        |
| SyA_ES_SS_DB        | Database interface (input)                                               | High     | Completed | None        |
| SyA_ES_SS_PC        | *Hospital name* standard PC software                                     | Medium   | Completed | None        |
| SyA_ES_SS_KAS       | CDSS interface to the CWS                                                | Medium   | Completed | None        |
| SyA_ES_SS_MAIL      | CDSS interface for email dispatch                                        | Medium   | Completed | None        |
| SyA_BU_INST_SPALTE  | Displaying the CDSS column                                               | Medium   | Completed | None        |
| SyA_BU_INST_DOCKER  | System startup                                                           | Low      | Completed | None        |
| SyA_ES_IFU          | Instructions for use                                                     | Medium   | Completed | None        |
| SyA_FA_UI_STAMM     | Patient master data                                                      | Medium   | Completed | None        |
| SyA_FA_UI_FB        | Feedback                                                                 | Low      | Completed | None        |
| SyA_FA_UI_START     | Start view (overview)                                                    | Low      | Completed | None        |
| SyA_FA_UI_DETAIL    | Transition to detail view                                                | Low      | Completed | None        |
| SyA_FA_UI_HINWEIS   | Notifications (detail view)                                              | Low      | Completed | None        |
| SyA_FA_UI_DATEN     | Contributing data (detail view)                                          | Low      | Completed | None        |
| SyA_FA_UI_LINK      | Access to further information (detail view)                              | Low      | Completed | None        |
| SyA_FA_MAIL_VERS    | Email dispatch conditions                                                | Medium   | Completed | None        |
| SyA_FA_MAIL_STAMM   | Patient master data in email                                             | Medium   | Completed | None        |
| SyA_FA_MAIL_INH     | Email content                                                            | Low      | Completed | None        |
| SyA_FA_SCORE_STATUS | CDSS status                                                              | Medium   | Completed | None        |
| SyA_FA_SCORE_SCHWER | CDSS severity                                                            | Medium   | Completed | None        |
| SyA_FA_SCORE_AGGR   | Aggregated CDSS status                                                   | Medium   | Completed | None        |
| SyA_FA_SCORE_AKI    | Detection of acute kidney injury and vancomycin-associated kidney injury | High     | Completed | None        |
| SyA_NFA_L_EV        | Real-time processing                                                     | Medium   | Completed | None        |
| SyA_NFA_SA_CONT     | Container                                                                | Medium   | Completed | None        |
| SyA_NFA_SA_SAND     | Sandboxing                                                               | Medium   | Completed | None        |
| SyA_NFA_SA_AUI      | UI authentication                                                        | Medium   | Completed | None        |
| SyA_NFA_SA_AVM      | VM authentication                                                        | High     | Completed | None        |
| SyA_NFA_SA_MINI     | Data minimization                                                        | Low      | Completed | None        |
| SyA_NFA_SQ_SUI      | Static UI                                                                | Low      | Completed | None        |
| SyA_NFA_SQ_MINI     | Minimal interaction                                                      | Low      | Completed | None        |
| SyA_NFA_SQ_UEB      | Clarity                                                                  | Low      | Completed | None        |
| SyA_NFA_SQ_SL       | System uptime                                                            | Medium   | Completed | None        |
| SyA_NFA_SQ_DD       | Defective data input                                                     | Medium   | Completed | None        |
| SyA_NFA_SQ_W        | Maintenance                                                              | Medium   | Completed | None        |
| SyA_NFA_SQ_MOD      | Modularity                                                               | Low      | Completed | None        |
| SyA_NFA_SQ_KONF     | Configuration (authorization)                                            | Medium   | Completed | None        |
| DQ_CDC              | CDC (Change Data Capture) monitoring component                           | High     | Completed | None        |
| BACK_MAIL           | Mail client component                                                    | Medium   | Completed | None        |
| BACK_RELAY          | Mail relay component                                                     | Medium   | Completed | None        |

## 6.1 ST_01 - Manual Developer Test of *Product Name*

| Test ID | Test name                               | Test specification      | Priority | Status    | Error class |
| ------- | --------------------------------------- | ----------------------- | -------- | --------- | ----------- |
| ST_01   | Manual developer test of *product name* | [[test-specifications]] | High     | Completed | None        |

### 6.1.1 Test Cases

| Test case ID | Test case name                               | Test protocol(s)            | Method(s) |
| ------------ | -------------------------------------------- | --------------------------- | --------- |
| STF_01       | Manual developer test case of *product name* | See [[test-specifications]] | TR_M_05   |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

# 7. Unit and Integration Tests

| Test object ID | Test object name | Priority | Status | Error class |
|---|---|---|---|---|
| ETL_PROCESS | Stream processing component | High | Completed | None |
| ETL_PAT | Patient component | High | Completed | None |
| ETL_LAB | Laboratory component | High | Completed | None |
| ETL_PROZ | Procedure component | High | Completed | None |
| ETL_FALL | Case component | High | Completed | None |
| DS_STREAM | Streaming component | High | Completed | None |
| SCO_FRAME_KAFKA_R | Kafka reader of the scoring framework | High | Completed | None |
| SCO_FRAME_KAFKA_W | Kafka writer of the scoring framework | High | Completed | None |
| SCO_FRAME_WORK_DSG | Workflow designer of the scoring framework | High | Completed | None |
| SCO_FRAME_WORK_SCH | Workflow scheduler of the scoring framework | High | Completed | None |
| SCO_AKI | AKI component | High | Completed | None |
| SCO_AKI-DB | AKI DB component | High | Completed | None |
| BACK_SER | Result web server component | High | Completed | None |
| BACK_DB | Backend DB component | High | Completed | None |
| BACK_ERG | Result component | High | Completed | None |
| BACK_META | Metadata component | High | Completed | None |
| BACK_ORC | Workflow orchestration component | High | Completed | None |
| BACK_MAIL | Mail client component | Medium | Completed | None |
| FRONT_CASE | Case dashboard component | Medium | Completed | None |

## 7.1 UIT_ETL_LAB_FILTERS – ETL Laboratory Filter

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_ETL_LAB_FILTERS | ETL laboratory filter | [[test-specifications]] | High | Completed | None |

### 7.1.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_ETL_LAB_FILTERS__NumericalAnalyteValueFilterTest | Value-based filtering of laboratory data | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_ETL_LAB_FILTERS__LaboratoryTimeCutoffFilterTest | Time-based filtering of laboratory data | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_ETL_LAB_FILTERS__LaboratoryMetadataTimeCutoffFilterTest | Time-based filtering of laboratory metadata | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.2 UIT_ETL_LAB_TRANS – ETL Laboratory Transformation

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_ETL_LAB_TRANS | ETL laboratory transformation | [[test-specifications]] | High | Completed | None |

### 7.2.1 Test Cases

| Test case ID                   | Test case name                                                                     | Test protocol(s)            | Method(s)                                |
| ------------------------------ | ---------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- |
| UITF_ETL_LAB_TRANS__PipelineIT | Join of laboratory data and laboratory metadata with filters and Kafka integration | See [[test-specifications]] | - Testcontainers<br>- Kafka<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.3 UIT_ETL_PROC_FILTERS – ETL Procedure Filter

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_ETL_PROC_FILTERS | ETL procedure filter | [[test-specifications]] | High | Completed | None |

### 7.3.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_ETL_PROC_FILTERS__ActuallyPerformedFilterTest | Value-based filtering of procedures by whether they were performed | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.4 UIT_ETL_PROC_TRANS – ETL Procedure Transformation

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_ETL_PROC_TRANS | ETL procedure transformation | [[test-specifications]] | High | Completed | None |

### 7.4.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_ETL_PROC_TRANS__ProcedureTransformerTest | Conversion of procedures into AMPEL format | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID                    | Test case name                                                                | Test protocol(s)            | Method(s)                                |
| ------------------------------- | ----------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- |
| UITF_ETL_PROC_TRANS__PipelineIT | Conversion of procedures into AMPEL format with filters and Kafka integration | See [[test-specifications]] | - Testcontainers<br>- Kafka<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID                        | Test case name                                                                                         | Test protocol(s)            | Method(s)                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------- | ---------------------------------------- |
| UITF_ETL_PROC_TRANS__PipelineIT_Par | Conversion of procedures into AMPEL format with filters and Kafka integration at increased parallelism | See [[test-specifications]] | - Testcontainers<br>- Kafka<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.5 UIT_ETL_PAT_TRANS – ETL Patient Transformation

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_ETL_PAT_TRANS | ETL patient transformation | [[test-specifications]] | High | Completed | None |

### 7.5.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_ETL_PAT_TRANS__PatientTransformerTest | Conversion of patients into AMPEL format | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID                   | Test case name                                                              | Test protocol(s)            | Method(s)                                |
| ------------------------------ | --------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- |
| UITF_ETL_PAT_TRANS__PipelineIT | Conversion of patients into AMPEL format with filters and Kafka integration | See [[test-specifications]] | - Testcontainers<br>- Kafka<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID                       | Test case name                                                                                       | Test protocol(s)            | Method(s)                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- |
| UITF_ETL_PAT_TRANS__PipelineIT_Par | Conversion of patients into AMPEL format with filters and Kafka integration at increased parallelism | See [[test-specifications]] | - Testcontainers<br>- Kafka<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.6 UIT_ETL_MC_FILTERS – ETL Medical Case Filter

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_ETL_MC_FILTERS | ETL medical case filter | [[test-specifications]] | High | Completed | None |

### 7.6.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_ETL_MC_FILTERS__NoStatusFilterTest | Value-based filtering of laboratory data | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_ETL_MC_FILTERS__MedicalCaseTimeCutoffFilterTest | Time-based filtering of medical case data | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.7 UIT_ETL_MC_TRANS – ETL Medical Case Transformation

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_ETL_MC_TRANS | ETL medical case transformation | [[test-specifications]] | High | Completed | None |

### 7.7.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_ETL_MC_TRANS__MedicalCaseTransformerTest | Conversion of medical cases into AMPEL format | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID                  | Test case name                                                                   | Test protocol(s)            | Method(s)                                |
| ----------------------------- | -------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- |
| UITF_ETL_MC_TRANS__PipelineIT | Conversion of medical cases into AMPEL format with filters and Kafka integration | See [[test-specifications]] | - Testcontainers<br>- Kafka<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID                      | Test case name                                                                                            | Test protocol(s)            | Method(s)                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- |
| UITF_ETL_MC_TRANS__PipelineIT_Par | Conversion of medical cases into AMPEL format with filters and Kafka integration at increased parallelism | See [[test-specifications]] | - Testcontainers<br>- Kafka<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.8 UIT_BACK_PERS_MC – Persistence and Provision of Medical Case Data

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_BACK_PERS_MC | Persistence and provision of medical case data | [[test-specifications]] | High | Completed | None |

### 7.8.1 Test Cases

| Test case ID                              | Test case name               | Test protocol(s)            | Method(s)                                     |
| ----------------------------------------- | ---------------------------- | --------------------------- | --------------------------------------------- |
| UITF_BACK_PERS_MC__DBMedicalCaseStorageIT | Storage of medical case data | See [[test-specifications]] | - Testcontainers<br>- PostgreSQL<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID                                | Test case name              | Test protocol(s)            | Method(s)                                     |
| ------------------------------------------- | --------------------------- | --------------------------- | --------------------------------------------- |
| UITF_BACK_PERS_MC__DBMedicalCaseStorageIT_2 | Update of medical case data | See [[test-specifications]] | - Testcontainers<br>- PostgreSQL<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID                                | Test case name              | Test protocol(s)            | Method(s)                                     |
| ------------------------------------------- | --------------------------- | --------------------------- | --------------------------------------------- |
| UITF_BACK_PERS_MC__DBMedicalCaseStorageIT_3 | Update of medical case data | See [[test-specifications]] | - Testcontainers<br>- PostgreSQL<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID                                | Test case name                 | Test protocol(s)            | Method(s)                                     |
| ------------------------------------------- | ------------------------------ | --------------------------- | --------------------------------------------- |
| UITF_BACK_PERS_MC__DBMedicalCaseStorageIT_4 | Retrieval of medical case data | See [[test-specifications]] | - Testcontainers<br>- PostgreSQL<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.9 UIT_BACK_PERS_RES – Persistence and Provision of Result Data

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_BACK_PERS_RES | Persistence and provision of result data | [[test-specifications]] | High | Completed | None |

### 7.9.1 Test Cases

| Test case ID                                       | Test case name                           | Test protocol(s)            | Method(s)                                     |
| -------------------------------------------------- | ---------------------------------------- | --------------------------- | --------------------------------------------- |
| UITF_BACK_PERS_RES__DBScoringSystemResultStorageIT | Persistence and retrieval of result data | See [[test-specifications]] | - Testcontainers<br>- PostgreSQL<br>- TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.10 UIT_BACK_ING – Ingestion of Result Data

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_BACK_ING | Ingestion of result data | [[test-specifications]] | High | Completed | None |

### 7.10.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_BACK_ING__IngestionActivitiesTest | Ingestion of result data with connected processing | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.11 UIT_BACK_API_HTTP – Retrieval of Information via HTTP Interface

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_BACK_API_HTTP | Retrieval of information via HTTP interface | [[test-specifications]] | High | Completed | None |

### 7.11.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_BACK_API_HTTP__ResultLookupControllerTest | Retrieval of scoring-system result data via the HTTP interface | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_BACK_API_HTTP__AggregatedSeverityLookupControllerTest | Retrieval of an aggregate of scoring-system result data via the HTTP interface | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_BACK_API_HTTP__MedicalCaseMetaLookupControllerTest | Retrieval of medical case metadata via the HTTP interface | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.12 UIT_BACK_META_SVC – Retrieval of Medical Case Metadata

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_BACK_META_SVC | Retrieval of medical case metadata | [[test-specifications]] | High | Completed | None |

### 7.12.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_BACK_META_SVC__MedicalCaseMetaLookupServiceTest | Retrieval of medical case metadata via the service layer | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.13 UIT_BACK_RES_SVC – Processing of Result Data

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_BACK_RES_SVC | Processing of result data | [[test-specifications]] | High | Completed | None |

### 7.13.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_BACK_META_SVC__ScoringSystemResultIngestionServiceTest | Persistence of scoring-system result data within a medical case via the service layer | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_BACK_META_SVC__ScoringSystemResultNotificationServiceTest | Triggering a notification | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_BACK_META_SVC__ScoringSystemResultLookupServiceTest | Retrieval of detailed result data within a medical case | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_BACK_META_SVC__ScoringSystemResultLookupServiceTest_2 | Retrieval of aggregated result data within a medical case | See [[test-specifications]] | TR_M_01 |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.14 UIT_BACK_MAIL_LIST – Email Recipient Test

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_BACK_MAIL_LIST | Email recipient test | [[test-specifications]] | Medium | Completed | None |

### 7.14.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_BACK_MAIL_LIST | Email recipient test case | See [[test-specifications]] | TR_M_05 |

| Priority | Status | Error class |
|---|---|---|
| Medium | Completed | None |

## 7.15 UIT_Score_AKI_01 - AKI Validation

| Test ID | Test name | Test specification | Priority | Status | Error class |
|---|---|---|---|---|---|
| UIT_Score_AKI_01 | AKI validation | [[test-specifications]] | High | Completed | None |

### 7.15.1 Test Cases

| Test case ID | Test case name | Test protocol(s) | Method(s) |
|---|---|---|---|
| UITF_Score_AKI_01 | AKI validation using historical care data | See [[test-specifications]] | Non-automated test |

| Priority | Status | Error class |
|---|---|---|
| High | Completed | None |

## 7.16 UIT_DET_VIS_STATE_01 - Visualization of the Medical Case Using Artificially Generated Status Data, Including History

| Test ID              | Test name                                                                                     | Test specification      | Priority | Status    | Error class |
| -------------------- | --------------------------------------------------------------------------------------------- | ----------------------- | -------- | --------- | ----------- |
| UIT_DET_VIS_STATE_01 | Visualization of the medical case using artificially generated status data, including history | [[test-specifications]] | Medium   | Completed | None        |

### 7.16.1 Test Cases

| Test case ID          | Test case name                                                                                | Test protocol(s)            | Method(s)              |
| --------------------- | --------------------------------------------------------------------------------------------- | --------------------------- | ---------------------- |
| UITF_DET_VIS_STATE_01 | Visualization of the medical case using artificially generated status data, including history | See [[test-specifications]] | - TR_M_03<br>- TR_M_04 |

| Priority | Status | Error class |
|---|---|---|
| Medium | Completed | None |

| Test case ID          | Test case name                                                                | Test protocol(s)            | Method(s)              |
| --------------------- | ----------------------------------------------------------------------------- | --------------------------- | ---------------------- |
| UITF_DET_VIS_STATE_02 | Visualization of various error messages using artificially generated problems | See [[test-specifications]] | - TR_M_03<br>- TR_M_04 |

| Priority | Status | Error class |
|---|---|---|
| Medium | Completed | None |

# 8. Applicable Documents

| Document name | Reference (local ID) |
|---|---|
| [[test-specifications]] | *local ID* |
| [[test-plan]] | *local ID* |
