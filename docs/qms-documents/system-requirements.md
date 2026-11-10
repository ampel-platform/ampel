# System Requirements - *Product Name*

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |


# 1. Introduction

## 1.1 Product

| Product name   | Version |
| -------------- | ------- |
| *Product Name* | *1.0*   |

## 1.2 Definitions

| Term   | Definition                                                                                           |
| ------ | ---------------------------------------------------------------------------------------------------- |
| CDSS   | Clinical decision support system                                                                     |
| HIS    | Hospital information system                                                                          |
| CWS    | Clinical workstation System                                                                          |
| UI     | User interface                                                                                       |
| VM     | Virtual machine                                                                                      |
| CDC    | Change data capture (recording database activities when changes occur)                               |
| AKI    | Acute kidney injury                                                                                  |
| VA-AKI | Vancomycin-associated acute kidney injury                                                            |
| ISMS   | Information security management system                                                               |
| BSI    | German Federal Office for Information Security (Bundesamt für Sicherheit in der Informationstechnik) |

# 2. External Interfaces and Operating Environment

## 2.1 User Interfaces

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_ES_NS_UI | User interface | Medium | StA_NA_003 | No | SyA_ES_HS_PC; SyA_ES_SS_PC; SyA_ES_HS_VM |

In user mode, the system must display a user interface in a web browser with score and patient information for a selected medical case. Displayed information is obtained from SyA_ES_HS_VM.

**Acceptance criteria:** The user interface is readable for the user on *local standard displays*. Confirmed by at least 2 persons.

## 2.2 Hardware Interfaces

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_ES_HS_PC | Local standard PC hardware | Medium |  | No | SyA_ES_SS_PC |

The software has no dedicated hardware interfaces. In order to call the UI from the CWS, the same hardware requirements must be fulfilled on the *local standard PC* as for the current CWS.

**Acceptance criteria:** Users can open the current CWS with integrated CDSS column on a *local standard PC*. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_ES_HS_VM | Linux virtual machine | High | *local infrastructure specification* | No |  |

The software architecture, including data storage, runs productively on a VM with a Linux operating system (operating environment). The VM is set up according to the requirements of the *local IT department*. Specific requirements:

- at least 400 GB storage, directly or mounted
- at least 4 CPU cores
- at least 32 GB RAM
- Docker container runtime available
- network approval for connection to AMPEL DB

**Acceptance criteria:** The listed requirements are fulfilled. Confirmed by at least 2 persons.

## 2.3 Software Interfaces and Operating System

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_ES_SS_DB | Database interface (input) | High | StA_NA_016; *local data mapping* | No | SyA_ES_HS_VM |

The system must be able to access an MSSQL database, minimum version MSSQL 2019, with current routine patient data as data input. The routine data concern the tables and variables specified in the *local data mapping*.

The database must have CDC enabled. A stored user account for requests from SyA_ES_HS_VM must exist and have permission to read CDC. Port 1433 must be open for access by SyA_ES_HS_VM.

**Acceptance criteria:** The system has database access and the database interface fulfills the listed requirements. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_ES_SS_PC | Local standard PC software | Medium |  | No | SyA_ES_HS_PC |

In order to call the UI from the CWS, the same software requirements must be fulfilled on the *local standard PC* as for the current CWS.

**Acceptance criteria:** The current CWS with integrated CDSS column should be reachable and openable on a *local standard PC*. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_ES_SS_KAS | CDSS interface to the CWS | Medium | StA_NA_001; StA_NA_002; *local CWS integration specification* | No | SyA_ES_NS_UI |

The local CWS must display exactly one aggregated CDSS status per medical case ID (from 4 possible states) in an assigned CDSS column. Each CDSS status is assigned exactly one pictogram. Interface specifications are defined in the *local CWS integration specification*.

A link is stored for forwarding to a web service (CDSS UI) for the aggregated state by mouse click. The link leads to SyA_FA_UI_START.

**Acceptance criteria:** All four possible states are visible in the CWS. A jump from there leads to the user interface for the corresponding medical case. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_ES_SS_MAIL | CDSS interface for email dispatch | Medium | StA_NA_009 | No |  |

A prepared email is handed over to the *local notification mailbox* for each notification using the mailbox credentials.

**Acceptance criteria:** The mailbox receives the generated emails. Confirmed by at least 2 persons.

## 2.4 Communication Interfaces

Apart from sending emails, see SyA_ES_SS_MAIL, there are no additional communication interfaces.

## 2.5 Installation

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_BU_INST_SPALTE | Displaying the CDSS column | Medium | StA_NA_001; StA_NA_002 | No | SyA_ES_HS_PC; SyA_ES_SS_PC |

The CDSS column, see SyA_ES_SS_KAS, must be displayable in the patient overview of the CWS. Instructions are provided in the instructions for use.

**Acceptance criteria:** The CDSS column can be displayed according to the instructions for use. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_BU_INST_DOCKER | System startup | Low | FMEA_PD_R003.1 | Yes | SyA_ES_HS_VM |

The system infrastructure consists of several software components that are started on the Linux VM (SyA_ES_HS_VM) according to the order defined by Docker Compose. Docker Compose is configured so that all components restart automatically in case of failure.

**Acceptance criteria:** Docker Compose exists, contains all relevant system components, and automated restarts are configured. Confirmed by at least 2 persons.

## 2.6 Documentation

| ID         | Name                 | Priority | Traceability                                                                                                                        | Risk control measure? | Dependencies                                                                                                                                                                                                                                                                                                  |
| ---------- | -------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SyA_ES_IFU | Instructions for use | Medium   | StA_RA_02; StA_NA_012; PHA_PD_R001.1; PHA_PD_R003.1; PHA_PD_R004.1; PHA_PD_R005.1; *local SOP for development of in-house software* | Yes                   | SyA_BU_INST_SPALTE; SyA_ES_SS_MAIL; SyA_ES_SS_KAS; SyA_FA_UI_STAMM; SyA_FA_UI_FB;<br>SyA_FA_UI_;<br>SyA_FA_UI_DETAIL; SyA_FA_UI_HINWEIS; SyA_FA_UI_DATEN; SyA_FA_UI_LINK; SyA_FA_MAIL_VERS; SyA_FA_MAIL_STAMM; SyA_FA_MAIL_INH; SyA_FA_SCORE_STATUS; SyA_FA_SCORE_SCHWER; SyA_FA_SCORE_AGGR; SyA_FA_SCORE_AKI |

All system functions and software features provided by the software must be documented in online instructions for use (IFU), accessible through the local document management system. A document template is used. Additional content includes description of the scoring algorithms and a disclaimer warning that notifications must always be assessed in the overall medical context.

**Acceptance criteria:** The IFU is available through the local document management system with the required content. Confirmed by at least 2 persons.

# 3. Functional Requirements

## 3.1 User Interface

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_FA_UI_STAMM | Patient master data | Medium | StA_NA_003 | No |  |

The user interface must clearly display patient master data (medical case ID, patient number, first name, last name, date of birth, sex) for a selected patient at all times.

**Acceptance criteria:** The UI clearly displays patient master data for a selected patient at all times. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_FA_UI_FB | Feedback | Low | StA_NA_008; *local SOP for feedback and complaint management* | No | SyA_FA_UI_DETAIL; SyA_FA_UI_START |

The user interface must display contact information at all times through which local internal requests regarding the system can be submitted. The information path and further processing follow the *local SOP for feedback and complaint management*.

**Acceptance criteria:** The UI displays contact information at all times. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_FA_UI_START | Start view (overview) | Low | StA_NA_003 | No | SyA_FA_SCORE_STATUS |

The UI for a selected patient must provide an overview of all current results for applied scoring algorithms. Relevant scoring algorithms are grouped by current CDSS status (SyA_FA_SCORE_STATUS). Critical states are arranged at the top and states with no findings at the bottom. Each group is marked by color: critical red, warning yellow, no findings grey.

**Acceptance criteria:** A clear presentation of current results exists in the UI, grouped and colored as specified. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_FA_UI_DETAIL | Transition to detail view | Low |  | No | SyA_FA_UI_START; SyA_FA_SCORE_STATUS |

The CDSS status (SyA_FA_SCORE_STATUS) of each scoring algorithm in the start view of a selected patient (SyA_FA_UI_START) is shown as a clickable tile that forwards to detailed information for that scoring algorithm.

**Acceptance criteria:** The specified UI design has been implemented. Confirmed by at least 2 persons.

| ID                | Name                            | Priority | Traceability           | Risk control measure? | Dependencies                                               |
| ----------------- | ------------------------------- | -------- | ---------------------- | --------------------- | ---------------------------------------------------------- |
| SyA_FA_UI_HINWEIS | Notification text (detail view) | Low      | StA_NA_004; StA_NA_007 | No                    | SyA_FA_UI_DETAIL; SyA_FA_SCORE_SCHWER; SyA_FA_SCORE_STATUS |

In the detail view for a scoring algorithm, there is a concise description of how the current CDSS status notification arose and which recommendation results from it. This text is unambiguously derived from the severity of the CDSS status for the current notification (SyA_FA_SCORE_STATUS, SyA_FA_SCORE_SCHWER).

**Acceptance criteria:** The specified UI design has been implemented. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_FA_UI_DATEN | Contributing data (detail view) | Low | StA_NA_005 | No | SyA_FA_UI_DETAIL |

In the detail view for a scoring algorithm, users receive a list of the laboratory findings that led to execution of the respective scoring algorithm. This view is available as a table with latest result first or graphically and includes at least:

- measurement time
- designation, measured value and unit of laboratory analytes
- CDSS status resulting from the data point (SA_FA_SCORE_STATUS)

**Acceptance criteria:** The specified UI design has been implemented. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_FA_UI_LINK | Access to further information (detail view) | Low | StA_NA_006 | No | SyA_FA_UI_DETAIL; SyA_ES_DOC |

In the detail view for a scoring algorithm, users have access to at least one further information source, e.g. instructions-for-use with information on the scoring algorithm, a *local SOP*, or information matching the algorithm in a quality-assured knowledge database.

**Acceptance criteria:** The specified UI design has been implemented. Confirmed by at least 2 persons.

## 3.2 Email

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_FA_MAIL_VERS | Email dispatch conditions | Medium | StA_NA_009 | No | SyA_FA_SCORE_STATUS |

Email notifications to the *local notification mailbox* for a scoring algorithm are always sent reliably when a detected CDSS status (SyA_FA_SCORE_STATUS) is critical or warning.

**Acceptance criteria:** Critical and warning CDSS statuses are received in the mailbox. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_FA_MAIL_STAMM | Patient master data in email | Medium | StA_NA_010; PHA_PD_R002.1 | Yes |  |

The email notification must always clearly display patient master data (case ID, patient number, first name, last name, date of birth) for a selected person, e.g. directly in the subject.

**Acceptance criteria:** The email contains the listed requirements. Correctness of the information is compared with and checked against the primary HIS. Confirmed by at least 2 persons.

| ID              | Name          | Priority | Traceability | Risk control measure? | Dependencies                                                                   |
| --------------- | ------------- | -------- | ------------ | --------------------- | ------------------------------------------------------------------------------ |
| SyA_FA_MAIL_INH | Email content | Low      |              | No                    | SyA_FA_MAIL_STAMM; SyA_FA_SCORE_STATUS; SyA_FA_SCORE_SCHWER; SyA_FA_UI_HINWEIS |

In addition to SyA_FA_MAIL_STAMM, email notifications contain clear and structured information on
- the algorithm for which an alert is issued
- CDSS status (SyA_FA_SCORE_STATUS)
- CDSS severity (SyA_FA_SCORE_SCHWER) including action recommendation analogous to SyA_FA_UI_HINWEIS
- Contributing data such as measurement time, name, measured value and unit of the laboratory analyte, and further algorithm-specific information for the medical case or patient where applicable.

Emails originate from the *local notification mailbox*.

**Acceptance criteria:** Emails contain the listed information in the expected form. Confirmed by at least 2 persons.

## 3.3 Scoring Systems

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_FA_SCORE_STATUS | CDSS status | Medium |  | No | SyA_FA_SCORE_AKI |

For each incoming data point (individually defined for each scoring algorithm; see, for example, SyA_FA_SCORE_AKI), the system calculates **exactly one** final state (= CDSS status), which corresponds to one of the following categories:
- Non-critical or green
- Warning or yellow
- Critical or red
and is stored together with unique key variables (e.g., medical case number, name of the scoring algorithm, information about the triggering lab value).

**Acceptance criteria:** Review of 10 incoming data points to check whether final state and key variables are specified. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_FA_SCORE_SCHWER | CDSS severity | Medium |  | No | SyA_FA_SCORE_AKI; SyA_FA_SCORE_STATUS |

IIn addition to the CDSS status (SA_FA_SCORE_STATUS), the system calculates **exactly one** severity level for each incoming data point, which describes the CDSS status in greater detail. These severity levels are defined individually for each scoring algorithm (e.g., SyA_FA_SCORE_AKI) and are uniquely assigned to a notification text that can be used, for example, for display it in the user interface (SA_FA_UI_HINWEIS).

**Acceptance criteria:** Severities and notification texts correspond to each other. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_FA_SCORE_AGGR | Aggregated CDSS status | Medium | StA_NA_001 | No | SyA_ES_SS_KAS; SyA_FA_SCORE_STATUS |

When a status request is made by the CWS (defined in SyA_ES_SS_KAS), the system outputs exactly one aggregated CDSS status (from 4 possible states per medical case ID). Aggregation for the medical case is based on
- the current status of all active scoring algorithms
- the most severe of these current statuses.

Possible states, from least severe to most severe:
- empty/no CDSS status for this medical case
- non-critical/green
- warning/yellow
- critical/red

**Acceptance criteria:** A manual check that the aggregated CDSS status corresponds to the respective data situation is successful. Confirmed by at least 2 persons.

| ID               | Name                                                                           | Priority | Traceability                  | Risk control measure? | Dependencies                             |
| ---------------- | ------------------------------------------------------------------------------ | -------- | ----------------------------- | --------------------- | ---------------------------------------- |
| SyA_FA_SCORE_AKI | Detection of acute kidney injury and vancomycin-associated acute kidney injury | High     | StA_NA_017; [algorithm-aki](algorithm-aki) | No                    | SyA_FA_SCORE_SCHWER; SyA_FA_SCORE_STATUS |

When a new serum creatinine value is available for this patient, the system calculates the presence of acute kidney injury (AKI) according to the KDIGO guideline (Kidney Disease: Improving Global & Outcomes (KDIGO) Acute Kidney Injury Work Group. (2012). KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney International Supplements, 2(1), 124–138. https://doi.org/10.1038/kisup.2012.1).

As an adaptation of the guideline:
- No information on urine output is included.
- Serum creatinine values measured within 7 days after renal replacement therapy always result in the CDSS status “non-critical.”
- The presence of a laboratory order for a vancomycin level (trough, peak, or continuous level) within 7 days before the currently used serum creatinine value is an indicator of vancomycin-associated acute kidney injury (VA-AKI).

The detection of AKI results in the CDSS status (SyA_FA_SCORE_STATUS) “warning”; VA-AKI results in the CDSS status “critical.” The CDSS severity levels (SA_FA_SCORE_SCHWER) for this score correspond to the AKI stages according to the guideline.

Furthermore, the logic of the decision tree corresponds to that of the score established in the research context (see Thea Sophie Kister, Johannes Remmler, Maria Schmidt, et al. “Acute Kidney Injury and Its Progression in Hospitalized Patients—Results from a Retrospective Multicentre Cohort Study with a Digital Decision Support System.” PLOS ONE 16, no. 7 (2021): e0254608. https://doi.org/10.1371/journal.pone.0254608.) and can be found in [algorithm-aki](algorithm-aki).

**Acceptance criteria:** Validation of the scoring algorithm (SCO_AKI) with a test data set is successful.

# 4. Nonfunctional Requirements

## 4.1 Performance

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_L_EV | Real-time processing | Medium | StA_NA_017 | No | SyA_ES_SS_DB; SyA_ES_SS_MAIL |

The system must make scoring results available through output channels, e.g. SyA_ES_SS_MAIL, within a few minutes after data input (SyA_ES_SS_DB).

**Acceptance criteria:** After manual entry of test data, 2 persons measure the time until receipt of a corresponding email. In more than 90% of cases, the delay is less than 5 minutes.

## 4.2 Security and IT Protection

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SA_CONT | Container | Medium | StA_RA_01 | No | SyA_BU_INST_DOCKER; SyA_ES_HS_VM |

For use on SyA_ES_HS_VM, the system must obtain containers of used SOUP only from trusted sources such as Docker Hub or quay.io.

**Acceptance criteria:** Review by 2 persons that only verified sources such as Docker Hub are used.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SA_SAND | Sandboxing | Medium | PHA_PD_R006.1; StA_RA_01 | Yes | SyA_NFA_SA_CONT; SyA_ES_HS_VM |

All system components are executed inside containers. The runtime environment required to execute these containers provides a sandbox.

**Acceptance criteria:** Review by 2 persons that processing steps take place in isolated and automated form on a VM.

## 4.3 Data Protection

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SA_AUI | UI authentication | Medium | PHA_PD_R001.1; StA_RA_01 | Yes | SyA_ES_SS_KAS |

The system does not enable separate authentication by users for the UI. Access is possible only from the current CWS (see SyA_ES_SS_KAS), and leads to the UI through network authentication. The CWS itself can only be used through user authentication and is linked to a user account. Use by unauthenticated persons is therefore prevented.

**Acceptance criteria:** After successful CWS login, the UI can be accessed. If the link in the opened UI browser is shared externally, it cannot be opened outside the *local hospital network*. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SA_AVM | VM authentication | High | PHA_PD_R005.1; StA_RA_01; *local infrastructure specification* | Yes | SyA_ES_HS_VM |

All data processed by the system are located on a VM, see SyA_ES_HS_VM for specifications, that is only through network authentication and user authentication accessible to the development department .

**Acceptance criteria:** All development department user accounts can access the VM through the listed authentications. Incorrect username/password input does not grant access. Confirmed by at least 2 persons.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SA_MINI | Data minimization | Low | StA_RA_01 | No | SyA_ES_SS_DB |

All data processed by the system are required for the processing purpose according to functional and nonfunctional requirements (see specification SyA_ES_SS_DB). No additional data are used.

**Acceptance criteria:** During development of the algorithms, it is checked that no unnecessary additional data are connected to the system.

## 4.4 System Quality

### 4.4.1 Usability

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SQ_SUI | Static UI | Low |  | No |  |

All views of the static user interface cannot be modified by users.

**Acceptance criteria:** No registered users except administrators can change the layout of UI elements.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SQ_MINI | Minimal interaction | Low |  | No |  |

The UI has only a few interactive elements (clicks). All result-relevant information should be reachable within a maximum of 3 clicks.

**Acceptance criteria:** All result-relevant information is reachable within a maximum of 3 clicks.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SQ_UEB | Clarity | Low |  | No | SyA_ES_HS_PC |

The UI is clearly arranged. Result-relevant information should be visible on the standard screen with standard resolution (SyA_ES_HS_PC), without manual window minimization and without scrolling.

**Acceptance criteria:** Result-relevant information is visible on the standard screen with standard resolution without manual window minimization and without scrolling.

### 4.4.2 Reliability

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SQ_SL | System uptime | Medium |  | No | All requirements from section 3 |

The system can run continuously 24/7. Exceptions are scheduled and unscheduled maintenance windows.

**Acceptance criteria:** During test operation before activation, continuous 24/7 operability is monitored.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SQ_DD | Defective data input | Medium | FMEA_PD_R010.1 | Yes | SyA_ES_SS_DB |

The system outputs metrics on availability of new data at the database interface (SyA_ES_SS_DB). If no new data are present for at least one hour, an informational email is generated to the *local support mailbox* to initiate problem solving.

**Acceptance criteria:** In a test environment, it is checked whether a notification is generated when data input is missing.

### 4.4.3 Maintainability

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SQ_W | Maintenance | Medium | PHA_PD_R003.1; FMEA_PD_R001.1 | Yes | SyA_ES_SS_KAS |

The system is maintained as planned within the *local IT maintenance window* and announced through the local process. During this time, UI availability may be interrupted. The specification for the interface to the CWS (SyA_ES_SS_KAS) contains the state "no data available" for this case.

**Acceptance criteria:** Written confirmation exists from the persons responsible for IT maintenance windows that LAMPE has been included in the information flow there.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SQ_MOD | Modularity | Low |  | No |  |

The system must be modularly extensible with further scoring algorithms.

**Acceptance criteria:** A detailed description and visualization of the individual components exists, showing interfaces that must be served for future modules.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| SyA_NFA_SQ_KONF | Configuration (authorization) | Medium | PHA_PD_R005.1 | Yes | SyA_NFA_SA_AVM |

The system receives changes under SyA_NFA_SQ_W exclusively through the development department.

**Acceptance criteria:** The acceptance criteria from SyA_NFA_SA_AVM are sufficient for this requirement.

# 5. Applicable Documents

| Document name                                     | Reference (local ID) |
| ------------------------------------------------- | -------------------- |
| *local data mapping*                              | *local ID*           |
| *local CWS integration specification*             | *local ID*           |
| *local SOP for feedback and complaint management* | *local ID*           |
| [algorithm-aki](algorithm-aki)                                 | *local ID*           |
| *local infrastructure specification*              | *local ID*           |
| *local SOP for development of in-house software*  | *local ID*           |
