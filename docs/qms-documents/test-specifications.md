# Test Specification 01 - *Product Name*

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

| Term          | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AKI           | Acute kidney injury.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| AMPEL         | Clinical decision support platform used by *Product Name*.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| CDSS          | Clinical Decision Support System.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| CWS           | Clinical Workstation System; the hospital workstation sytsem in which medical staff see the patient/case overview and the *product name* column.                                                                                                                                                                                                                                                                                                                                                       |
| DB            | Database.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ETL           | Extract, transform, load; data processing that reads source data, filters/transforms it, and provides it in AMPEL format.                                                                                                                                                                                                                                                                                                                                                                              |
| HIS           | Hospital Information System.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ID            | The selected test-case ID follows the QM logic. For unit and integration tests, the final concatenated part of the ID (suffix) is also the ID in the code logic. This suffix can be used to find the respective test case in the source code.<br><br>Example:<br>`UITF_BACK_META_SVC__ScoringSystemResultLookupServiceTest`<br>`UITF` = unit/integration test case<br>`BACK_META` = architecture component<br>`ScoringSystemResultLookupServiceTest` = unique ID used to find the test in source code. |
| IFU           | [Instructions for Use](instructions-for-use.md); user-facing instructions for operating *product name* and interpreting its recommendations.                                                                                                                                                                                                                                                                                                                                                            |
| LIS           | Local laboratory information system                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Local mailbox | Email mailbox used for email notifications.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| SOUP          | Software of unknown provenance                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| UI            | User interface.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| VM            | Virtual machine.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

# 2. Overview

## 2.1 Acceptance Tests

| Test object                                                                | Test definition |
| -------------------------------------------------------------------------- | --------------- |
| StA_NA_001 - Aggregated *product name* status (overall CDSS status in HIS) | AT_01           |
| StA_NA_002 - Transition to *product name*  detail information              | AT_01           |
| StA_NA_003 - *product name*  scores overview                               | AT_01           |
| StA_NA_004 - Support recommendations                                       | AT_01           |
| StA_NA_005 - Contributing data (detail view)                               | AT_01           |
| StA_NA_006 - Further information (detail view)                             | AT_01           |
| StA_NA_007 - Traceability (detail view)                                    | AT_01           |
| StA_NA_008 - Feedback (detail view)                                        | AT_01           |
| StA_NA_009 - Email notification                                            | AT_01           |
| StA_NA_010 - Email attribution                                             | AT_01           |
| StA_NA_011 - Email traceability                                            | AT_01           |
| StA_NA_016 - Near-real-time processing                                     | AT_01           |
| StA_NA_017 - AKI score                                                     | AT_01           |
## 2.2 System Tests

| Test object         | Test definition |
| ------------------- | --------------- |
| SyA_ES_NS_UI        | ST_01           |
| SyA_ES_HS_PC        | ST_01           |
| SyA_ES_HS_VM        | ST_01           |
| SyA_ES_SS_DB        | ST_01           |
| SyA_ES_SS_PC        | ST_01           |
| SyA_ES_SS_KAS       | ST_01           |
| SyA_ES_SS_MAIL      | ST_01           |
| SyA_BU_INST_SPALTE  | ST_01           |
| SyA_BU_INST_DOCKER  | ST_01           |
| SyA_ES_IFU          | ST_01           |
| SyA_FA_UI_STAMM     | ST_01           |
| SyA_FA_UI_FB        | ST_01           |
| SyA_FA_UI_START     | ST_01           |
| SyA_FA_UI_DETAIL    | ST_01           |
| SyA_FA_UI_HINWEIS   | ST_01           |
| SyA_FA_UI_DATEN     | ST_01           |
| SyA_FA_UI_LINK      | ST_01           |
| SyA_FA_MAIL_VERS    | ST_01           |
| SyA_FA_MAIL_STAMM   | ST_01           |
| SyA_FA_MAIL_INH     | ST_01           |
| SyA_FA_SCORE_STATUS | ST_01           |
| SyA_FA_SCORE_SCHWER | ST_01           |
| SyA_FA_SCORE_AGGR   | ST_01           |
| SyA_FA_SCORE_AKI    | ST_01           |
| SyA_NFA_L_EV        | ST_01           |
| SyA_NFA_SA_CONT     | ST_01           |
| SyA_NFA_SA_SAND     | ST_01           |
| SyA_NFA_SA_AUI      | ST_01           |
| SyA_NFA_SA_AVM      | ST_01           |
| SyA_NFA_SA_MINI     | ST_01           |
| SyA_NFA_SQ_SUI      | ST_01           |
| SyA_NFA_SQ_MINI     | ST_01           |
| SyA_NFA_SQ_UEB      | ST_01           |
| SyA_NFA_SQ_SL       | ST_01           |
| SyA_NFA_SQ_DD       | ST_01           |
| SyA_NFA_SQ_W        | ST_01           |
| SyA_NFA_SQ_MOD      | ST_01           |
| SyA_NFA_SQ_KONF     | ST_01           |
| DQ_CDC              | ST_01           |
| BACK_MAIL           | ST_01           |
| BACK_RELAY          | ST_01           |

## 2.3 Unit and Integration Tests

| Test object        | Test definition                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ETL_PROCESS        | UIT_ETL_LAB_FILTERS<br>UIT_ETL_LAB_TRANS<br>UIT_ETL_PROC_FILTERS<br>UIT_ETL_PROC_TRANS<br>UIT_ETL_PAT_TRANS<br>UIT_ETL_MC_FILTERS<br>UIT_ETL_MC_TRANS |
| ETL_PROZ           | UIT_ETL_PROC_FILTERS<br>UIT_ETL_PROC_TRANS                                                                                                            |
| ETL_LAB            | UIT_ETL_LAB_FILTERS<br>UIT_ETL_LAB_TRANS                                                                                                              |
| ETL_PAT            | UIT_ETL_PAT_TRANS                                                                                                                                     |
| ETL_FALL           | UIT_ETL_MC_FILTERS<br>UIT_ETL_MC_TRANS                                                                                                                |
| DS_STREAM          | UIT_ETL_LAB_TRANS<br>UIT_ETL_PROC_TRANS<br>UIT_ETL_PAT_TRANS<br>UIT_ETL_MC_TRANS                                                                      |
| SCO_FRAME_KAFKA_R  | UIT_ETL_LAB_TRANS<br>UIT_ETL_PROC_TRANS<br>UIT_ETL_PAT_TRANS<br>UIT_ETL_MC_TRANS<br>UIT_Score_AKI_01                                                  |
| BACK_DB            | UIT_BACK_PERS_MC<br>UIT_BACK_PERS_RES<br>UIT_BACK_ING                                                                                                 |
| BACK_META          | UIT_BACK_PERS_MC<br>UIT_BACK_API_HTTP<br>UIT_BACK_META_SVC                                                                                            |
| BACK_ERG           | UIT_BACK_PERS_RES<br>UIT_BACK_ING<br>UIT_BACK_API_HTTP<br>UIT_BACK_RES_SVC                                                                            |
| BACK_ORC           | UIT_BACK_ING                                                                                                                                          |
| BACK_SER           | UIT_BACK_API_HTTP                                                                                                                                     |
| BACK_MAIL          | UIT_BACK_MAIL_LIST                                                                                                                                    |
| SCO_AKI_DB         | UIT_Score_AKI_01                                                                                                                                      |
| SCO_AKI            | UIT_Score_AKI_01                                                                                                                                      |
| SCO_FRAME_WORK_SCH | UIT_Score_AKI_01                                                                                                                                      |
| SCO_FRAME_KAFKA_W  | UIT_Score_AKI_01                                                                                                                                      |
| SCO_FRAME_WORK_DSG | UIT_Score_AKI_01                                                                                                                                      |
| FRONT_CASE         | UIT_DET_VIS_STATE_01                                                                                                                                  |
# 3. Acceptance Tests

## 3.1 AT_01 - *Product Name*  User Test

| Field                     | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                        | AT_01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Name                      | *product name* user test                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Priority                  | High                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Test basis                | The following stakeholder requirements:<br>StA_NA_001 - Aggregated *Product Name* status (overall CDSS status in HIS)<br>StA_NA_002 - Transition to *Product Name* detail information<br>StA_NA_003 - *Product Name* scores overview<br>StA_NA_004 - Support notifications<br>StA_NA_005 - Contributing data (detail view)<br>StA_NA_006 - Further information (detail view)<br>StA_NA_007 - Traceability (detail view)<br>StA_NA_008 - Feedback (detail view)<br>StA_NA_009 - Email notification<br>StA_NA_010 - Email attribution<br>StA_NA_011 - Email traceability<br>StA_NA_016 - Near-real-time processing<br>StA_NA_017 - AKI score |
| Description and goals     | The test checks whether the aggregated CDSS status of the AKI scoring system is displayed correctly, consistently, and in accordance with the rule set in all relevant output channels: <br>- HIS (*Product Name* column)<br>- Case Dashboard component<br>- Email notifications<br>- *local laboratory information system's* raw data.<br><br>At a clinical workstation, a physician acting as test person checks end-to-end data flow and traceability of notifications for case IDs with green, yellow, and red CDSS status.                                                                                                            |
| Features to be tested     | Acceptance criteria of the listed requirements in [stakeholder-requirements](stakeholder-requirements)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Features not to be tested |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

### 3.1.1 ATF_01 - *Product Name* User Test

| Field                         | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                            | ATF_01                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Name                          | *Product name* user test                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Priority                      | High                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Description and goals         | Confirms that the aggregated *Product Name* status (green/yellow/red) of the AKI scoring system is correctly displayed in the HIS *Product Name* column, consistently displayed in the Case Dashboard after clicking *Product Name*, correctly reproduced in email notifications, and that the underlying data (creatinine values, vancomycin administrations) lead traceably to the displayed AKI state. Execution is performed by medical staff at a clinical workstation. |
| Automation                    | No                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Environment / prerequisites   | - TR_TU_03<br>- workstation at the *hospital name* with access to <br>-- the CWS test system (including the *product name* column)<br>-- *local laboratory information system*<br>-- *product name* case dashboard<br>-- *local mailbox/email client*                                                                                                                                                                                                                        |
| Standards, methods, and tools | - TR_M_05 checklist<br>- visual consistency check between the *local laboratory information system*, *product name* in the HIS, the case dashboard, and the email client                                                                                                                                                                                                                                                                                                     |
| Expected record type          | Written protocol                                                                                                                                                                                                                                                                                                                                                                                                                                                             |


**Test input:**

- Selection of concrete case IDs, one per CDSS status (green/yellow/red), according to the HIS ward overview and the *local mailbox*.
	- Missing individual colors, e.g. no red case available, are documented as limitations but do not automatically fail the test if accepted in [test-plan](test-plan).
- Test steps are repeated analogously for each available CDSS status.
- Manual operation of the software in the test system.

Note: Red cases exist only if a vancomycin level determination (*using the configured local vancomycin analyte codes*) was performed in the last 7 days. This information is primarily visible in the *local laboratory information system*.

**Test steps:**

For each CDSS status to be checked (green, yellow, red), the following steps are performed. Each run is documented separately in [test-protocol-AT](test-protocol-AT).

1. Visibility of the *product name* column
   The test person ensures that the *product name* column (aggregated *product name* status) is displayed in the patient/case overview in the HIS ward overview; if not, it is displayed according to the [IFU](instructions-for-use.md).
   - Verifies: StA_NA_001 (*product name* status at a glance).

   The test person selects a case ID with the expected CDSS status (green/yellow/red) in the ward overview.
   - Verifies: StA_NA_001, StA_NA_017.

2. Documentation of the aggregated *product name* status in the HIS ward overview
   The test person notes the CDSS status displayed in the *product name* column for the medical case ID.
   - Verifies: StA_NA_001 (basis for consistency check).

3. Checking the raw data in the *local laboratory information system*
   The test person checks the relevant creatinine values and vancomycin level determinations of the medical case ID in the *local laboratory information system*.
   Comparison with the AKI decision tree using the [IFU](instructions-for-use.md).
   - Verifies: StA_NA_017 (AKI score), supports StA_NA_001, StA_NA_016.

4. Transition to the Case Dashboard
   The test person clicks *product name* in the HIS ward overview for the selected medical case ID and checks whether the Case Dashboard opens automatically at the expected *local case-dashboard URL*.
   - Verifies: StA_NA_002 (transition to *product name* detail information).

5. Checking the detail view in the Case Dashboard
   The test person assesses the following in the Case Dashboard for the selected case ID:
   - StA_NA_003 - *product name* scores overview; clear presentation of all score statuses (including AKI) and CDSS status.
   - StA_NA_004 - support notifications: presence of notifications/recommendations for abnormal scoring algorithms.
   - StA_NA_006 - further information: access to further information (detail view) for the respective scoring algorithm.
   - StA_NA_005 - contributing data: display of the data that were included in the calculation in the detail view.
   - StA_NA_007 - traceability: short description of how the notification came about.
   - StA_NA_008 - feedback: whether the contact channels (telephone, email) through which feedback can be submitted on the scoring algorithm of the current patient are correct.
   - StA_NA_016 - near-real-time processing: comparison of the *local laboratory information system* timestamp with the timestamp of the notification in the Case Dashboard.

6. Checking the email notification
   The test person checks the inbox of the test email address to determine whether an email notification has been received for this medical case ID, provided that the rule set provides for an email for the respective CDSS status (e.g. yellow/red only).
   - Verifies: StA_NA_009 (email notification).

   After opening the email: clear assignment to medical case ID / patient.
   - Verifies: StA_NA_010 (email attribution).
   Sufficient content information (scoring algorithm name, criticality, short justification, link to the detail view).
   - Verifies: StA_NA_011 (email traceability).
   Consistency of CDSS status, AKI status, stage/scoring algorithm, and timestamp between the Case Dashboard and the *local laboratory information system*.
   - Verifies and supports: StA_NA_016, StA_NA_017.

7. Documentation per case
   The test person documents the following for the checked CDSS status:
   - Medical case ID used.
   - Expected and actually displayed CDSS status in HIS ward overview, Case Dashboard, email.
   - Short summary of the raw data (creatinine values, vancomycin if applicable).
   - Deviations or errors that occurred (including screenshots, if useful).
   - Assessment of the run (passed / not passed).

8. Repetition for further CDSS statuses
   Steps 1-8 are repeated for all available CDSS statuses, each with its own medical case ID. If cases for one color are missing, this is noted in [test-protocol-AT](test-protocol-AT).

**Expected results:**

For each CDSS status checked (green/yellow/red):

- The expected CDSS status is correctly displayed in the HIS *Product Name* column for the respective medical case ID.
- After clicking *Product Name*, the Case Dashboard for the same medical case ID shows the same CDSS status and the correct AKI status (stage/scoring algorithm, timestamp).
- The AKI information displayed in the Case Dashboard is consistent with
	- the creatinine raw data and, if applicable, further parameters in the *local laboratory information system*
	- with the AKI algorithm.
- Email notifications
	- are generated only if the rule set provides for it for the respective CDSS status
	- contain an unambiguous case/patient identifier
	- describe CDSS status, scoring algorithm/status, timestamp, and relevant notifications consistently with the display in the Case Dashboard
	- have a plausible timestamp (within the specified latency relative to the data in the local laboratory information system).
- No error messages or implausible states occur; in particular, no inconsistencies between:
	- the *local laboratory information system
	- the *Product Name* status displayed in the HIS ward overview
	- the Case Dashboard
	- the email notification.

| Equivalence class | Validity |
|---|---|
| For all checked CDSS statuses included in the test case, content consistency of outputs (local laboratory information system, case dashboard, email) is present and the checklist can be completed successfully. | Success |
| For a checked CDSS status included in the test case, content consistency of outputs is missing and the checklist cannot be completed successfully. | Error |

**Acceptance criterion:** successful confirmation of all checklist points.

**Test execution:** [test-protocol-AT](test-protocol-AT)

# 4. System Tests

## 4.1 ST_01 - Manual Developer Test of *Product Name*

| Field                     | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                        | ST_01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Name                      | Manual developer test of *product name*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Priority                  | High                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Test basis                | SyA_ES_NS_UI<br>SyA_ES_HS_PC<br>SyA_ES_HS_VM<br>SyA_ES_SS_DB<br>SyA_ES_SS_PC<br>SyA_ES_SS_KAS<br>SyA_ES_SS_MAIL<br>SyA_BU_INST_SPALTE<br>SyA_BU_INST_DOCKER<br>SyA_ES_IFU<br>SyA_FA_UI_STAMM<br>SyA_FA_UI_FB<br>SyA_FA_UI_START<br>SyA_FA_UI_DETAIL<br>SyA_FA_UI_HINWEIS<br>SyA_FA_UI_DATEN<br>SyA_FA_UI_LINK<br>SyA_FA_MAIL_VERS<br>SyA_FA_MAIL_STAMM<br>SyA_FA_MAIL_INH<br>SyA_FA_SCORE_STATUS<br>SyA_FA_SCORE_SCHWER<br>SyA_FA_SCORE_AGGR<br>SyA_FA_SCORE_AKI<br>SyA_NFA_L_EV<br>SyA_NFA_SA_CONT<br>SyA_NFA_SA_SAND<br>SyA_NFA_SA_AUI<br>SyA_NFA_SA_AVM<br>SyA_NFA_SA_MINI<br>SyA_NFA_SQ_SUI<br>SyA_NFA_SQ_MINI<br>SyA_NFA_SQ_UEB<br>SyA_NFA_SQ_SL<br>SyA_NFA_SQ_DD<br>SyA_NFA_SQ_W<br>SyA_NFA_SQ_MOD<br>SyA_NFA_SQ_KONF<br>DQ_CDC<br>BACK_MAIL<br>BACK_RELAY |
| Description and goals     | This test comprises the manual four-eyes check of the acceptance criteria in system-requirements                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Features to be tested     | Acceptance criteria of the listed requirements in system-requirements                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Features not to be tested |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

### 4.1.1 STF_01 - Manual Developer Test Case of *Product Name*

| Field                         | Value                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                            | STF_01                                                                                                                                                 |
| Name                          | Manual developer test case of *Product Name*                                                                                                           |
| Priority                      | High                                                                                                                                                   |
| Description and goals         | Using a checklist, the individual system requirements are checked manually. The goal is human confirmation that the acceptance criteria are fulfilled. |
| Automation                    | No                                                                                                                                                     |
| Environment / prerequisites   | TR_TU_02                                                                                                                                               |
| Standards, methods, and tools | TR_M_05 checklist                                                                                                                                      |
| Expected record type          | Protocol                                                                                                                                               |
| Test input                    | Individual checklist points                                                                                                                            |
| Expected result               | Each checklist point has a result (passed/not passed).                                                                                                 |
**Test steps:**

The following points are checked manually using the four-eyes principle.

**For the user interface:**

- [ ] The CDSS column can be displayed according to the instructions for use. (SyA_BU_INST_SPALTE)

- [ ] On a local standard PC, the current CWS with integrated CDSS column is accessible and can be opened. (SyA_ES_SS_PC, SyA_ES_HS_PC)

- [ ] All four possible states of the aggregated CDSS status are visible in the CWS, insofar as they are available in the test system. Navigating from there leads to the user interface of the corresponding medical case. (SyA_ES_SS_KAS)

- [ ] The user interface is legible for the user on local standard displays. (SyA_ES_NS_UI)

- [ ] The user interface clearly displays the patient master data (case ID, patient number, first name, last name, date of birth, sex) of a selected patient at all times. (SyA_FA_UI_STAMM, DQ_CDC)

- [ ] The user interface displays contact information at all times. (SyA_FA_UI_FB)

- [ ] There is a clear presentation of the current results in the user interface. Relevant scoring algorithms are grouped according to the current CDSS status. Critical states are arranged at the very top and non-critical states at the very bottom. Each group is identified by a color (critical – red, warning – yellow, no findings – gray). (SyA_FA_UI_START)

- [ ] In the user interface, the CDSS status of each scoring algorithm in the initial view of a selected patient is displayed as a tile that can be clicked and leads to the detailed information for this scoring algorithm. (SyA_FA_UI_DETAIL)

- [ ] In the detail view for a scoring algorithm, there is a brief description of how the current notification came about and which recommendation results from it. (SyA_FA_UI_HINWEIS, DQ_CDC)

- [ ] In the detail view for a scoring algorithm, users receive a list of the laboratory findings that led to the execution of the respective scoring algorithm. This view is available as a table (with the latest result first) or graphically and includes at least: measurement time, designation, measured value and unit of the laboratory analytes, and the CDSS status resulting from the data point. (SyA_FA_UI_DATEN, DQ_CDC)

- [ ] In the detail view for a scoring algorithm, users have access to at least one item of further information (e.g., instructions for use, an SOP, or a link to a knowledge database). (SyA_FA_UI_LINK)

- [ ] All result-relevant information can be accessed with a maximum of 3 clicks. (SyA_NFA_SQ_MINI)

- [ ] Result-relevant information is visible on the standard screen at the standard resolution, without manually minimizing the window and without scrolling. (SyA_NFA_SQ_UEB)

- [ ] After successful login to the CWS, the user interface can be accessed. If the link in the browser in which the user interface opens is shared externally, the link cannot be opened outside the *local network*. (SyA_NFA_SA_AUI)

- [ ] The instructions for use are available via the *local document management system* with the required content (specified by the document template, plus a description of the scoring algorithms, plus a disclaimer). (SyA_ES_IFU)

**For the email notification:**

- [ ] The local mailbox receives the emails generated by *product name*. (SyA_ES_SS_MAIL, BACK_MAIL, BACK_RELAY)

- [ ] Critical and warning CDSS statuses are received in the mailbox. (SyA_FA_MAIL_VERS)

- [ ] The email notification clearly displays the patient master data (medical case ID, patient number, first name, last name, date of birth) of a selected person (e.g., directly in the subject line). The details correspond to the information from the primary system, HIS. (SyA_FA_MAIL_STAMM)

- [ ] Email notifications contain clearly and structurally presented information on: 1. the scoring algorithm for which the alert is issued; 2. the CDSS status; 3. the CDSS severity, including a recommended action; 4. information on the contributing data (e.g., measurement time, designation, measured value, and unit of the laboratory analyte); and 5. where applicable, additional algorithm-specific information considered for the medical case or patient. They also 6. originate from a defined local mailbox as the sender (*local sender email address*). (SyA_FA_MAIL_INH)

- [ ] Severity levels (which further describe the respective CDSS status) and notification texts correctly correspond to one another. (SyA_FA_SCORE_SCHWER)

**At system level:**

- [ ] The software architecture, including data storage, runs in production on a VM under a Linux operating system. The requirements for the VM are fulfilled (at least 400 GB of storage space, either direct or mounted; at least 4 CPU cores; at least 32 GB of memory; the Docker container runtime is available; and network access for the connection to the AMPEL DB is available). (SyA_ES_HS_VM)

- [ ] *Product name* has access to the MSSQL database (minimum version: MSSQL 2019) containing current routine patient data. The CDC (Change Data Capture) feature is enabled. A user account for queries from the Linux VM SyA_ES_HS_VM is configured, and permissions to read the CDC data are available. Port 1433 is open for access by SyA_ES_HS_VM. (SyA_ES_SS_DB)

- [ ] Docker Compose exists, contains all relevant components of the system, and automatic restarts are configured. (SyA_BU_INST_DOCKER)

- [ ] In a review of 10 incoming data points, a CDSS status (green/yellow/red) is calculated for each one and stored together with key variables (e.g., case ID, name of the scoring algorithm, information on the triggering laboratory value). The aggregated CDSS status corresponds to the respective data situation. (SyA_FA_SCORE_STATUS and SyA_FA_SCORE_AGGR)

- [ ] Validation of the scoring algorithm (SCO_AKI) using a test data set is successful. (SyA_FA_SCORE_AKI)

- [ ] After manual entry of test data, the time until receipt of a corresponding email is measured. In more than 90% of cases, the delay is less than 5 minutes. (SyA_NFA_L_EV)

- [ ] The system uses containers for the SOUPs used exclusively from trusted sources, such as Docker Hub or quay.io. (SyA_NFA_SA_CONT)

- [ ] All components of the system are executed within containers. Processing steps take place in isolation and automatically on a VM. (SyA_NFA_SA_SAND)

- [ ] All user accounts of the development department can access the VM using the authentication mechanisms stated above. If incorrect user names and passwords are entered, access is not granted. (SyA_NFA_SA_AVM and SyA_NFA_SQ_KONF)

- [ ] During development of the algorithms, no unnecessary additional data were connected to the system. (SyA_NFA_SA_MINI)

- [ ] No registered users other than administrators can change the layout of the UI elements. (SyA_NFA_SQ_SUI)

- [ ] During test operation before activation, the system proves capable of continuous 24/7 operation. (SyA_NFA_SQ_SL)

- [ ] In a test environment, a notification is generated when incoming data are missing. If no new data arrive for at least one hour, an informational email is sent. (SyA_NFA_SQ_DD)

- [ ] There is written confirmation from those responsible for the IT maintenance windows that *product name* has been included in the information flow for those windows. (SyA_NFA_SQ_W)

- [ ] There is a detailed description and visualization of the individual components. It shows the interfaces that must be served by future modules. (SyA_NFA_SQ_MOD)

**Expected results:**
There is one result for each checklist item (pass/fail)

| Equivalence class | Expected result |
|---|---|
| All checklist points can be confirmed. | Success |
| Not all checklist points can be confirmed. | Error |

**Acceptance criteria:** 

Successful confirmation of all checklist points.

**Test execution:** [test-protocol-ST](test-protocol-ST)

# 5. Unit and Integration Tests

## 5.1 UIT_ETL_LAB_FILTERS – ETL Laboratory Filters

| Field                     | Value                                                                                                                                                                                                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                        | UIT_ETL_LAB_FILTERS                                                                                                                                                                                                                                                         |
| Name                      | ETL laboratory filter                                                                                                                                                                                                                                                       |
| Priority                  | High                                                                                                                                                                                                                                                                        |
| Test basis                | The following test objects, described in [architecture](architecture), are tested:<br>• `ETL_PROCESS`<br>• `ETL_LAB`<br><br>The code for the component under test can be viewed at https://github.com/AMPEL-CDSS-ORG/etl/tree/v0.4.0/laboratory.                                        |
| Description and goals     | The test ensures the correct operation of the various filters involved in the ETL process for laboratory values. These include:<br>• Time-based filtering of laboratory data<br>• Time-based filtering of laboratory metadata<br>• Value-based filtering of laboratory data |
| Features to be tested     | • Filtering of laboratory data<br>• Filtering of laboratory metadata                                                                                                                                                                                                        |
| Features not to be tested |                                                                                                                                                                                                                                                                             |

### 5.1.1 UITF_ETL_LAB_FILTERS__NumericalAnalyteValueFilterTest – Value-Based Filtering of Laboratory Data

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_LAB_FILTERS__NumericalAnalyteValueFilterTest                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Name                             | Value-based filtering of laboratory data                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Description and goals            | Checks whether the applied filter correctly filters laboratory data based on the content of the analyte value.                                                                                                                                                                                                                                                                                                                                                                    |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. The triggering of this lifecycle is configured in a [GitHub-Action](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/.github/workflows/ci.yml#L13).<br><br>Test implementation: [NumericalAnalyteValueFilterTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/laboratory/src/test/java/de/uni_leipzig/ampel/laboratory/NumericalAnalyteValueFilterTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Laboratory record is valid | Valid |
| Analyte value is numeric | Valid |
| Analyte value is not numeric | Invalid |
| Analyte value is numeric but not trimmed | Valid |

**Test steps:**

1. Create a sample laboratory record.

2. Have the filter process the laboratory record.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Laboratory record is valid and analyte value is numeric | Not filtered out |
| Laboratory record is valid and analyte value is not numeric | Filtered out |
| Laboratory record is valid and analyte value is numeric but not trimmed | Not filtered out |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

### 5.1.2 UITF_ETL_LAB_FILTERS__LaboratoryTimeCutoffFilterTest – Time-Based Filtering of Laboratory Data

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_LAB_FILTERS__LaboratoryTimeCutoffFilterTest                                                                                                                                                                                                                                                                                                                       |
| Name                             | Time-based filtering of laboratory data                                                                                                                                                                                                                                                                                                                                    |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                       |
| Description and goals            | Checks whether the applied filter correctly filters laboratory data based on its creation time and a time cutoff.                                                                                                                                                                                                                                                          |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [LaboratoryTimeCutoffFilterTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/laboratory/src/test/java/de/uni_leipzig/ampel/laboratory/LaboratoryTimeCutoffFilterTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x                                                                                                                                                                                                                                                                                                                                   |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                  |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                                                            |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Laboratory record is valid | Valid |
| Creation date is before the time cutoff | Valid |
| Creation date is after the time cutoff | Valid |

**Test steps:**

1. Create a sample laboratory record.

2. Have the filter process the laboratory record.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Laboratory record is valid and creation date is before the time cutoff | Filtered out |
| Laboratory record is valid and creation date is after the time cutoff | Not filtered out |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

### 5.1.3 UITF_ETL_LAB_FILTERS__LaboratoryMetadataTimeCutoffFilterTest – Time-Based Filtering of Laboratory Metadata

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                               | UITF_ETL_LAB_FILTERS__LaboratoryMetadataTimeCutoffFilterTest                                                                                                                                                                                                                                                                                                                               |
| Name                             | Time-based filtering of laboratory metadata                                                                                                                                                                                                                                                                                                                                                |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                       |
| Description and goals            | Checks whether the applied filter correctly filters laboratory metadata based on its creation time and a time cutoff.                                                                                                                                                                                                                                                                      |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [LaboratoryMetadataTimeCutoffFilterTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/laboratory/src/test/java/de/uni_leipzig/ampel/laboratory/LaboratoryMetadataTimeCutoffFilterTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x                                                                                                                                                                                                                                                                                                                                                   |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                                  |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                                                                            |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Laboratory metadata record is valid | Valid |
| Creation date is before the time cutoff | Valid |
| Creation date is after the time cutoff | Valid |

**Test steps:**

1. Create a sample laboratory metadata record.

2. Have the filter process the laboratory metadata record.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Laboratory metadata record is valid and creation date is before the time cutoff | Filtered out |
| Laboratory metadata record is valid and creation date is after the time cutoff | Not filtered out |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

## 5.2 UIT_ETL_LAB_TRANS – ETL Laboratory Transformation

| Field                     | Value                                                                                                                                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                        | UIT_ETL_LAB_TRANS                                                                                                                                                                                                                                                              |
| Name                      | ETL laboratory transformation                                                                                                                                                                                                                                                  |
| Priority                  | High                                                                                                                                                                                                                                                                           |
| Test basis                | The following test objects, described in [architecture](architecture), are tested:<br>• `ETL_PROCESS`<br>• `ETL_LAB`<br>• `DS_STREAM`<br>• `SCO_FRAME_KAFKA_R`<br><br>The code for the component under test can be viewed at https://github.com/AMPEL-CDSS-ORG/etl/tree/v0.4.0/laboratory. |
| Description and goals     | The test ensures the correct operation of the ETL pipeline for processing laboratory data and the associated laboratory metadata. Its primary focus is the correct joining of both data pools while taking the filters configured for the pipeline into account.               |
| Features to be tested     | • Joining laboratory data and laboratory metadata<br>• Integration with the data-stream component for reading                                                                                                                                                                  |
| Features not to be tested |                                                                                                                                                                                                                                                                                |

### 5.2.1 UITF_ETL_LAB_TRANS__PipelineIT – Join of Laboratory Data and Laboratory Metadata with Filters and Kafka Integration

| Field                            | Value                                                                                                                                                                                                                                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_LAB_TRANS__PipelineIT                                                                                                                                                                                                                                                                                                     |
| Name                             | Join of laboratory data and laboratory metadata with filters and Kafka integration                                                                                                                                                                                                                                                 |
| Priority                         | High                                                                                                                                                                                                                                                                                                                               |
| Description and goals            | Checks whether the ETL pipeline configured with filters can successfully read laboratory data and laboratory metadata from a Kafka instance, join them, and convert them into AMPEL format.                                                                                                                                        |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [PipelineIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/laboratory/src/test/java/de/uni_leipzig/ampel/laboratory/PipelineIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• Kafka (Testcontainers) instance with initialized laboratory-data and metadata topics                                                                                                                                                                           |
| Standards, methods, and tools    | • Testcontainers<br>• Kafka<br>• TR_M_01                                                                                                                                                                                                                                                                                           |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                    |

**Test input:**

Four different laboratory records are created for this test. One laboratory record is created with a non-numeric analyte value. All other laboratory records do not have this limitation.

Two metadata records are also created. One is created with a creation date before a time cutoff (historical cutoff).

The relationship between the laboratory data and metadata is as follows:

- Metadata record A → 3 laboratory records (one of which has the non-numeric analyte value described above)

- Metadata record B (creation date is before the time cutoff) → remaining valid laboratory value

The date values represent the number of days since the epoch (1970-01-01). The time values represent the number of seconds in the day.

**Test steps:**

1. Create sample laboratory data.

2. Create sample laboratory metadata.

3. Persist the laboratory data and laboratory metadata in the laboratory-data topic and metadata topic in Kafka, respectively.

4. Initialize a Kafka reader for the laboratory-data topic and a Kafka reader for the metadata topic.

5. Create a test sink for the joined and converted laboratory values; it serves as the recording unit for evaluation.

6. Configure the ETL pipeline with filters and the two Kafka readers as data sources, and enforce a parallelism of 1.

**Expected results:**

Two results in AMPEL format are expected to be sent to the test sink. They are the result of joining metadata record A with its associated laboratory records that have numeric analyte values.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

## 5.3 UIT_ETL_PROC_FILTERS – ETL Procedure Filters

| Field                     | Value                                                                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                        | UIT_ETL_PROC_FILTERS                                                                                                                                                                                                                 |
| Name                      | ETL procedure filters                                                                                                                                                                                                                |
| Priority                  | High                                                                                                                                                                                                                                 |
| Test basis                | The following test objects, described in [architecture](architecture), are tested:<br>• `ETL_PROCESS`<br>• `ETL_PROZ`<br><br>The code for the component under test can be viewed at https://github.com/AMPEL-CDSS-ORG/etl/tree/v0.4.0/procedure. |
| Description and goals     | The test ensures the correct operation of the various filters involved in the ETL process for procedures. These include:<br>- Value-based filter relating to whether a procedure was performed.                                      |
| Features to be tested     | • Filtering of procedures                                                                                                                                                                                                            |
| Features not to be tested |                                                                                                                                                                                                                                      |

### 5.3.1 UITF_ETL_PROC_FILTERS__ActuallyPerformedFilterTest – Value-Based Filtering of Procedures by Whether They Were Performed

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                               | UITF_ETL_PROC_FILTERS__ActuallyPerformedFilterTest                                                                                                                                                                                                                                                                                                                 |
| Name                             | Value-based filtering of procedures by whether they were performed                                                                                                                                                                                                                                                                                                 |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                               |
| Description and goals            | Checks whether the applied filter correctly filters procedures based on the content of the time values for their performance.                                                                                                                                                                                                                                      |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [ActuallyPerformedFilterTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/procedure/src/test/java/de/uni_leipzig/ampel/procedure/ActuallyPerformedFilterTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x                                                                                                                                                                                                                                                                                                                           |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                          |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                                                    |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Procedure record is valid | Valid |
| Performance date is a positive numeric value | Valid |
| Performance date is a negative numeric value | Valid |
| Performance time is a positive numeric value | Valid |
| Performance time is a negative numeric value | Valid |
| Performance date has the numeric value `-682638` | Valid |
| Performance time has the numeric value `-682638` | Valid |

The special value `-682638` is used in the local source system to encode missing values for the performance date and performance time.

The performance date represents the number of days since the epoch (1970-01-01). The performance time represents the number of seconds in the day.

**Test steps:**

1. Create a sample procedure record.

2. Have the filter process the procedure record.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Procedure record is valid, performance date is a positive numeric value, and performance time is a positive numeric value | Not filtered out |
| Procedure record is valid, performance date has the numeric value `-682638`, and performance time has the numeric value `-682638` | Filtered out |

Negative numeric values for the performance date and performance time are not tested. This is justified by the primary intention to create a real-time system. The processing of historical data has low priority.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

## 5.4 UIT_ETL_PROC_TRANS – ETL Procedure Transformation

| Field                     | Value                                                                                                                                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                        | UIT_ETL_PROC_TRANS                                                                                                                                                                                                                                                             |
| Name                      | ETL procedure transformation                                                                                                                                                                                                                                                   |
| Priority                  | High                                                                                                                                                                                                                                                                           |
| Test basis                | The following test objects, described in [architecture](architecture), are tested:<br>• `ETL_PROCESS`<br>• `ETL_PROZ`<br>• `DS_STREAM`<br>• `SCO_FRAME_KAFKA_R`<br><br>The code for the component under test can be viewed at https://github.com/AMPEL-CDSS-ORG/etl/tree/v0.4.0/procedure. |
| Description and goals     | The test ensures the correct transformation of procedure data into the associated AMPEL format while including upstream systems such as Kafka.                                                                                                                                 |
| Features to be tested     | • Conversion of procedures<br>• Stability of conversions at increased parallelism                                                                                                                                                                                              |
| Features not to be tested |                                                                                                                                                                                                                                                                                |

### 5.4.1 UITF_ETL_PROC_TRANS__ProcedureTransformerTest – Conversion of Procedures into AMPEL Format

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                               | UITF_ETL_PROC_TRANS__ProcedureTransformerTest                                                                                                                                                                                                                                                                                                                |
| Name                             | Conversion of procedures into AMPEL format                                                                                                                                                                                                                                                                                                                   |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                         |
| Description and goals            | Checks whether the applied transformer can convert procedures into AMPEL format.                                                                                                                                                                                                                                                                             |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [ProcedureTransformerTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/procedure/src/test/java/de/uni_leipzig/ampel/procedure/ProcedureTransformerTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x                                                                                                                                                                                                                                                                                                                     |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                    |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                                              |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Procedure record is valid | Valid |
| Cancellation date is `NULL` | Valid |
| Cancellation date is a numeric value | Valid |
| Update date is `NULL` | Valid |
| Update date is a numeric value | Valid |

The cancellation date represents the number of days since the epoch (1970-01-01). The update date represents the number of seconds in the day.

**Test steps:**

1. Create a sample procedure record.

2. Have the transformer process the procedure record.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Procedure record is valid, cancellation date is a numeric value, and update date is a numeric value | Procedure in AMPEL format |
| Procedure record is valid and cancellation date is `NULL` | Procedure in AMPEL format with no cancellation date |
| Procedure record is valid and update date is `NULL` | Procedure in AMPEL format with no update date |

Negative numeric values for the cancellation date and update date are not tested. This is justified by the primary intention to create a real-time system. The processing of historical data has low priority.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

### 5.4.2 UITF_ETL_PROC_TRANS__PipelineIT – Conversion of Procedures into AMPEL Format with Filters and Kafka Integration

| Field                            | Value                                                                                                                                                                                                                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_PROC_TRANS__PipelineIT                                                                                                                                                                                                                                                                                                  |
| Name                             | Conversion of procedures into AMPEL format with filters and Kafka integration                                                                                                                                                                                                                                                    |
| Priority                         | High                                                                                                                                                                                                                                                                                                                             |
| Description and goals            | Checks whether the ETL pipeline configured with filters can successfully read procedures from a Kafka instance and convert them into AMPEL format.                                                                                                                                                                               |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [PipelineIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/procedure/src/test/java/de/uni_leipzig/ampel/procedure/PipelineIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• Kafka (Testcontainers) instance with an initialized procedure topic                                                                                                                                                                                          |
| Standards, methods, and tools    | • Testcontainers<br>• Kafka<br>• TR_M_01                                                                                                                                                                                                                                                                                         |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                  |

**Test input:**

Three different procedure records are created for this test. Two have their performance date and performance time set to `-682638`, meaning that they are marked as not performed.

The remaining procedure record has positive numeric values for both fields, meaning that it is marked as performed.

The performance date represents the number of days since the epoch (1970-01-01). The performance time represents the number of seconds in the day.

**Test steps:**

1. Create sample procedure data.

2. Persist the procedure data in the procedure topic in Kafka.

3. Initialize a Kafka reader for the procedure topic.

4. Create a test sink for converted procedures; it serves as the recording unit for evaluation.

5. Configure the ETL pipeline with filters and the Kafka reader as the data source, and enforce a parallelism of 1.

**Expected results:**

Only the procedure marked as performed is expected to be sent to the test sink as the result of the pipeline, where it is available in converted AMPEL format.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

### 5.4.3 UITF_ETL_PROC_TRANS__PipelineIT_Par – Conversion of Procedures into AMPEL Format with Filters and Kafka Integration at Increased Parallelism

| Field                            | Value                                                                                                                                                                                                                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_PROC_TRANS__PipelineIT_Par                                                                                                                                                                                                                                                                                              |
| Name                             | Conversion of procedures into AMPEL format with filters and Kafka integration at increased parallelism                                                                                                                                                                                                                           |
| Priority                         | High                                                                                                                                                                                                                                                                                                                             |
| Description and goals            | Checks whether the ETL pipeline configured with filters can convert procedures into AMPEL format in the correct order when the parallelism is at least 2.                                                                                                                                                                        |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [PipelineIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/procedure/src/test/java/de/uni_leipzig/ampel/procedure/PipelineIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• Kafka (Testcontainers) instance with an initialized procedure topic                                                                                                                                                                                          |
| Standards, methods, and tools    | • Testcontainers<br>• Kafka<br>• TR_M_01                                                                                                                                                                                                                                                                                         |
| Expected record type             | Not specified in the source document.                                                                                                                                                                                                                                                                                            |

**Test input:**

One thousand procedure records are created for this test. They differ only in the procedure code. The value of this code is incremented by a counter to make the order traceable.

All procedures are marked as performed; that is, they have numeric values for the performance date and performance time that are not equal to `-682638`.

The performance date represents the number of days since the epoch (1970-01-01). The performance time represents the number of seconds in the day.

**Test steps:**

1. Create sample procedure data.

2. Persist the procedure data in the procedure topic in Kafka.

3. Initialize a Kafka reader for the procedure topic.

4. Create a test sink for converted procedures; it serves as the recording unit for evaluation.

5. Configure the ETL pipeline with filters and the Kafka reader as the data source, and enforce a parallelism of at least 2.

**Expected results:**

All procedures are expected to be sent to the test sink as the result of the pipeline, where they are available in converted AMPEL format.

The procedures must also be present in the test sink in the same order in which they were supplied to the procedure topic in Kafka (the comparison uses the monotonically increasing procedure code).

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

## 5.5 UIT_ETL_PAT_TRANS – ETL Patient Transformation

| Field                     | Value                                                                                                                                                                                                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                        | UIT_ETL_PAT_TRANS                                                                                                                                                                                                                                                           |
| Name                      | ETL patient transformation                                                                                                                                                                                                                                                  |
| Priority                  | High                                                                                                                                                                                                                                                                        |
| Test basis                | The following test objects, described in [architecture](architecture), are tested:<br>• `ETL_PROCESS`<br>• `ETL_PAT`<br>• `DS_STREAM`<br>• `SCO_FRAME_KAFKA_R`<br><br>The code for the component under test can be viewed at https://github.com/AMPEL-CDSS-ORG/etl/tree/v0.4.0/patient. |
| Description and goals     | The test ensures the correct transformation of patient data into the associated AMPEL format while including upstream systems such as Kafka.                                                                                                                                |
| Features to be tested     | • Conversion of patients<br>• Stability of conversions at increased parallelism                                                                                                                                                                                             |
| Features not to be tested |                                                                                                                                                                                                                                                                             |

### 5.5.1 UITF_ETL_PAT_TRANS__PatientTransformerTest – Conversion of Patients into AMPEL Format

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_PAT_TRANS__PatientTransformerTest                                                                                                                                                                                                                                                                                                           |
| Name                             | Conversion of patients into AMPEL format                                                                                                                                                                                                                                                                                                             |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                 |
| Description and goals            | Checks whether the applied transformer can convert patients into AMPEL format.                                                                                                                                                                                                                                                                       |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [PatientTransformerTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/patient/src/test/java/de/uni_leipzig/ampel/patient/PatientTransformerTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x                                                                                                                                                                                                                                                                                                             |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                            |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                                      |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class                 | Validity |
| --------------------------------- | -------- |
| Patient record is valid           | Valid    |
| Sex is in the set `[1, 2, 3]`     | Valid    |
| Sex is not in the set `[1, 2, 3]` | Valid    |

The date information represents the number of days since the epoch (1970-01-01). The time information represents the number of seconds in the day.

**Test steps:**

1. Create a sample patient record.

2. Have the transformer process the patient record.

**Expected results:**

| Equivalence class                                             | Expected result                              |
| ------------------------------------------------------------- | -------------------------------------------- |
| Patient record is valid and sex is `1`                        | Patient in AMPEL format and sex is `MALE`    |
| Patient record is valid and sex is `2`                        | Patient in AMPEL format and sex is `FEMALE`  |
| Patient record is valid and sex is `3`                        | Patient in AMPEL format and sex is `UNKNOWN` |
| Patient record is valid and sex is not in the set `[1, 2, 3]` | Patient in AMPEL format and sex is `UNKNOWN` |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

### 5.5.2 UITF_ETL_PAT_TRANS__PipelineIT – Conversion of Patients into AMPEL Format with Filters and Kafka Integration

| Field                            | Value                                                                                                                                                                                                                                                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_PAT_TRANS__PipelineIT                                                                                                                                                                                                                                                                                               |
| Name                             | Conversion of patients into AMPEL format with filters and Kafka integration                                                                                                                                                                                                                                                  |
| Priority                         | High                                                                                                                                                                                                                                                                                                                         |
| Description and goals            | Checks whether the ETL pipeline configured with filters can successfully read patients from a Kafka instance and convert them into AMPEL format.                                                                                                                                                                             |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [PipelineIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/patient/src/test/java/de/uni_leipzig/ampel/patient/PipelineIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• Kafka (Testcontainers) instance with an initialized patient topic                                                                                                                                                                                        |
| Standards, methods, and tools    | • Testcontainers<br>• Kafka<br>• TR_M_01                                                                                                                                                                                                                                                                                     |
| Expected record type             | Not specified in the source document.                                                                                                                                                                                                                                                                                        |

**Test input:**

Two different patient records are created for this test.

The date information represents the number of days since the epoch (1970-01-01). The time information represents the number of seconds in the day.

**Test steps:**

1. Create sample patient data.

2. Persist the patient data in the patient topic in Kafka.

3. Initialize a Kafka reader for the patient topic.

4. Create a test sink for converted patients; it serves as the recording unit for evaluation.

5. Configure the ETL pipeline with filters and the Kafka reader as the data source, and enforce a parallelism of 1.

**Expected results:**

Both patient records are expected to be sent to the test sink as the result of the pipeline, where they are available in converted AMPEL format.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

### 5.5.3 UITF_ETL_PAT_TRANS__PipelineIT_Par – Conversion of Patients into AMPEL Format with Filters and Kafka Integration at Increased Parallelism

| Field                            | Value                                                                                                                                                                                                                                                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_PAT_TRANS__PipelineIT_Par                                                                                                                                                                                                                                                                                           |
| Name                             | Conversion of patients into AMPEL format with filters and Kafka integration at increased parallelism                                                                                                                                                                                                                         |
| Priority                         | High                                                                                                                                                                                                                                                                                                                         |
| Description and goals            | Checks whether the ETL pipeline configured with filters can convert patients into AMPEL format in the correct order when the parallelism is at least 2.                                                                                                                                                                      |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [PipelineIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/patient/src/test/java/de/uni_leipzig/ampel/patient/PipelineIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• Kafka (Testcontainers) instance with an initialized patient topic                                                                                                                                                                                        |
| Standards, methods, and tools    | • Testcontainers<br>• Kafka<br>• TR_M_01                                                                                                                                                                                                                                                                                     |
| Expected record type             | Not specified in the source document.                                                                                                                                                                                                                                                                                        |

**Test input:**

One thousand patient records are created for this test. They differ only in the first name. The first-name value is a number incremented by a counter to make the order traceable.

The date information represents the number of days since the epoch (1970-01-01). The time information represents the number of seconds in the day.

**Test steps:**

1. Create sample patient data.

2. Persist the patient data in the patient topic in Kafka.

3. Initialize a Kafka reader for the patient topic.

4. Create a test sink for converted patients; it serves as the recording unit for evaluation.

5. Configure the ETL pipeline with filters and the Kafka reader as the data source, and enforce a parallelism of at least 2.

**Expected results:**

All patients are expected to be sent to the test sink as the result of the pipeline, where they are available in converted AMPEL format.

The patients must also be present in the test sink in the same order in which they were supplied to the patient topic in Kafka. The comparison uses the monotonically increasing numeric value stored as the first name.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

## 5.6 UIT_ETL_MC_FILTERS – ETL Medical Case Filters

| Field                     | Value                                                                                                                                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                        | UIT_ETL_MC_FILTERS                                                                                                                                                                                                                       |
| Name                      | ETL medical case filters                                                                                                                                                                                                                 |
| Priority                  | High                                                                                                                                                                                                                                     |
| Test basis                | The following test objects, described in [architecture](architecture), are tested:<br>• `ETL_PROCESS`<br>• `ETL_FALL`<br><br>The code for the component under test can be viewed at https://github.com/AMPEL-CDSS-ORG/etl/tree/v0.4.0/medical-cases. |
| Description and goals     | The test ensures the correct operation of the various filters involved in the ETL process for medical cases. These include:<br>• Time-based filter<br>• Status filter                                                                    |
| Features to be tested     | • Filtering of medical cases                                                                                                                                                                                                             |
| Features not to be tested |                                                                                                                                                                                                                                          |

### 5.6.1 UITF_ETL_MC_FILTERS__NoStatusFilterTest – Value-Based Filtering of Laboratory Data

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_MC_FILTERS__NoStatusFilterTest                                                                                                                                                                                                                                                                                                                  |
| Name                             | Value-based filtering of laboratory data                                                                                                                                                                                                                                                                                                                 |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                     |
| Description and goals            | Checks whether the applied filter correctly filters medical cases based on the content of the status value.                                                                                                                                                                                                                                              |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [NoStatusFilterTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/medical-cases/src/test/java/de/uni_leipzig/ampel/medical_cases/NoStatusFilterTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x                                                                                                                                                                                                                                                                                                                 |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                                          |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Medical case record is valid | Valid |
| Status value is not set | Valid |
| Status value is a non-empty string | Valid |

**Test steps:**

1. Create a sample medical-case record.

2. Have the filter process the medical-case record.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Medical case record is valid and status value is not set | Filtered out |
| Medical case record is valid and status value is a non-empty string | Not filtered out |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

### 5.6.2 UITF_ETL_MC_FILTERS__MedicalCaseTimeCutoffFilterTest – Time-Based Filtering of Medical Case Data

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_MC_FILTERS__MedicalCaseTimeCutoffFilterTest                                                                                                                                                                                                                                                                                                                               |
| Name                             | Time-based filtering of medical case data                                                                                                                                                                                                                                                                                                                                          |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                               |
| Description and goals            | Checks whether the applied filter correctly filters medical case data based on its creation time and a time cutoff.                                                                                                                                                                                                                                                                |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [MedicalCaseTimeCutoffFilterTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/medical-cases/src/test/java/de/uni_leipzig/ampel/medical_cases/MedicalCaseTimeCutoffFilterTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x                                                                                                                                                                                                                                                                                                                                           |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                          |
| Expected record type             | Not specified in the source document.                                                                                                                                                                                                                                                                                                                                              |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Medical case record is valid | Valid |
| Creation date is before the time cutoff | Valid |
| Creation date is after the time cutoff | Valid |

**Test steps:**

1. Create a sample medical-case record.

2. Have the filter process the medical-case record.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Medical case record is valid and creation date is before the time cutoff | Filtered out |
| Medical case record is valid and creation date is after the time cutoff | Not filtered out |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

## 5.7 UIT_ETL_MC_TRANS – ETL Medical Case Transformation

| Field                     | Value                                                                                                                                                                                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                        | UIT_ETL_MC_TRANS                                                                                                                                                                                                                                                                   |
| Name                      | ETL medical case transformation                                                                                                                                                                                                                                                    |
| Priority                  | High                                                                                                                                                                                                                                                                               |
| Test basis                | The following test objects, described in [architecture](architecture), are tested:<br>• `ETL_PROCESS`<br>• `ETL_FALL`<br>• `DS_STREAM`<br>• `SCO_FRAME_KAFKA_R`<br><br>The code for the component under test can be viewed at https://github.com/AMPEL-CDSS-ORG/etl/tree/v0.4.0/medical-cases. |
| Description and goals     | The test ensures the correct transformation of medical case data into the associated AMPEL format while including upstream systems such as Kafka.                                                                                                                                  |
| Features to be tested     | • Conversion of medical case data<br>• Stability of conversions at increased parallelism                                                                                                                                                                                           |
| Features not to be tested |                                                                                                                                                                                                                                                                                    |

### 5.7.1 UITF_ETL_MC_TRANS__MedicalCaseTransformerTest – Conversion of Medical Cases into AMPEL Format

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                               | UITF_ETL_MC_TRANS__MedicalCaseTransformerTest                                                                                                                                                                                                                                                                                                                            |
| Name                             | Conversion of medical cases into AMPEL format                                                                                                                                                                                                                                                                                                                            |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                     |
| Description and goals            | Checks whether the applied transformer can convert medical cases into AMPEL format.                                                                                                                                                                                                                                                                                      |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [MedicalCaseTransformerTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/medical-cases/src/test/java/de/uni_leipzig/ampel/medical_cases/MedicalCaseTransformerTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x                                                                                                                                                                                                                                                                                                                                 |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                                                          |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Medical case record is valid | Valid |
| Case status is in the set `[P, I, E]` | Valid |
| Case status is not in the set `[P, I, E]` | Invalid |
| Cancellation date is `NULL` | Valid |
| Cancellation date is a numeric value | Valid |
| Update date is `NULL` | Valid |
| Update date is a numeric value | Valid |

The date information represents the number of days since the epoch (1970-01-01). The time information represents the number of seconds in the day.

**Test steps:**

1. Create a sample medical-case record.

2. Have the transformer process the medical-case record.

**Expected results:**

| Equivalence class                                                          | Expected result                                               |
| -------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Medical case record is valid and case status is `P`                        | Medical case in AMPEL format and status is `PLANNED`          |
| Medical case record is valid and case status is `I`                        | Medical case in AMPEL format and status is `ACTIVE`           |
| Medical case record is valid and case status is `E`                        | Medical case in AMPEL format and status is `COMPLETED`        |
| Medical case record is valid and case status is not in the set `[P, I, E]` | Expected error (exception)                                    |
| Medical case record is valid and cancellation date is `NULL`               | Medical case in AMPEL format and cancellation date is not set |
| Medical case record is valid and update date is `NULL`                     | Medical case in AMPEL format and update date is not set       |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

### 5.7.2 UITF_ETL_MC_TRANS__PipelineIT – Conversion of Medical Cases into AMPEL Format with Filters and Kafka Integration

| Field                            | Value                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_MC_TRANS__PipelineIT                                                                                                                                                                                                                                                                                                            |
| Name                             | Conversion of medical cases into AMPEL format with filters and Kafka integration                                                                                                                                                                                                                                                         |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                     |
| Description and goals            | Checks whether the ETL pipeline configured with filters can successfully read medical cases from a Kafka instance and convert them into AMPEL format.                                                                                                                                                                                    |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [PipelineIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/medical-cases/src/test/java/de/uni_leipzig/ampel/medical_cases/PipelineIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• Kafka (Testcontainers) instance with an initialized medical-case topic                                                                                                                                                                                               |
| Standards, methods, and tools    | • Testcontainers<br>• Kafka<br>• TR_M_01                                                                                                                                                                                                                                                                                                 |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                          |

**Test input:**

Four different medical case records are created for this test. An unsupported case status is used for two records, and the creation date of one additional record is selected so that it is before a defined cutoff.

The date information represents the number of days since the epoch (1970-01-01). The time information represents the number of seconds in the day.

**Test steps:**

1. Create sample medical-case data.

2. Persist the medical-case data in the medical-case topic in Kafka.

3. Initialize a Kafka reader for the medical-case topic.

4. Create a test sink for converted medical cases; it serves as the recording unit for evaluation.

5. Configure the ETL pipeline with filters and the Kafka reader as the data source, and enforce a parallelism of 1.

**Expected results:**

Only one medical case record is expected to be sent to the test sink as the result of the pipeline, where it is available in converted AMPEL format. The remaining records are filtered out.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

### 5.7.3 UITF_ETL_MC_TRANS__PipelineIT_Par – Conversion of Medical Cases into AMPEL Format with Filters and Kafka Integration at Increased Parallelism

| Field                            | Value                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_ETL_MC_TRANS__PipelineIT_Par                                                                                                                                                                                                                                                                                                        |
| Name                             | Conversion of medical cases into AMPEL format with filters and Kafka integration at increased parallelism                                                                                                                                                                                                                                |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                     |
| Description and goals            | Checks whether the ETL pipeline configured with filters can convert medical cases into AMPEL format in the correct order when the parallelism is at least 2.                                                                                                                                                                             |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [PipelineIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/etl/blob/v0.4.0/medical-cases/src/test/java/de/uni_leipzig/ampel/medical_cases/PipelineIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• Kafka (Testcontainers) instance with an initialized medical-case topic                                                                                                                                                                                               |
| Standards, methods, and tools    | • Testcontainers<br>• Kafka<br>• TR_M_01                                                                                                                                                                                                                                                                                                 |
| Expected record type             |                                                                                                                                                                                                                                                                                                                                          |

**Test input:**

One thousand medical case records are created for this test. They differ only in the patient number. The patient-number value is a number incremented by a counter to make the order traceable.

The date information represents the number of days since the epoch (1970-01-01). The time information represents the number of seconds in the day.

**Test steps:**

1. Create sample medical-case data.

2. Persist the medical-case data in the medical-case topic in Kafka.

3. Initialize a Kafka reader for the medical-case topic.

4. Create a test sink for converted medical cases; it serves as the recording unit for evaluation.

5. Configure the ETL pipeline with filters and the Kafka reader as the data source, and enforce a parallelism of at least 2.

**Expected results:**

All medical cases are expected to be sent to the test sink as the result of the pipeline, where they are available in converted AMPEL format.

The medical cases must also be present in the test sink in the same order in which they were supplied to the medical-case topic in Kafka. The comparison uses the monotonically increasing numeric patient number.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/etl/releases/download/v0.4.0/etl-jobs-test-reports-0.4.0.tar.gz

## 5.8 UIT_BACK_PERS_MC – Persistence and Provision of Medical Case Data

| Field                     | Value                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| ID                        | UIT_BACK_PERS_MC                                                                                       |
| Name                      | Persistence and provision of medical case data                                                         |
| Priority                  | High                                                                                                   |
| Test basis                | The following test objects, described in [architecture](architecture), are tested:<br>• `BACK_DB`<br>• `BACK_META` |
| Description and goals     | Checks whether the backend can correctly persist medical case data in the system and provide it again. |
| Features to be tested     | • Store and provide medical case data                                                                  |
| Features not to be tested |                                                                                                        |

### 5.8.1 UITF_BACK_PERS_MC__DBMedicalCaseStorageIT – Storage of Medical Case Data

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_PERS_MC__DBMedicalCaseStorageIT                                                                                                                                                                                                                                                                                                                                                                   |
| Name                             | Storage of medical case data                                                                                                                                                                                                                                                                                                                                                                                |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                        |
| Description and goals            | Checks whether data for a medical case can be persisted in the system.                                                                                                                                                                                                                                                                                                                                      |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [DBMedicalCaseStorageIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/infrastructure/spi/persistence/DBMedicalCaseStorageIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• PostgreSQL (Testcontainers) instance with the backend schema applied                                                                                                                                                                                                                                                                    |
| Standards, methods, and tools    | • Testcontainers<br>• PostgreSQL<br>• TR_M_01                                                                                                                                                                                                                                                                                                                                                               |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                         |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Medical case record is valid | Valid |
| Medical case record has valid patient information | Valid |
| Medical case record does not have valid patient information | Valid |

**Test steps:**

1. Create sample data for a medical case.

2. Store the medical case.

3. Query the medical case and compare it with the received information.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Medical case record is valid and has valid patient information | Medical case record and patient information are stored |
| Medical case record is valid and does not have valid patient information | Medical case record is stored |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

### 5.8.2 UITF_BACK_PERS_MC__DBMedicalCaseStorageIT_2 – Update of Medical Case Data

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_PERS_MC__DBMedicalCaseStorageIT_2                                                                                                                                                                                                                                                                                                                                                                 |
| Name                             | Update of medical case data                                                                                                                                                                                                                                                                                                                                                                                 |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                        |
| Description and goals            | Checks whether data for a medical case can be updated in the system.                                                                                                                                                                                                                                                                                                                                        |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [DBMedicalCaseStorageIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/infrastructure/spi/persistence/DBMedicalCaseStorageIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• PostgreSQL (Testcontainers) instance with the backend schema applied                                                                                                                                                                                                                                                                    |
| Standards, methods, and tools    | • Testcontainers<br>• PostgreSQL<br>• TR_M_01                                                                                                                                                                                                                                                                                                                                                               |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                         |

**Test input:**

A medical case is created without an assignment to a patient. In addition, a patient is created whose information is immaterial; the only prerequisite is that the patient is valid.

**Test steps:**

1. Create a sample medical-case record.

2. Persist the medical-case record.

3. Create a sample patient record.

4. Persist the patient record.

5. Update the medical-case record by adjusting the patient assignment.

6. Persist the updated medical-case record.

**Expected results:**

After repeated persistence, the information from the last pass is expected to be stored in the database. In other words, the medical case record ultimately has patient information.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

### 5.8.3 UITF_BACK_PERS_MC__DBMedicalCaseStorageIT_3 – Update of Medical Case Data

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_PERS_MC__DBMedicalCaseStorageIT_3                                                                                                                                                                                                                                                                                                                                                                 |
| Name                             | Update of medical case data                                                                                                                                                                                                                                                                                                                                                                                 |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                        |
| Description and goals            | Checks whether the patient data for a medical case can be updated in the system.                                                                                                                                                                                                                                                                                                                            |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [DBMedicalCaseStorageIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/infrastructure/spi/persistence/DBMedicalCaseStorageIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• PostgreSQL (Testcontainers) instance with the backend schema applied                                                                                                                                                                                                                                                                    |
| Standards, methods, and tools    | • Testcontainers<br>• PostgreSQL<br>• TR_M_01                                                                                                                                                                                                                                                                                                                                                               |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                         |

**Test input:**

A medical case is created with an assignment to a patient.
In addition, the patient who is part of the assignment above is created.

**Test steps:**

1. Create a sample medical-case record.

2. Persist the medical-case record.

3. Create a sample patient record.

4. Persist the patient record.

5. Update the patient record (e.g. name change in medical case)

6. Persist the updated patient record.

**Expected results:**

After repeated persistence, the information from the last pass is expected to be stored in the database. In other words, the medical case record ultimately has an assignment to the updated patient information.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

### 5.8.4 UITF_BACK_PERS_MC__DBMedicalCaseStorageIT_4 – Retrieval of Medical Case Data

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_PERS_MC__DBMedicalCaseStorageIT_4                                                                                                                                                                                                                                                                                                                                                                 |
| Name                             | Retrieval of medical case data                                                                                                                                                                                                                                                                                                                                                                              |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                        |
| Description and goals            | Checks whether data for a medical case stored in the system can be retrieved.                                                                                                                                                                                                                                                                                                                               |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [DBMedicalCaseStorageIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/infrastructure/spi/persistence/DBMedicalCaseStorageIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• PostgreSQL (Testcontainers) instance with the backend schema applied                                                                                                                                                                                                                                                                    |
| Standards, methods, and tools    | • Testcontainers<br>• PostgreSQL<br>• TR_M_01                                                                                                                                                                                                                                                                                                                                                               |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                         |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Requested case ID exists | Valid |
| Requested case ID does not exist | Valid |
| Medical case has assigned patient information | Valid |
| Medical case has no assigned patient information | Valid |
| Patient information is complete | Valid |
| Patient information is incomplete | Valid |

**Test steps:**

1. Create a sample medical-case record.

2. Persist the medical-case record.

3. Create a sample patient record.

4. Persist the patient record.

5. Query medical-case data.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Requested case ID does not exist | Expected error (`MedicalCaseDoesNotExistException`) |
| Requested case ID exists and medical case has no assigned patient information | Medical case record without patient information |
| Requested case ID exists, medical case has assigned patient information, and patient information is incomplete | Medical case record with incomplete patient information |
| Requested case ID exists, medical case has assigned patient information, and patient information is complete | Medical case record with complete patient information |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

## 5.9 UIT_BACK_PERS_RES – Persistence and Provision of Result Data

| Field                     | Value                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| ID                        | UIT_BACK_PERS_RES                                                                                     |
| Name                      | Persistence and provision of result data                                                              |
| Priority                  | High                                                                                                  |
| Test basis                | The following test objects, described in [architecture](architecture), are tested:<br>• `BACK_DB`<br>• `BACK_ERG` |
| Description and goals     | Checks whether the backend can correctly persist result data in the system and provide it again.      |
| Features to be tested     | • Store and provide result data from scoring systems                                                  |
| Features not to be tested |                                                                                                       |

### 5.9.1 UITF_BACK_PERS_RES – Persistence and Retrieval of Result Data

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_PERS_RES__DBScoringSystemResultStorageIT                                                                                                                                                                                                                                                                                                                                                                          |
| Name                             | Persistence and retrieval of result data                                                                                                                                                                                                                                                                                                                                                                                    |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Description and goals            | Checks whether result data for a medical case stored in the system can be retrieved.                                                                                                                                                                                                                                                                                                                                        |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [DBScoringSystemResultStorageIT (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/infrastructure/spi/persistence/DBScoringSystemResultStorageIT.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Docker >= 28.5.1<br>• PostgreSQL (Testcontainers) instance with the backend schema applied                                                                                                                                                                                                                                                                                    |
| Standards, methods, and tools    | • Testcontainers<br>• PostgreSQL<br>• TR_M_01                                                                                                                                                                                                                                                                                                                                                                               |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                                         |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Requested case ID exists | Valid |
| Requested case ID does not exist | Valid |

**Test steps:**

1. Create sample results from various scoring systems.

2. Persist the results.

3. Query results using a case ID.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Requested case ID does not exist | Expected error (`MedicalCaseDoesNotExistException`) |
| Requested case ID exists | Result data from all scoring systems in the medical case |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

## 5.10 UIT_BACK_ING – Ingestion of Result Data

| Field                     | Value                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| ID                        | UIT_BACK_ING                                                                                                          |
| Name                      | Ingestion of result data                                                                                              |
| Priority                  | High                                                                                                                  |
| Test basis                | The following test objects, described in [architecture](architecture), are tested:<br>• `BACK_DB`<br>• `BACK_ERG`<br>• `BACK_ORC` |
| Description and goals     | Checks whether the backend can correctly ingest result data by using an external orchestration component.             |
| Features to be tested     | • Ingestion of result data from scoring systems                                                                       |
| Features not to be tested |                                                                                                                       |

### 5.10.1 UITF_BACK_ING__IngestionActivitiesTest – Ingestion of Result Data with Connected Processing

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_ING__IngestionActivitiesTest                                                                                                                                                                                                                                                                                                                                                                                      |
| Name                             | Ingestion of result data with connected processing                                                                                                                                                                                                                                                                                                                                                                          |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Description and goals            | Checks whether result data from a scoring system are correctly ingested into the system by using an orchestration component. This includes all orchestration steps:<br>• Storage of result data<br>• Triggering of an alert                                                                                                                                                                                                 |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [IngestionActivitiesTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/infrastructure/spi/workflow/result/ingestion/IngestionActivitiesTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Local in-memory instance of the orchestration component (Temporal)                                                                                                                                                                                                                                                                                                            |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                                         |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Result record is valid | Valid |
| Result record has a status in the set `[green]` | Valid |
| Result record has a status in the set `[yellow, red]` | Valid |

**Test steps:**

1. Create a sample result from a scoring system.

2. Have the workflow of the orchestration component process the result.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Result record is valid and has a status in the set `[green]` | Result is stored |
| Result record is valid and has a status in the set `[yellow, red]` | Result is stored and an alert is triggered (email) |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

## 5.11 UIT_BACK_API_HTTP – Retrieval of Information via HTTP Interface

| Field                     | Value                                                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| ID                        | UIT_BACK_API_HTTP                                                                                                       |
| Name                      | Retrieval of information via the HTTP interface                                                                         |
| Priority                  | High                                                                                                                    |
| Test basis                | The following test objects, described in [architecture](architecture), are tested:<br>• `BACK_SER`<br>• `BACK_ERG`<br>• `BACK_META` |
| Description and goals     | Checks whether the backend can correctly output information when it is requested through the HTTP interface.            |
| Features to be tested     | • Output of information through the HTTP interface                                                                      |
| Features not to be tested |                                                                                                                         |

### 5.11.1 UITF_BACK_API_HTTP__ResultLookupControllerTest – Retrieval of Scoring-System Result Data via HTTP

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                               | UITF_BACK_API_HTTP__ResultLookupControllerTest                                                                                                                                                                                                                                                                                                                                                               |
| Name                             | Retrieval of scoring-system result data via the HTTP interface                                                                                                                                                                                                                                                                                                                                               |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                         |
| Description and goals            | Checks whether result data from scoring systems can be requested and output through the HTTP interface.                                                                                                                                                                                                                                                                                                      |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [ResultLookupControllerTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/infrastructure/api/http/ResultLookupControllerTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Initialized Spring application context<br>• In-memory database                                                                                                                                                                                                                                                                                                 |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                                                    |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                          |

**Test input:**

Various result records are created and stored in an in-memory database. This database substitutes for an actual instance and is accessed through the same interface.
The result records are divided among different medical cases.

**Test steps:**

1. Load the HTTP controller.

2. Connect the controller to the in-memory database.

3. Store result data in the in-memory database.

4. Query result data for a medical case using an HTTP client.

**Expected results:**

All results for the requested medical case are expected to be returned as the content of an HTTP response with status code `200` in JSON format.

If results for an unknown medical case are requested, an HTTP response with status code `404` is expected.

**Acceptance criteria:**


**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

### 5.11.2 UITF_BACK_API_HTTP__AggregatedSeverityLookupControllerTest – Retrieval of an Aggregate of Scoring-System Result Data via the HTTP interface

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                               | UITF_BACK_API_HTTP__AggregatedSeverityLookupControllerTest                                                                                                                                                                                                                                                                                                                                                                           |
| Name                             | Retrieval of an aggregate of scoring-system result data via the HTTP interface                                                                                                                                                                                                                                                                                                                                                       |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Description and goals            | Checks whether result data from scoring systems can be requested and output in aggregated form through the HTTP interface.                                                                                                                                                                                                                                                                                                           |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [AggregatedSeverityLookupControllerTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/infrastructure/api/http/AggregatedSeverityLookupControllerTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Initialized Spring application context<br>• In-memory database                                                                                                                                                                                                                                                                                                                         |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                                                  |

**Test input:**

Various result records are created and stored in an in-memory database. This database substitutes for an actual instance and is accessed through the same interface.

The result records are divided among a total of three different medical cases. Each case has a different maximum result severity.

**Test steps:**

1. Load the HTTP controller.

2. Connect the controller to the in-memory database.

3. Store result data in the in-memory database.

4. Query result data for a medical case using an HTTP client.

**Expected results:**

All results for a requested medical case are expected to be aggregated; that is, severity is represented by the maximum severity found across the case's results. The aggregate is returned as the content of an HTTP response with status code `200` in JSON format. Based on the test input above, three different severities are expected for the three different medical cases.

If an aggregate for an unknown medical case is requested, an HTTP response with status code `404` is expected.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

### 5.11.3 UITF_BACK_API_HTTP__MedicalCaseMetaLookupControllerTest – Retrieval of Medical Case Metadata via the HTTP interface

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                               | UITF_BACK_API_HTTP__MedicalCaseMetaLookupControllerTest                                                                                                                                                                                                                                                                                                                                                                        |
| Name                             | Retrieval of medical case metadata via the HTTP interface                                                                                                                                                                                                                                                                                                                                                                      |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Description and goals            | Checks whether metadata for a medical case can be requested and output through the HTTP interface.                                                                                                                                                                                                                                                                                                                             |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [MedicalCaseMetaLookupControllerTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/infrastructure/api/http/MedicalCaseMetaLookupControllerTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• Initialized Spring application context<br>• In-memory database                                                                                                                                                                                                                                                                                                                   |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                                            |

**Test input:**

Metadata for two different medical cases are created and stored in an in-memory database. This database substitutes for an actual instance and is accessed through the same interface.

**Test steps:**

1. Load the HTTP controller.

2. Connect the controller to the in-memory database.

3. Store the metadata in the in-memory database.

4. Query metadata for a medical case using an HTTP client.

**Expected results:**

All metadata for a requested medical case are expected to be returned as the content of an HTTP response with status code `200` in JSON format.

If metadata for an unknown medical case are requested, an HTTP response with status code `404` is expected.

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

## 5.12 UIT_BACK_META_SVC – Retrieval of Medical Case Metadata

| Field                     | Value                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                        | UIT_BACK_META_SVC                                                                                                                          |
| Name                      | Retrieval of medical case metadata                                                                                                         |
| Priority                  | High                                                                                                                                       |
| Test basis                | The following test object, described in [architecture](architecture), is tested:<br>• `BACK_META`                                                      |
| Description and goals     | Checks whether the service layer between the backend's application layer and infrastructure layer can retrieve metadata for medical cases. |
| Features to be tested     | • Retrieval of metadata for a medical case                                                                                                 |
| Features not to be tested |                                                                                                                                            |

### 5.12.1 UITF_BACK_META_SVC__MedicalCaseMetaLookupServiceTest – Retrieval of Medical Case Metadata via the Service Layer

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_META_SVC__MedicalCaseMetaLookupServiceTest                                                                                                                                                                                                                                                                                                                                                                |
| Name                             | Retrieval of medical case metadata via the service layer                                                                                                                                                                                                                                                                                                                                                            |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                                |
| Description and goals            | Checks whether the service layer can request and return metadata for a medical case.                                                                                                                                                                                                                                                                                                                                |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [MedicalCaseMetaLookupServiceTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/domain/medicalcase/MedicalCaseMetaLookupServiceTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• In-memory database                                                                                                                                                                                                                                                                                                                                                    |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                                                           |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                                 |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Medical case is known | Valid |
| Medical case is unknown | Valid |
| Case ID is `NULL` | Valid |
| Case ID is an empty string | Valid |
| Case ID is a non-empty string | Valid |

**Test steps:**

1. Create sample metadata.

2. Store the metadata in the in-memory database.

3. Initialize the service with the in-memory database.

4. Query the metadata through the service.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Case ID is `NULL` | Expected error (`NullPointerException`) |
| Case ID is an empty string | Expected error (`IllegalArgumentException`) |
| Case ID is a non-empty string and medical case is unknown | Expected error (`MedicalCaseDoesNotExistException`) |
| Case ID is a non-empty string and medical case is known | Medical case with all stored information |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

## 5.13 UIT_BACK_RES_SVC – Processing of Result Data

| Field                     | Value                                                                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                        | UIT_BACK_RES_SVC                                                                                                                                                          |
| Name                      | Processing of result data                                                                                                                                                 |
| Priority                  | High                                                                                                                                                                      |
| Test basis                | The following test object, described in [architecture](architecture), is tested:<br>• `BACK_ERG`                                                                                      |
| Description and goals     | Checks whether the service layer between the backend's application layer and infrastructure layer can process result data from various scoring systems for medical cases. |
| Features to be tested     | • Processing of result data from various scoring systems within a medical case                                                                                            |
| Features not to be tested |                                                                                                                                                                           |

### 5.13.1 UITF_BACK_META_SVC__ScoringSystemResultIngestionServiceTest – Persistence of Scoring-System Result Data within a Medical Case via the Service Layer

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_META_SVC__ScoringSystemResultIngestionServiceTest                                                                                                                                                                                                                                                                                                                                                                  |
| Name                             | Persistence of scoring-system result data within a medical case via the service layer                                                                                                                                                                                                                                                                                                                                        |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Description and goals            | Checks whether the service layer can cause result data from a scoring system within a medical case to be stored.                                                                                                                                                                                                                                                                                                             |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [ScoringSystemResultIngestionServiceTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/domain/result/ScoringSystemResultIngestionServiceTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• In-memory database                                                                                                                                                                                                                                                                                                                                                             |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                                          |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Result record is valid | Valid |
| Result record is invalid | Invalid |

**Test steps:**

1. Create a sample result record.

2. Initialize the service with an in-memory database.

3. Have the service layer persist the result record.

4. Query the result record through the service layer for comparison.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Result record is valid | Result was stored |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

### 5.13.2 UITF_BACK_META_SVC__ScoringSystemResultNotificationServiceTest – Triggering a Notification

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_META_SVC__ScoringSystemResultNotificationServiceTest                                                                                                                                                                                                                                                                                                                                                                     |
| Name                             | Triggering a notification                                                                                                                                                                                                                                                                                                                                                                                                          |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Description and goals            | Checks whether the service layer triggers a notification when result data arrive, provided that the result requires one. A result requires a notification when its severity is not `green`.                                                                                                                                                                                                                                        |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [ScoringSystemResultNotificationServiceTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/domain/result/ScoringSystemResultNotificationServiceTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x                                                                                                                                                                                                                                                                                                                                                                                           |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                                                |

**Test input:**

Sample results for this test are stored directly in the code.

| Equivalence class | Validity |
|---|---|
| Result record is valid | Valid |
| Severity is in the set `[green]` | Valid |
| Severity is in the set `[yellow, red]` | Valid |

**Test steps:**

1. Create a sample result record.

2. Initialize the service with a dummy notifier; it is used to evaluate the function call.

3. Have the service layer process the result record.

**Expected results:**

| Equivalence class | Expected result |
|---|---|
| Result record is valid and severity is in the set `[green]` | Notification is not triggered |
| Result record is valid and severity is in the set `[yellow, red]` | Notification is triggered |

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

### 5.13.3 UITF_BACK_META_SVC__ScoringSystemResultLookupServiceTest – Retrieval of Detailed Result Data within a Medical Case

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_META_SVC__ScoringSystemResultLookupServiceTest                                                                                                                                                                                                                                                                                                                                                               |
| Name                             | Retrieval of detailed result data within a medical case                                                                                                                                                                                                                                                                                                                                                                |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Description and goals            | Checks whether the service layer can retrieve and return detailed result data for various scoring systems within a medical case.                                                                                                                                                                                                                                                                                       |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation: [ScoringSystemResultLookupServiceTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/domain/result/ScoringSystemResultLookupServiceTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• In-memory database                                                                                                                                                                                                                                                                                                                                                       |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                                                              |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                                    |

**Test input:**

Three different result records are created for this test. Two are assigned to the same medical case (A), while the remaining result record is assigned to another medical case (B).

**Test steps:**

1. Create sample result data.

2. Store the result data in an in-memory database.

3. Initialize the service with the in-memory database.

4. Query the result data of a medical case through the service layer.

**Expected results:**

When medical case A is queried, the two assigned result records are expected to be returned. If detailed result data for an unknown medical case are requested, the service is expected to produce an error (`MedicalCaseDoesNotExistException`).

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

### 5.13.4 UITF_BACK_META_SVC__ScoringSystemResultLookupServiceTest_2 – Retrieval of Aggregated Result Data within a Medical Case

| Field                            | Value                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_META_SVC__ScoringSystemResultLookupServiceTest_2                                                                                                                                                                                                                                                                                                                                                              |
| Name                             | Retrieval of aggregated result data within a medical case                                                                                                                                                                                                                                                                                                                                                               |
| Priority                         | High                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Description and goals            | Checks whether the service layer can retrieve result data for various scoring systems within a medical case and return it in aggregated form.                                                                                                                                                                                                                                                                           |
| Automation / test implementation | Yes. The test stored in the project is run automatically by the Maven lifecycle `test` and `verify`. This lifecycle is triggered by a GitHub Action.<br><br>Test implementation:  [ScoringSystemResultLookupServiceTest (GitHub)](https://github.com/AMPEL-CDSS-ORG/central-ampel-service/blob/v0.2.0/src/test/java/de/uni_leipzig/ampel/central_ampel_service/domain/result/ScoringSystemResultLookupServiceTest.java) |
| Environment / prerequisites      | • TR_TU_01<br>• Java 21<br>• Maven 3.6.x<br>• In-memory database                                                                                                                                                                                                                                                                                                                                                        |
| Standards, methods, and tools    | • TR_M_01                                                                                                                                                                                                                                                                                                                                                                                                               |
| Expected record type             | Log                                                                                                                                                                                                                                                                                                                                                                                                                     |

**Test input:**

Various result records are created for the same medical case. The following scenarios are covered:

1. Results from different calculation times exist for one scoring system.

2. Two results from different scoring systems have different severities.

**Test steps:**

1. Create sample result data.

2. Store the result data in an in-memory database.

3. Initialize the service with the in-memory database.

4. Query aggregated result data for a medical case through the service layer.

**Expected results:**

For the scenarios above, the following results are expected:

1. The aggregate contains only information from the result with the later calculation time.

2. The aggregate contains the maximum severity of all severities from all scoring systems in the case.

If the aggregate for an unknown medical case is requested, the service is expected to produce an error (`MedicalCaseDoesNotExistException`).

**Acceptance criteria:**

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/central-ampel-service/releases/download/v0.2.0/central-ampel-service-test-reports-0.2.0.tar.gz

## 5.14 UIT_BACK_MAIL_LIST – Email Recipient Test

| Field                     | Value                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| ID                        | UIT_BACK_MAIL_LIST                                                                                      |
| Name                      | Email recipient test                                                                                    |
| Priority                  | Medium                                                                                                  |
| Test basis                | The following test object, described in [architecture](architecture), is tested:<br>• `BACK_MAIL`                   |
| Description and goals     | Checks whether the recipients of the emails are exclusively within the configured *local email domain*. |
| Features to be tested     | Source code that specifies the email addresses to which messages are sent                               |
| Features not to be tested |                                                                                                         |

### 5.14.1 UITF_BACK_MAIL_LIST – Email Recipient Test Case

| Field                            | Value                                                                                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                               | UITF_BACK_MAIL_LIST                                                                                                                                                       |
| Name                             | Email recipient test case                                                                                                                                                 |
| Priority                         | Medium                                                                                                                                                                    |
| Description and goals            | Checks whether the email recipient or recipients are exclusively within the configured *local email domain*.                                                              |
| Automation / test implementation | No.<br><br>A code review verifies that emails are sent exclusively to recipients within the configured *local email domain*, for example *local recipient email address*. |
| Environment / prerequisites      | TR_TU_02                                                                                                                                                                  |
| Standards, methods, and tools    | TR_M_05 checklist                                                                                                                                                         |
| Expected record type             | Protocol                                                                                                                                                                  |

**Test input:**

Source code of the `BACK_MAIL` component.

**Test steps:**

The relevant source code is opened, read, and inspected by two people who did not write it.

- [ ] The recipient email addresses belong exclusively to the configured local email domain.

**Expected results:**

Each checklist point has a result (passed/not passed).

| Equivalence class | Expected result |
|---|---|
| All checklist points can be confirmed | Success |
| Not all checklist points can be confirmed | Error |

**Acceptance criteria:**

Successful confirmation of all checklist points.

**Test execution:**

See *local test protocol* (*local ID*).

## 5.15 UIT_Score_AKI_01 - AKI Validation

| Field                     | Value                                                                                                                                                                                                                                                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                        | UIT_Score_AKI_01                                                                                                                                                                                                                                                                                                                                   |
| Name                      | AKI validation                                                                                                                                                                                                                                                                                                                                     |
| Priority                  | High                                                                                                                                                                                                                                                                                                                                               |
| Test basis                | SCO_AKI_DB<br>SCO_AKI<br>SCO_FRAME_WORK_SCH<br>SCO_FRAME_KAFKA_W<br>SCO_FRAME_WORK_DSG<br>SCO_FRAME_KAFKA_R                                                                                                                                                                                                                                        |
| Description and goals     | A successful result of this test ensures the correct calculation and persistence of all possible *product name* states for the AKI (acute kidney injury) scoring system with different input factors.                                                                                                                                              |
| Features to be tested     | AKI scoring system:<br>• Correct calculation of *product name* states based on temporal sequences of incoming data<br><br>Kafka integration:<br>• Reading input information from different Kafka topics<br>• Temporally correct persistence of the calculated *product name* states in Kafka, based on the measurement time of the leading analyte |
| Features not to be tested |                                                                                                                                                                                                                                                                                                                                                    |

### 5.15.1 UITF_Score_AKI_01 - AKI Validation with Historical Care Data

| Field                         | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                            | UITF_Score_AKI_01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Name                          | AKI validation with historical care data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Priority                      | High                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Description and goals         | A successful result of this test ensures the correct calculation and persistence of all possible CDSS states relating to acute kidney injury with different input factors.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Automation                    | No                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Environment / prerequisites   | • TR_TU_01<br>• Docker Compose is used to start the following components in containers: Kafka, the AKI scoring system, and MongoDB (AKI scoring-system persistence).<br><br>Before testing, ensure the following states:<br><br>Kafka:<br>• Standalone mode as a single-node cluster<br>• The topics `AMPEL_LABORATORY`, `AMPEL_CASES`, `AMPEL_PATIENTS`, `AMPEL_PROCEDURES`, and `AMPEL_RESULTS` exist and do not have a deletion retention policy configured<br>• The listed topics contain no messages<br>• Kafka is reachable from the scoring system<br><br>AKI scoring-system database:<br>• Standalone mode as a single-node cluster<br>• Collections managed by the scoring system are empty (contain no data entries)<br>• The database is reachable from the scoring system<br><br>The following component must be reachable from the system that starts the test:<br>• Kafka |
| Standards, methods, and tools | • TR_WZ_01<br>• TR_WZ_06<br>• TR_WZ_08                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Expected record type          | Log                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

**Test input:**

For this test case, the AKI scoring system is provided with historical care data that were manually exported once, anonymized, and permanently added to the project as test data (asset). These data cover all AKI scoring states. The `AKI Validation` data set and its description are documented at: https://github.com/AMPEL-CDSS-ORG/aki-service/tree/develop/tools/validation

| Equivalence class | Validity |
|---|---|
| Data are present as specified in the test data set | Valid |
| Data are not present as specified in the test data set | Invalid |

**Test steps:**

Start the validation tool with the appropriate parameters. The parameters mainly concern the storage location of the test data described above and the address at which Kafka can be reached.

1. Read the test data (including the expected values).

2. Filter the test data: Test data that do not fulfill a specific data type are removed. This applies, for example, to laboratory values that are not entirely numeric. During filtering, the effects are represented accordingly by also removing the associated expected values. This step follows the rules of the business logic.

3. Sort the test data: The test data are sorted using temporal information that is part of every test record. This step is particularly important for ensuring the correct order when the data are subsequently fed into Kafka. The correct order reflects the chronological occurrence of the data in reality.

4. Feed the test data into Kafka: In accordance with the order determined previously, the test data are fed sequentially into the designated Kafka topics.

5. Read the results: The Kafka topic containing the result values of all scoring systems is read. Reading continues until no further data have been available for more than 10 seconds. This assumption is sufficient because the subsystem under test is under hardly any load and can therefore process the data correspondingly quickly.

6. Compare the results with the expected values: The results that were read are compared with the expected values. If deviations occur, the test is considered failed. The comparison uses the order number, which is assigned to both the expected values and the results and enables an unambiguous mapping.

   - Milestone 1 reached → error class 1.

**Test environment teardown:**

Using Docker Compose, stop the containers that were started at the beginning of the test to return the test system to its initial state.

**Expected results:**

The expected results are based on the expected values in the test data set.

| Equivalence class | Expected result |
|---|---|
| Expected values match result values | Success |
| Expected values and result values differ | Error |

**Acceptance criteria:**

All expected values match the result values.

**Test execution:**

See [test-protocol-UIT](test-protocol-UIT).

## 5.16 UIT_DET_VIS_STATE_01 - Visualization of Medical Case Using Artificially Generated Status Data and History

| Field                     | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                        | UIT_DET_VIS_STATE_01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Name                      | Visualization of the medical case using artificially generated status data, including history                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Priority                  | Medium                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Test basis                | `FRONT_CASE`<br><br>The test basis encompasses the requirements for the visualization component's detailed output of status data for a medical case, including patient information and history, as well as the error pages:<br>https://github.com/AMPEL-CDSS-ORG/ampel-ui/releases/tag/v1.0.0<br><br>The test basis specifically comprises the following elements:<br><br>Representation of all status data for a medical case described in the JSON schema, including history:<br>https://github.com/AMPEL-CDSS-ORG/ampel-ui/blob/releases/1.0.0/app/pages/alerts/types/types.ts<br><br>For the error pages:<br>https://github.com/AMPEL-CDSS-ORG/ampel-ui/blob/releases/1.0.0/app/tests/ErrorBoundary.statusPaths.test.tsx<br><br>Use of fictitious/artificially generated test data that cover different scenarios, progressions, and status changes:<br>https://github.com/AMPEL-CDSS-ORG/ampel-ui/tree/releases/1.0.0/app/tests/FakeAmpelResultRepository.tsx<br><br>Definition of the expected target states based on the test data sets:<br>https://github.com/AMPEL-CDSS-ORG/ampel-ui/blob/develop/app/tests/__snapshots__/SnapshotPatientAlertsPage.test.tsx.snap<br><br>https://github.com/AMPEL-CDSS-ORG/ampel-ui/blob/releases/1.0.0/app/tests/__snapshots__/ErrorPages.snapshots.test.tsx.snap |
| Description and goals     | The goal of the test is to demonstrate that all UI components, including the error views, render and function as expected. Test data are used to render all components successfully and then validate them with screenshot tests and automated interaction inputs, thereby testing their functionality.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Features to be tested     | UI-based display and interpretation of status data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Features not to be tested | Processing by external target systems (e.g. HIS adapters, archives)<br>Persistence of status data in databases                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### 5.16.1 UITF_DET_VIS_STATE_01 - Visualization of Medical Case Using Artificially Generated Status Data and History

| Field                         | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                            | UITF_DET_VIS_STATE_01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Name                          | Visualization of medical case using artificially generated status data and history                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Priority                      | Medium                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Description and goals         | The goal of the test is to demonstrate that all UI components render and function as expected. Test data are used to render all components successfully and then validate them with screenshot tests and automated interaction inputs, thereby testing their functionality.                                                                                                                                                                                                                                                                                                                                                                                                      |
| Test implementation           | Yes. The snapshot test stored in the project is run automatically by `npm run coverage`. This lifecycle is triggered by a GitHub Action.<br><br>https://github.com/AMPEL-CDSS-ORG/ampel-ui/releases/tag/v1.0.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Environment / prerequisites   | • TR_TU_01<br>• React 19.2.1<br>• Node.js 20.20.0<br>• Docker >= 28.5.1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Standards, methods, and tools | The system that starts the test must meet the following prerequisites:<br>• Docker installed and operational<br>• Docker Compose installed and operational<br>• Access to a container registry for providing a network drive<br>• Optional: CI/CD environment, such as GitHub Actions, for test execution<br><br>• TR_WZ_01 — GitHub Actions<br>• TR_WZ_04 — Testcontainers<br>• TR_WZ_05 — Vitest<br>• TR_WZ_06 — Docker<br>• TR_WZ_07 — GitHub<br>• TR_WZ_08 — Docker Registry<br>• TR_WZ_09 — Faker<br>• TR_WZ_10 — testing-library/jest-dom<br>• TR_WZ_11 — testing-library/react<br>• TR_WZ_12 — vitest/coverage-v8<br>• TR_M_03 — Snapshot tests<br>• TR_M_04 — Unit tests |
| Expected record type          | Log                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

**Test input and expected results:**

The two endpoints for patient metadata and alert results are simulated. The UI is checked to determine whether it interprets them correctly and visualizes them as expected.

| Equivalence class                                                                                                                            | Expected result                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| The test patient generated analogously to the backend schema contains all three CDSS statuses (red, yellow, green) and the patient metadata. | All UI components that occur in the component are rendered as expected. |

**Test steps:**

1. Set up the test environment.

   Set up the visualization component with built-in test-data generation and a test framework for checking the output states.

   All 3 CDSS statuses (red, yellow, green), as well as the patient data, are generated analogously to the schema in the backend in order to simulate the display of all components.

2. Query using a fictitious internal medical case ID.

   The test takes place here:

   - `AlertChart.test.tsx`
   - `AlertDetailOverlay.test.tsx`
   - `FakeAmpelResultRepository.tsx`
   - `HintMessage.test.tsx`
   - `PatientAlertsPage.accessibility.test.tsx`
   - `SnapshotPatientAlertsPage.test.tsx`
   - `patientAlertsData.test.ts`

   The client component sends an HTTP GET request to `/medicalcases/CASEID/ampelresults`, simulates the response for a fictitious patient who contains all CDSS statuses, and generates a visualization of all UI components:

   ```text
   app/pages/
     PatientAlertsPage.tsx
   app/pages/alerts/components/
     AlertCard.tsx
     AlertDetailOverlay.tsx
     InconspicuousStateCard.tsx
     PatientDataHeader.tsx
   app/pages/alerts/components/components/
     AlertChart.tsx
     AlertHeader.tsx
     AlertHistory.tsx
     AlertLinks.tsx
     AlertPing.tsx
     AlertTable.tsx
     HintMessage.tsx
     OverlayBackNavigation.tsx
     StatusIcon.tsx
     StatusLegend.tsx
     Switcher.tsx
     formatDate.ts
   app/pages/alerts/types/
     api-to-ui.ts
     types-api.ts
     types.ts
   ```

3. Validation

   Passing the test demonstrates that the following are displayed as expected:

- Correct composition of frontend elements and layout
- Correct alert sorting
- Correct display of all alerts
- Correct display of patient information
- Opening the detail view
- Correct display of the detail view for each alert, including its layout
- Correct display of the links
- Correct display of the notification text
- Correct display of the analyte history as a table
- Correct display of the analyte history as a chart
- Correct display of the legend

**Acceptance criteria:**

The visualization components are available in the intended form and at the intended location.

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/ampel-ui/releases/download/v1.0.0/bericht-v1.0.0.html

### 5.16.2 UITF_DET_VIS_STATE_02 - Visualization of Different Error Messages Using Artificially Generated Problems

| Field                         | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                            | UITF_DET_VIS_STATE_02                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Name                          | Visualization of different error messages using artificially generated problems                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Priority                      | Medium                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Description and goals         | The goal of the test is to demonstrate that all error views render and function as expected. Test data are used to render all components successfully and then validate them with screenshot tests and automated interaction inputs, thereby testing their functionality.                                                                                                                                                                                                                                                                                                                                                                                                        |
| Automation                    | Yes. The snapshot test stored in the project is run automatically by `npm run coverage`. This lifecycle is triggered by a GitHub Action.<br><br>https://github.com/AMPEL-CDSS-ORG/ampel-ui/releases/tag/v1.0.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Environment / prerequisites   | • TR_TU_01<br>• React 19.2.1<br>• Node.js 20.20.0<br>• Docker >= 28.5.1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Standards, methods, and tools | The system that starts the test must meet the following prerequisites:<br>• Docker installed and operational<br>• Docker Compose installed and operational<br>• Access to a container registry for providing a network drive<br>• Optional: CI/CD environment, such as GitHub Actions, for test execution<br><br>• TR_WZ_01 — GitHub Actions<br>• TR_WZ_04 — Testcontainers<br>• TR_WZ_05 — Vitest<br>• TR_WZ_06 — Docker<br>• TR_WZ_07 — GitHub<br>• TR_WZ_08 — Docker Registry<br>• TR_WZ_09 — Faker<br>• TR_WZ_10 — testing-library/jest-dom<br>• TR_WZ_11 — testing-library/react<br>• TR_WZ_12 — vitest/coverage-v8<br>• TR_M_03 — Snapshot tests<br>• TR_M_04 — Unit tests |
| Expected record type          | Log                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

**Test input and expected results:**

All different error types are simulated, and the UI is checked to determine whether it interprets and visualizes them correctly.

| Equivalence class and test input | Expected result |
|---|---|
| All error components are rendered. | All error components match the expected UI components. |

**Test steps:**

1. Query using all artificially generated errors that can occur and simulation of following error types:

| Error code | UI component |
|---|---|
| 400 | `BadRequest.tsx` |
| 401 | `Unauthorized.tsx` |
| 403 | `Forbidden.tsx` |
| 404 | `NotFound.tsx` |
| 408 | `Timeout.tsx` |
| 410 | `NotFound.tsx` |
| 429 | `TooManyRequests.tsx` |
| 500 | `ServerError.tsx` |
| 502 | `DefaultError.tsx` |
| 503 | `ServerError.tsx` |
| 504 | `ServerError.tsx` |
| default | `DefaultError.tsx` |

2. Validation

- Correct composition of frontend elements (layout)
- Correct display of logo, error text, and options to contact support by email or telephone
- Snapshot comparison against expected snapshots

**Acceptance criteria:**

The visualization components are available in the intended form and at the intended location.

**Test execution:**

https://github.com/AMPEL-CDSS-ORG/ampel-ui/releases/download/v1.0.0/bericht-v1.0.0.html

# 6. Applicable Documents

| Document name | Reference (local ID) |
|---|---|
| [stakeholder-requirements](stakeholder-requirements) | *local ID* |
| [system-requirements](system-requirements) | *local ID* |
| [architecture](architecture) | *local ID* |
| [algorithm-aki](algorithm-aki) | *local ID* |
