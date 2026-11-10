# Test Protocol ST_01 - Manual Developer Test of *Product Name*

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |

# 1. Overview

|               |                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| **Objective** | This protocol provides evidence of execution of the manual developer test of *product name* (ST_01). |
| **Location**  | *local test location*                                                                                |
| **Date**      | Day-Month-Year                                                                                       |

# 2. Product

| Product name   | Version |
| -------------- | ------- |
| *Product name* | *1.0*   |

# 3. Participants

| Name                           | Affiliation                    | Role / Responsibility                                                                                                                                         |
| ------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Data processing expert name_  | *local development department* | Stakeholder, architect, tester, data processing expert (clinical decision support scientist, operator/implementer)                                            |
| _Medical and risk expert name_ | *local development department* | Project management for test documentation; support for medical-technical requirements and content creation; risk management                                   |
| _Technical expert name_        | *local development department* | Design of architecture and design and implementation of system components for the specified requirements; definition and execution of specific frontend tests |

# 4. Test Case

| Field | Value |
|---|---|
| Test case ID | STF_01 |
| Testers | TTM_4, TTM_5 |
| Date | Day-Month-Year |
| Description and goals | Individual system requirements are checked manually using a checklist. The goal is human confirmation of fulfilled acceptance criteria. |
| Test environment | TR_TU_02 |
| Result (error class) | Minor |

## 4.1 Test Steps

The following points were checked manually through an independent review:

**Regarding the user interface:**
- According to the instructions for use, the CDSS column can be displayed.
  (SyA_BU_INST_SPALTE)

- The current CWS with an integrated CDSS column can be accessed and opened on a *local standard workstation*.  (SyA_ES_SS_PC, SyA_ES_HS_PC)

- All four possible states of the aggregated CDSS status are visible in the CWS, insofar as they are present in the test system. Navigating from there leads to the user interface for the corresponding medical case.
  (SyA_ES_SS_KAS)

- The user interface is readable for the user on *local standard displays*.
  (SyA_ES_NS_UI)

- The user interface clearly displays the patient master data (medical case number, patient number, first name, last name, date of birth, gender) of a selected patient at all times.
  (SyA_FA_UI_STAMM, DQ_CDC)

- The user interface displays contact information at all times.
  (SyA_FA_UI_FB)

- The current results are presented clearly in the user interface. Relevant scoring algorithms are grouped according to the current CDSS status. Critical states are placed at the top and non-critical states at the bottom. Each group is identified by a color (critical—red, warning—yellow, no findings—gray).
  (SyA_FA_UI_START)

- User interface: The CDSS status of each scoring algorithm in the start view for a selected patient is displayed as a tile that can be clicked to open detailed information about that scoring algorithm.
  (SyA_FA_UI_DETAIL)

- The detail view for a scoring algorithm includes a brief description of how the current alert was triggered and what recommendation results from it.
  (SyA_FA_UI_HINWEIS, DQ_CDC)

- In the detail view for a scoring algorithm, users are given a list of the laboratory results that led to the execution of the respective scoring algorithm. This view is presented as a table (with the newest result first) and/or graphically, and includes at least: measurement time, name, measured value, and unit of the laboratory analytes, and the CDSS status resulting from the data point.
  (SyA_FA_UI_DATEN, DQ_CDC)

- In the detail view for a scoring algorithm, users have access to at least one further source of information (e.g., instructions for use, SOP, or link to a knowledge base).
  (SyA_FA_UI_LINK)

- All information relevant to the results can be accessed in no more than 3 clicks.
  (SyA_NFA_SQ_MINI)

- Information relevant to the results is visible on the standard screen at standard resolution, without manually minimizing the window and without scrolling.
  (SyA_NFA_SQ_UEB)

- After successfully logging into the CWS, the user interface can be accessed. If the link in the browser opened for the user interface is forwarded externally, the link cannot be opened from outside the UKL network.
  (SyA_NFA_SA_AUI)

- The instructions for use are available through roXtra with the required content (specified by the document template + description of the scoring algorithms + disclaimer).
  (SyA_ES_IFU)

**Regarding email notifications:**
- The UKL mailbox receives the emails generated by *Product Name*.
  (SyA_ES_SS_MAIL, BACK_MAIL, BACK_RELAY)

- Critical and warning CDSS statuses are received in the mailbox.
  (SyA_FA_MAIL_VERS)

- Email notifications clearly display the patient master data (case number, patient number, first name, last name, date of birth) of a selected person (e.g., directly in the subject line). The information corresponds to the information in the primary HIS system.
  (SyA_FA_MAIL_STAMM)

- Email notifications contain clear and structured information about: 1. an indication of which algorithm is generating the alert; 2. the CDSS status; 3. the CDSS severity level, including a recommended action; 4. information about the data included (e.g., measurement time, name, measured value, and unit of the laboratory analyte); and 5. any additional case- or patient-specific information considered by the algorithm, where applicable; and 6. are sent from a designated *local sender mailbox*.
  (SyA_FA_MAIL_INH)

- Severity levels (which further describe the respective CDSS status) and alert texts correctly correspond to one another.
  (SyA_FA_SCORE_SCHWER)


**At the system level:**
- The software architecture, including data storage, runs in production on a VM under a Linux operating system. The VM requirements are met (at least 400 GB of storage space, directly available or mounted; at least 4 CPU cores; at least 32 GB of RAM; the Docker container runtime is available; and network access is granted for the connection to the AMPEL DB).
  (SyA_ES_HS_VM)

- *Product name* has access to the *local source database* (minimum version: *version*) containing current patient routine data. The CDC feature (Change Data Capture) is enabled. A user account for queries from the Linux VM (*VM name*, SyA_ES_HS_VM) is configured, and permission to read the CDC is available. Port 1433 is open for access by SyA_ES_HS_VM.
  (SyA_ES_SS_DB)

- Docker Compose exists, includes all relevant system components, and automated restarts are configured.
  (SyA_BU_INST_DOCKER)

- In a review of 10 incoming data points, a CDSS status (green/yellow/red) is calculated for each and stored together with key variables (e.g., case number, name of the scoring algorithm, information about the triggering laboratory value). The aggregated CDSS status corresponds to the respective data situation.
  (SyA_FA_SCORE_STATUS und SyA_FA_SCORE_AGGR)

- Validation of the scoring algorithm (SCO_AKI) using a test dataset is successful.
  (SyA_FA_SCORE_AKI)

- After test data are entered manually, the time until a corresponding email is received is measured. In more than 90% of cases, the delay is less than 5 minutes.
  (SyA_NFA_L_EV)

- The system uses containers for SOUPs only from trusted sources, such as Docker Hub or quay.io.  (SyA_NFA_SA_CONT)

- All system components run within containers. Processing steps take place in isolation and are automated on a VM.
  (SyA_NFA_SA_SAND)

- All user accounts in the development department can access the VM using the authentication methods mentioned above. Access is denied if usernames or passwords are entered incorrectly.
  (SyA_NFA_SA_AVM and SyA_NFA_SQ_KONF)

- No unnecessary additional data were connected to the system during development of the algorithms.
  (SyA_NFA_SA_MINI)

- No registered users other than administrators can change the layout of UI elements.
  (SyA_NFA_SQ_SUI)

- During test operation before activation, the system is shown to be capable of running continuously 24/7.
  (SyA_NFA_SQ_SL)

- In a test environment, an alert is generated when data are not received. If no new data are received for at least one hour, an informational email is sent.
  (SyA_NFA_SQ_DD)

- There is written confirmation from those responsible for IT maintenance windows that *prodcut name* has been included in the information flow for those windows.
  (SyA_NFA_SQ_W)

- There is a detailed description and visualization of the individual components. Interfaces that will need to be supported for future modules are identified.
  (SyA_NFA_SQ_MOD)

## 4.2 Observations and Comments


-  The name of the analyte in the detail view in the user interface and in the email should perhaps be written in plain language (instead of LCRE_S -> Serum creatinine).
- For analytes in the detail view in the user interface, “Value (µmol/l)” should perhaps be called “Value (unit)” or “Value with unit.”
- For better readability, the case number and patient number in the email notification could be shown without the leading zeros (e.g., 82405328 instead of 0082405328).
- The name and date of birth are included directly in the email subject line, but are missing from the email body. As a result, you have to look back up to read the patient’s name again. It would probably be better to include this information twice, that is, to list it again in the email body.
- The wording in the email for the scoring algorithm used is “rule set.” Although this can be easily understood, it should be called “algorithm” or “score” for consistency. It may be useful to present the email content in a different order depending on the recipients.
 - It may be useful to put the time of service directly below “Measurement value” in the email and group the processing time (of the *product name* algorithm) together with the version (e.g., 0.8.0) and the rule set.
- The line breaks for the basic information in the email work. However, the information included in the calculation is displayed with the correct line breaks only when Outlook is set up. It may be useful to use the same line breaks as in the information above.
- During the review of user accounts, an account belonging to an employee who was no longer employed was found and removed.

## 4.3 Required Error Correction

None.

# 5. Applicable Documents

| Document name | Reference (local ID) |
|---|---|
| [[test-specifications]] | *local ID* |
