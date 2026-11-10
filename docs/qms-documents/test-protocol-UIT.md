# Test Protocol UIT_Score_AKI_01 - AKI Scoring Algorithm Integration Test

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |

# 1. Overview

|               |                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Objective** | This protocol provides evidence of execution of the manual integration test of the AKI scoring algorithm (UIT_Score_AKI_01). |
| **Location**  | *local test location / healthcare facility*                                                                                  |
| **Date**      | Day-Month-Year                                                                                                               |

# 2. Product

| Product name   | Version |
| -------------- | ------- |
| *Product name* | *1.0*   |

# 3. Participants

| Name                           | Affiliation                    | Role / Responsibility                                                                                                                                         |
| ------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Data processing expert name_  | *local development department* | Stakeholder, architect, tester, data processing expert (Clinical decision support scientist, operator/implementer)                                            |
| _Medical and risk expert name_ | *local development department* | Project management for test documentation; support for medical-technical requirements and content creation; risk management                                   |
| _Technical expert name_        | *hospital pharmacy*            | Design of architecture and design and implementation of system components for the specified requirements; definition and execution of specific frontend tests |

# 4. Test Case

| Field | Value |
|---|---|
| Test case ID | UITF_Score_AKI_01 |
| Testers | TTM_4, TTM_5 |
| Date | Day-Month-Year |
| Description and goals | A successful test result ensures correct calculation and persistence of all possible CDSS states for acute kidney injury with different starting factors. |
| Test environment | TR_TU_01 |
| Result (error class) | None |

## 4.1 Test Steps

As described in [test-specifications](test-specifications).

Report output, not yet integrated into automated report output:

| Container ID         | Image                                               | Command                  | Created         | Status     | Names                |
| -------------------- | --------------------------------------------------- | ------------------------ | --------------- | ---------- | -------------------- |
| *local container ID* | ghcr.io/ampel-cdss-org/aki-service-validation:0.8.0 | `java -jar /opt/app/...` | *creation time* | Exited (0) | aki-aki-validation-1 |

## 4.2 Observations and Comments

None.

## 4.3 Required Error Correction

None.

# 5. Applicable Documents

| Document name | Reference (local ID) |
|---|---|
| [test-specifications](test-specifications) | *local ID* |
