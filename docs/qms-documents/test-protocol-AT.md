# Test Protocol AT_01 - *Product Name* User Test

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |

# 1. Overview

|               |                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Objective** | This protocol provides evidence of execution of the *prodctu name* user test (AT_01) as part of product verification and validation. |
| **Location**  | *local test location / healthcare facility*                                                                                          |
| **Date**      | Day-Month-Year                                                                                                                       |

# 2. Product

| Product name   | Version |
| -------------- | ------- |
| *Product name* | *1.0*   |

# 3. Participants

| Name                          | Affiliation                    | Role / Responsibility                                                                          |
| ----------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| _Project lead name_           | *local development department* | Project lead, stakeholder (clinical decision support (CDS) scientist, medically active person) |
| _Clinical stakeholder 1 name_ | *hospital pharmacy*            | Stakeholder (medically active person)                                                          |
| _Clinical stakeholder 2 name_ | *hospital pharmacy*            | Stakeholder (medically active person)                                                          |
| _Clinical stakeholder 3 name_ | *hospital pharmacy*            | Stakeholder (medically active person)                                                          |
| _Clinical stakeholder 4 name_ | *hospital pharmacy*            | Stakeholder (medically active person)                                                          |
| _Clinical stakeholder 5 name_ | *hospital pharmacy*            | Stakeholder (medically active person)                                                          |
| _Clinical stakeholder 6 name_ | *hospital pharmacy*            | Stakeholder (medically active person)                                                          |
| _Clinical stakeholder 7 name_ | *hospital pharmacy*            | Stakeholder (medically active person)                                                          |
| _Technical tester name_       | *local development department* | Stakeholder, frontend developer, tester (operator/implementer)                                 |
| _Data processing expert name_ | *local development department* | Stakeholder, architect, tester, data processing expert (CDS scientist, operator/implementer)   |

# 4. Test Case

| Field                 | Value                                                                                                                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test case ID          | ATF_01                                                                                                                                                                                                                                 |
| Testers               | TTM_3, TTM_4                                                                                                                                                                                                                           |
| Date                  | Day-Month-Year                                                                                                                                                                                                                         |
| Description and goals | A successful test result ensures that all requirements in [stakeholder-requirements](stakeholder-requirements) are fulfilled. The CDS functions are tested at a CWS so that at least 2 medically active persons can confirm fulfillment of those requirements. |
| Test environment      | *local hospital workstation* with an account that has access to the patient overview in the CWS, the CDSS column, *local recipient mailbox*, and *local laboratory information system*                                                 |
| Result (error class)  | None                                                                                                                                                                                                                                   |

## 4.1 Test Steps and Results

_Project lead name_ demonstrated the CDSS functions on the workstation computer.

**Visibility of the CDSS column**  
Performed: Display of the CDSS column in the ward overview according to instructions for use was shown.  

Result:
- In the CWS, the patient's CDSS state is visible at a glance (StA_NA_001).

**Transition to the case dashboard**  
Performed: In the CWS ward overview, the CDSS status in the CDSS column was clicked for a selected patient and the CDSS UI (case dashboard) with further CDSS information opened. A red status (*local case ID for red status*), yellow status (*local case ID for yellow status*), and green status (*local case ID for green status*) were clicked.  

Result:
- It is possible to navigate directly from the CWS to further patient CDSS information (StA_NA_002).
- The aggregated CDSS status corresponds to the most severe condition of all currently active scoring algorithms (StA_NA_001).

**Case dashboard with detail view**  
Performed: The CDSS UI for the listed case IDs was shown and all individual contents were reviewed. The top area with name, date of birth, sex, patient number, case ID, and contact options was shown. The displayed scoring algorithm notification was clicked, opening the detail page. Heading, notification text, table with legend, chart after clicking "Show as chart", and the last measured values that triggered the alert were reviewed critically. The upper area with identifying and contact information remained visible in detail view.  

Result:
- In the CDSS overview, the status of all currently active scoring algorithms for a selected patient can be viewed; the patient's identity is displayed permanently and prominently.
  (StA_NA_003) 
- In the detail view, users receive targeted guidance and recommendations for each flagged scoring algorithm for a selected patient.
  (StA_NA_004)
- In the detail view, users can see which data went into the calculation for each flagged scoring algorithm for a selected patient.
  (StA_NA_005)
- In the detail view, users receive a reference to further information for each flagged scoring algorithm for a selected patient.
  (StA_NA_006)
- In the detail view, users receive a brief explanation of how each notification came about for each flagged scoring algorithm for a selected patient.
  (StA_NA_007)
- In the detail view, users can provide feedback on the scoring algorithms for a selected patient (e.g., by email).
  (StA_NA_008)


**Instructions for use**  
Performed: The instructions for use were opened in the *local document management system*, and the table of contents and scoring algorithm description were presented.

Result:
- The instructions for use are available to users and include scoring algorithm descriptions and a disclaimer that notifications must always be assessed in the overall medical context.
  (StA_NA_012)

**Email notification**  
Performed: The *local email system* was opened to search, open, and examine emails for the listed medical case IDs. Subject line contents included medical severity (AKIN3), patient name, date of birth, and medical case ID. The email included patient number, system, order number, rule set with version, notification text, analyte and measured value, performance time, processing time, and the creatinine and vancomycin values processed in the algorithm. The *local laboratory information system* was also opened to trace the respective medical case IDs and verify them successfully.  

Result:
- Members of a response team receive email notifications in a central mailbox when CDSS statuses are critical; the notifications contain at least the name of the scoring algorithm, the severity or criticality, and the time the notification was identified.
  (StA_NA_009)
- Recipients of a CDSS email can clearly associate the information it contains with a patient (e.g., by name, date of birth, or medical case number).
  (StA_NA_010)
- Email notifications to users contain sufficient information to understand the respective notification (e.g., by specifying relevant contributing laboratory results).
  (StA_NA_011)
- Users receive notifications for the detection of acute kidney injury in accordance with the KDIGO guideline; additionally, a possible nephrotoxic vancomycin administration is flagged.
  (StA_NA_017)
- Users receive CDSS notifications within a few minutes of the underlying data becoming available.
  (StA_NA_016)

## 4.2 Observations and Comments

None.

## 4.3 Required Error Correction

None.

# 5. Applicable Documents

| Document name | Reference (local ID) |
|---|---|
| [test-specifications](test-specifications) | *local ID* |
