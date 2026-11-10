# Architecture and Design - *Product Name*

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |


# 1. Introduction

## 1.1 Product

| Product name   | Version |
| -------------- | ------- |
| *Product name* | *1.0*   |

## 1.2 Definitions

| Term            | Definition                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------- |
| VM              | Virtual machine                                                                              |
| HIS             | Hospital information system                                                                  |
| CDC             | Change data capture                                                                          |
| ETL             | Extract, transform, load                                                                     |
| High priority   | Absence of this component would prevent the overall system from functioning.                 |
| Medium priority | Absence of this component would severely restrict the overall system function.               |
| Low priority    | Absence of this component would only slightly restrict the overall system function.          |
| *message*       | Individual message assigned to a *topic* in the Apache Kafka *stream-processing* platform    |
| *topic*         | Data stream of a higher-level data category in the Apache Kafka *stream-processing* platform |

# 2. System Specification

The system consists of six high-level components (Figure 1). How these components interact in detail is shown in Figure 2.
![[architecture.png]]
Figure 1. Global overview of system components in *product name*.


| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| DQ | Data source component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_CONT; SyA_NFA_SA_SAND; SyA_NFA_L_EV; SyA_ES_SS_DB; SyA_NFA_SQ_SL; SyA_NFA_SQ_DD | No | Yes, implemented by subcomponent | DS |

Provision of structured routine data from patient care at *hospital Name* in source-system format and near real time for further processing in the decision support system.

**Acceptance criteria:** All acceptance criteria of this component's subcomponents are fulfilled.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| DS | Data stream component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_CONT; SyA_NFA_SA_SAND; SyA_NFA_L_EV; SyA_NFA_SQ_SL | No | Yes, implemented by subcomponent |  |

Processing of structured routine data from *hospital Name* as messages in higher-level data categories (topics). Message order within a patient is ensured by use of identifying characteristics of the related medical case (case-centric processing). Messages are provided for further processing and use within SCO, BACK, and ETL.

**Acceptance criteria:** All acceptance criteria of this component's subcomponents are fulfilled.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| ETL | ETL component (extract/transform/load) | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_CONT; SyA_NFA_SA_SAND; SyA_NFA_L_EV; SyA_NFA_SQ_SL | No | Yes, implemented by subcomponents | DS |

Conversion/enrichment of incoming messages into a predefined AMPEL format.

**Acceptance criteria:** All acceptance criteria of this component's subcomponents are fulfilled.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| SCO | Scoring component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_CONT; SyA_NFA_SA_SAND; SyA_NFA_SQ_MOD; SyA_NFA_SQ_SL | No | Yes, implemented by subcomponents | DS |

Use ofthe provided routine patient data of *hospital name* to calculate scores, the results of which form the basis of notifications to CDSS users.

**Acceptance criteria:** All acceptance criteria of this component's subcomponents are fulfilled.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| BACK | Backend component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_CONT; SyA_NFA_SA_SAND; SyA_NFA_SQ_SL | No | Yes, implemented by subcomponents | DS |

Merging and aggregation of all score results and provision for subsequent notification channels: frontend component requests and email notification dispatch.

**Acceptance criteria:** All acceptance criteria of this component's subcomponents are fulfilled.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| FRONT | Frontend component | Medium | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_CONT; SyA_NFA_SA_SAND; SyA_NFA_SQ_SUI; SyA_NFA_SQ_MINI; SyA_NFA_SQ_UEB; SyA_NFA_SQ_SL | No | Yes, implemented by subcomponent | DS |

User interface for querying score results.

**Acceptance criteria:** All acceptance criteria of this component's subcomponents are fulfilled.


![](assets/Architektur_Übersicht_AMPEL.jpeg)
Figure 2. Overview of the interactions between all system components in *product Name*. (*Note: Due to upcoming changes to this architecture, the graphic was not translated into English.*)

## 2.2 Data Source Component

![[LAMPE-data-source-component-en.drawio.svg]]

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| DQ_CDC | CDC (change data capture) monitoring component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_CONT; SyA_NFA_SA_SAND; SyA_NFA_L_EV; SyA_ES_SS_DB; SyA_NFA_SQ_SL; SyA_NFA_SQ_DD | No | Yes, implemented by SOUP_CDC | DS_STREAM |

The component consists of a Debezium instance (see SOUP) that monitors the transaction log from the AMPEL DB (source system on the designated *local data-source VM*) and outputs changes as JSON messages to the data stream component (target system).

**Acceptance criteria:** Changes in AMPEL DB in monitored tables (case, patient, laboratory findings, laboratory metadata, procedures) lead to messages in raw data streams of the data stream component. Ultimately, they lead to results through output channels. A corresponding system test with control of case, patient, laboratory, and procedure data is passed successfully.

## 2.3 Data Stream Component

![[LAMPE-data-stream-component-en.drawio.svg|243]]


| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| DS_STREAM | Streaming component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_CONT; SyA_NFA_SA_SAND; SyA_NFA_L_EV; SyA_NFA_SQ_SL | No | Yes, implemented by SOUP_AK |  |

The component consists of a single-node Apache Kafka instance and receives JSON messages from the data source component as primary input. These are made available as raw topics (raw data streams) for connected services. Services can also return processed or new topics to the streaming component and make them available to other services, e.g. result data stream or AMPEL-compliant data streams.

**Acceptance criteria:** See acceptance criteria ETL_PROCESS (integration test) and SCO_AKI (integration test).

## 2.4 ETL Component

![[LAMPE-etl-components-en.drawio.svg|454]]

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| ETL_PROCESS | Stream processing component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_NFA_L_EV; *local data mapping* | No | Yes, implemented by SOUP_AF | DS_STREAM |

A single-node Apache Flink instance (SOUP) coordinates parallel ETL processes on raw data streams of the streaming component and acts as scheduler. This enables execution of stream-processing jobs, e.g. transformation, combination, enrichment, within the subcomponents ETL_PAT, ETL_PROZ, ETL_FALL, and ETL_LAB.

**Acceptance criteria:** Outgoing data streams are AMPEL-compliant topics. All incoming raw-format data streams (from the *local source system* for patient, case, laboratory findings, laboratory metadata, and procedures) are cleaned according to required data quality. Relevant source-system and AMPEL-compliant topics and quality features are listed in the *local data mapping*.

| ID      | Name              | Priority | Traceability                                                                                                                               | Risk control measure? | SOUP?                                                                                         | Dependencies                                      |
| ------- | ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| ETL_PAT | Patient component | High     | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_NFA_L_EV; FMEA_PD_R011.1; FMEA_PD_R012.1; <br>*local data mapping* | Yes                   | Yes, SOUP_MDB_SYNC, SOUP_JCOMM, SOUP_CM3, SOUP_SLF4J, SOUP_LOG4J, SOUP_AF_KC_LIB, SOUP_AF_LIB | ETL_PROCESS; SCO_FRAME_KAFKA_W; SCO_FRAME_KAFKA_R |

Raw messages for the patient data stream (raw topic) from the streaming component are converted according to the *local data mapping* into an enriched patient data stream (= AMPEL-compliant patient data stream) and played back to the streaming component.

**Acceptance criteria:** Successful transformation of patient data into the corresponding AMPEL format.

| ID      | Name                 | Priority | Traceability                                                                                                                               | Risk control measure? | SOUP?                                                                                         | Dependencies                                      |
| ------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| ETL_LAB | Laboratory component | High     | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_NFA_L_EV; FMEA_PD_R011.1; FMEA_PD_R012.1; <br>*local data mapping* | Yes                   | Yes, SOUP_MDB_SYNC, SOUP_JCOMM, SOUP_CM3, SOUP_SLF4J, SOUP_LOG4J, SOUP_AF_KC_LIB, SOUP_AF_LIB | ETL_PROCESS; SCO_FRAME_KAFKA_W; SCO_FRAME_KAFKA_R |

Raw messages for laboratory value and laboratory metadata streams (raw topics) from the streaming component are merged/formatted into an enriched laboratory data stream according to the *local data mapping* and played back to the streaming component.

**Acceptance criteria:** Correct function of the various filters (time filter for laboratory data, time filter for laboratory metadata, value-based filter for laboratory data). Successful transformation of laboratory data and laboratory metadata into the corresponding AMPEL format.

| ID       | Name                | Priority | Traceability                                                                                                                               | Risk control measure? | SOUP?                                                                                         | Dependencies                                      |
| -------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| ETL_PROZ | Procedure component | High     | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_NFA_L_EV; FMEA_PD_R011.1; FMEA_PD_R012.1; <br>*local data mapping* | Yes                   | Yes, SOUP_MDB_SYNC, SOUP_JCOMM, SOUP_CM3, SOUP_SLF4J, SOUP_LOG4J, SOUP_AF_KC_LIB, SOUP_AF_LIB | ETL_PROCESS; SCO_FRAME_KAFKA_W; SCO_FRAME_KAFKA_R |

Raw messages for the procedure data stream (raw topic) from the streaming component are converted according to the *local data mapping* into an enriched procedure data stream and played back to the streaming component.

**Acceptance criteria:** Correct function of the various filters (value-based filter regarding procedure execution). Successful transformation of procedure data into the corresponding AMPEL format.

| ID       | Name           | Priority | Traceability                                                                                                                              | Risk control measure? | SOUP?                                                                                         | Dependencies                                      |
| -------- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| ETL_FALL | Case component | High     | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_NFA_L_EV; FMEA_PD_R011.1; FMEA_PD_R012.1;<br>*local data mapping* | Yes                   | Yes, SOUP_MDB_SYNC, SOUP_JCOMM, SOUP_CM3, SOUP_SLF4J, SOUP_LOG4J, SOUP_AF_KC_LIB, SOUP_AF_LIB | ETL_PROCESS; SCO_FRAME_KAFKA_W; SCO_FRAME_KAFKA_R |

Raw messages for the case data stream (raw topic) from the streaming component are converted according to the *local data mapping* into an enriched case data stream and played back to the streaming component.

**Acceptance criteria:** Correct function of the various filters (time filter, status filter). Successful transformation of case data into the corresponding AMPEL format.

## 2.5 Scoring Components

![[LAMPE-scoring-components-en.drawio.svg|403]]


| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| SCO_FRAME_KAFKA_R | Kafka reader of the scoring framework | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_L_EV; SyA_NFA_SQ_MOD; SyA_NFA_SA_CONT; FMEA_PD_R005.1 | Yes | Yes, SOUP_LOMBOK, SOUP_LOGBACK, SOUP_AKC, SOUP_JACKSON | DS_STREAM |

Allows configuration of **read access** to a Kafka cluster (bootstrap server, topic, consumer group ID, etc.). It commits read messages to Kafka and forwards read messages from the configured data stream to user-defined functions, e.g. result topic to BACK_ERG or AMPEL-compliant topics to SCO_AKI.

**Acceptance criteria:** See acceptance criteria in ETL_PROCESS and SCO_AKI.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| SCO_FRAME_KAFKA_W | Kafka writer of the scoring framework | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_L_EV; SyA_NFA_SQ_MOD; SyA_NFA_SA_CONT; FMEA_PD_R005.1 | Yes | Yes, SOUP_LOMBOK, SOUP_LOGBACK, SOUP_AKC, SOUP_JACKSON | DS_STREAM |

Allows configuration of **write access** to a Kafka cluster (bootstrap server, topic, client ID, etc.). Messages to be written are queued according to the configured topic (order is important). Messages are written, for example, to the data stream AMPEL_RESULTS using schema `ResultMessage`:

id (UUID)
orderId (string)
scoringSystemName (string)
scoringSystemVersion (string)
patientId (string)
medicalCaseId (string)
resultStatus (factor – CDSS status)
severityRepresentation (string – CDSS severity level)
severityComment (string)
analyteName (string)
analyteValue (double)
analyteValueUnit (string)
analyteMeasuringTime (DateTime)
resultCreationDateTime (DateTime)
meta (json – further metadata of the algorithm)

**Acceptance criteria:** See acceptance criteria in SCO_AKI.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| SCO_FRAME_WORK_DSG | Workflow designer of the scoring framework | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SQ_MOD; SyA_NFA_SA_CONT; FMEA_PD_R005.1 | Yes | Yes, SOUP_LOGBACK, SOUP_LOMBOK |  |

Allows creation of DAGs (acyclic graphs) for initial implementation of algorithms provided as flowcharts. Graph nodes are predefined building blocks or freely implementable functions. Transitions between nodes can be direct or conditional.

SCO_AKI uses this component to create the AKI workflow stored in SCO_AKI.

**Acceptance criteria:** See acceptance criteria in SCO_AKI.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| SCO_FRAME_WORK_SCH | Workflow scheduler of the scoring framework | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SQ_MOD; SyA_NFA_SA_CONT; FMEA_PD_R005.1 | Yes | Yes, SOUP_LOGBACK, SOUP_LOMBOK | SCO_FRAME_WORK_DSG |

Allows execution planning of workflows based on key information (medical case ID). Workflow execution within a key occurs sequentially while maintaining original order. Across several keys, i.e. processing of medical cases, workflows are executed in parallel.

**Acceptance criteria:** See acceptance criteria in SCO_AKI.

| ID      | Name          | Priority | Traceability                                                                                                                                                                       | Risk control measure? | SOUP?                                                | Dependencies                                                                             |
| ------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| SCO_AKI | AKI component | High     | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_NFA_L_EV; SyA_FA_SCORE_SCHWER; SyA_FA_SCORE_STATUS; SyA_FA_SCORE_AKI; FMEA_PD_R005.1;<br>[[algorithm-aki]] | Yes                   | Yes, SOUP_LOMBOK, SOUP_LOGBACK, SOUP_VAVR, SOUP_C3P0 | SCO_FRAME_WORK_SCH; SCO_FRAME_WORK_DSG; SCO_FRAME_KAFKA_W; SCO_FRAME_KAFKA_R; SCO_AKI-DB |

Reads AMPEL-compliant streams (AMPEL_PATIENTS, AMPEL_CASES, AMPEL_LABORATORY, AMPEL_PROCEDURES) from the streaming component. It filters relevant contents (AMPEL_LABORATORY: serum creatinine values, vancomycin values; AMPEL_PROCEDURES: dialysis procedures) and stores them case-centrically in a separate AKI DB component. Each incoming serum creatinine message triggers processing according to the workflow defined in [[algorithm-aki]], including relevant information from the AKI DB. Workflow output messages are returned to AMPEL_RESULTS in DS_STREAM and contain the CDSS result (red, yellow, green) plus metadata from relevant AKI algorithm inputs.

**Acceptance criteria:** Incoming AMPEL-compliant topics (case, patient, laboratory, procedure) in the streaming component lead to the expected result. Correct calculation and persistence of all possible *product name* states for the AKI scoring system are performed.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| SCO_AKI-DB | AKI DB component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_FA_SCORE_SCHWER; SyA_FA_SCORE_STATUS; SyA_FA_SCORE_AKI; FMEA_PD_R005.1 | Yes | Yes, SOUP_DB_MONGO, SOUP_JACKSON |  |

Persists and indexes contents passed to the database by SCO_AKI and makes them available for querying. The database has the following contents:

**Procedure**
medicalCaseId (string)
procedureID (string)
procedureCode (string)
conductTime (string)
cancellationTime (DateTime)

**Patient**
patientID (string)
firstname (string)
lastname (string)
dateOfBirth (Date)
deceased (Boolean)
dischargeTime (DateTime)

**MedicalCase**
medicalCaseId (string)
patientIdRef (string)
creationDate (DateTime)
cancellationDate (DateTime)

**Laboratory**
medicalCaseId (string)
orderID (string)
analyte (string)
analyteValue (double)
analyteUnit (string)
originatingSystem (string)
measuringTime (DateTime)


**Acceptance criteria:** See acceptance criteria in SCO_AKI.

## 2.6 Backend Components

![[LAMPE-backend-components-en.drawio.svg|529]]

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| BACK_SER | Result web server component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_FA_SCORE_AGGR; SyA_ES_SS_KAS; FMEA_PD_R007.1 | Yes | Yes, SOUP_JACKSON, SOUP_LOMBOK, SOUP_LOGBACK, SOUP_SPRING | BACK_ERG; BACK_META; BACK_DB |

The Case Dashboard component (FRONT_CASE) requests all score statuses for a submitted medical case (Request 1) and the associated patient header data (Request 2) here. The component, in turn, commissions the Results component (BACK_ERG) and the Metadata component (BACK_META) to compile these statuses/information and returns them to FRONT_CASE.

Individual requests for aggregated CDSS statuses arrive here from the workplace system (individual transfer of medical cases) and are processed analogously to the request by FRONT_CASE and forwarded to the workplace system.

**Acceptance criteria:** Backend information is output correctly when requested through the HTTP interface.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| BACK_DB | Backend DB component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_FA_SCORE_AGGR; FMEA_PD_R007.1 | Yes | Yes, SOUP_DB_POST, SOUP_LOMBOK, SOUP_LOGBACK, SOUP_DB_POST_LIB, SOUP_SPRING |  |

Persists and indexes contents of the result data stream and data streams for medical cases and patients passed to the database by BACK_ERG and BACK_META, making them available for querying. The database has the following contents:

**Results**
id (primary key)
medicalCaseId (string)
patientId (string)
orderId (string)
scoringSystemName (string)
scoringSystemVersion (string)
visualizedSeverity (factor - CDSS status)
severityCode (string – CDSS severity level)
severityComment (string)
analyte (string)
analyteValue (double)
analyteUnit (string)
analyteMeasuringTime (DateTime)
creationTime (DateTime)
meta (json – further metadata of the algorithm)

**Medical Cases**
id (primary key)
patientId (string)

**Patients**
id (primary key)
firstname (string)
lastname (string)
dateOfBirth (Date)
sex (factor)


**Acceptance criteria:** The backend can correctly persist and provide case and result data in the system.

| ID       | Name             | Priority | Traceability                                                                                                                                                                    | Risk control measure? | SOUP?                          | Dependencies                                             |
| -------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------ | -------------------------------------------------------- |
| BACK_ERG | Result component | High     | SyA_ES_HS_VM;<br>SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_FA_MAIL_; SyA_FA_SCORE_STATUS; SyA_FA_SCORE_SCHWER; SyA_FA_SCORE_AGGR; SyA_ES_SS_KAS; FMEA_PD_R007.1 | Yes                   | Yes, SOUP_LOMBOK, SOUP_LOGBACK | SCO_FRAME_KAFKA_R;<br>DS_STREAM;<br>BACK_DB;<br>BACK_ORC |

The component retrieves the result data stream from the streaming component (DS_STREAM) using the Kafka Reader (SCO_ FRAME_KAFKA_R). Each message in this data stream immediately triggers the execution of downstream processes. These process steps are stored in BACK_ORG, are coordinated from there, and their complete execution is ensured.

One of these processes is triggering the Notification Service to:
- Hold the result message
- Add associated metadata from BACK_DB
- Check the logic stored here for deciding whether to send an email (depending on the CDSS status (green, yellow, red))
- If the decision is positive, pass the result message and metadata to BACK_MAIL

The business logic for passing results to the web server component (BACK_SER) is also stored here. For requests initially coming from the workstation system, an aggregated CDSS status (according to the stored logic) is returned. For requests initially coming from FRONT_CASE, all individual results for the case are passed along.

**Acceptance criteria:** The service layer between backend application layer and infrastructure layer can process result data from scoring systems for medical cases.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| BACK_META | Metadata component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_FA_MAIL_STAMM; SyA_FA_MAIL_INH; SyA_FA_UI_STAMM; FMEA_PD_R007.1 | Yes | Yes, SOUP_LOMBOK, SOUP_LOGBACK | SCO_FRAME_KAFKA_R; DS_STREAM; BACK_DB |

The component retrieves the metadata of medical cases (= AMPEL-compliant topics for cases and patients) from the streaming component (DS_STREAM) using the Kafka Reader (SCO_ FRAME_KAFKA_R). Each message immediately triggers storage in the backend database (BACK_DB).

The business logic for transferring the metadata to the web server component (BACK_SER) is also stored here, i.e., the request to the database for metadata to be passed through to FRONT_CASE.

**Acceptance criteria:** The service layer between backend application layer and infrastructure layer can query metadata on medical cases.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| BACK_ORC | Workflow orchestration component | High | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_FA_MAIL_VERS | No | Yes, SOUP_TEMP, SOUP_DB_POST, SOUP_TEMP_LIB |  |

The tool allows processes of the results component (BACK_ERG) to be fully executed so that they always run reliably from beginning to end. The processes stored here are:

1. Saving each message in the backend database (BACK_DB)
2. Triggering the notification service of the results component (BACK-ERG).

**Acceptance criteria:** Result data can be used correctly in the backend using the orchestration component.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| BACK_MAIL | Mail client component | Medium | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_FA_MAIL_INH; SyA_ES_SS_MAIL; PHA_PD_R006.1 | Yes | Yes, SOUP_JM_API, SOUP_ANGUSM, SOUP_HANDLE | BACK_RELAY; BACK_DB; BACK_ERG; BACK_META |

Receives an order from BACK_ERG to send an email together with relevant result and metadata. These data are inserted into an email template, provided with sender and recipient, and passed to BACK_RELAY. Email template, sender address, and recipient address are stored here. The recipient is the *local mailbox*.

**Acceptance criteria:** Email recipients are exclusively within the *local email domain*. A system test confirms sending and receiving of emails.

| ID | Name | Priority | Traceability | Risk control measure? | SOUP? | Dependencies |
|---|---|---|---|---|---|---|
| BACK_RELAY | Mail relay component | Medium | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_FA_MAIL_VERS | No | Yes, SOUP_POST |  |

Receives an order from BACK_MAIL to send an email that was predefined in BACK_MAIL. The email is forwarded to the *local SMTP server*; adequate error handling occurs if the server cannot be reached.

**Acceptance criteria:** A system test confirms sending and receiving of emails.

## 2.7 Frontend Component

![[LAMPE-frontend-component-en.drawio.svg|276]]

| ID         | Name                     | Priority | Traceability                                                                                                                                                                                                                                                                                                                                                                                                                       | Risk control measure? | SOUP?                                                                                          | Dependencies |
| ---------- | ------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------- | ------------ |
| FRONT_CASE | Case dashboard component | Medium   | SyA_ES_HS_VM; SyA_BU_INST_DOCKER; SyA_NFA_SA_SAND; SyA_NFA_SA_CONT; SyA_ES_SS_PC; SyA_ES_HS_PC; SyA_ES_NS_UI;<br><br>SA_FA_UI_STAMM; SA_FA_UI_FB; SA_FA_UI_START; SA_FA_UI_DETAIL; SA_FA_UI_HINWEIS; SA_FA_UI_DATEN; SA_FA_UI_LINK;<br><br>SyA_NFA_SA_AUI; SyA_NFA_SQ_SUI; SyA_NFA_SQ_MINI; SyA_NFA_SQ_UEB;<br><br>PHA_PD_R001.1; PHA_PD_R002.1; PHA_PD_R003.1; PHA_PD_R004.1; PHA_PD_R005.1; FMEA_PD_R002.1;<br>[[algorithm-aki]] | Yes                   | Yes, SOUP_FAKER, SOUP_LUCIDE_REACT, SOUP_REACT_ROUTER, SOUP_REACT_DOM, SOUP_RECHARTS, SOUP_ZOD | BACK_SER     |

The component displays the contents of the results DB for a selected medical case in detail and in a structured format. This includes individual results from the scoring algorithms, patient header data for the medical case (patient number, medical case number, name, date of birth), contact options, and medical notes about the notification (see, e.g., [[algorithm-aki]]).

The initial view is the overview page:

![[LAMPE-case-dashboard-overview-en.drawio.svg]]


Clicking a status tile in "critical states" or "warning states" opens the detail page for the selected scoring algorithm with the following structure:

![[LAMPE-case-dashboard-detail-en.drawio.svg]]


The alarm history (including measurement time, laboratory analyte, measurement value, and calculated CDSS status) is displayed as a table (or as a chart after clicking).
 
If CDSS data and/or patient master data are missing, the corresponding error page is displayed.

**Acceptance criteria:** All UI components, including error views, work and render as expected. Contact information is visible. Patient-identifying information is prominently displayed.

# 3. Applicable Documents

| Document name           | Reference (local ID) |
| ----------------------- | -------------------- |
| *local data mapping*    | *local ID*           |
| [[algorithm-aki]]       | *local ID*           |
| [[soup-list]]           | *local ID*           |
| [[system-requirements]] | *local ID*           |
| [[risk-table]]          | *local ID*           |
