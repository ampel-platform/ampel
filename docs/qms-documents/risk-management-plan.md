# Risk Management Plan - *Product Name*

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |

# 1. Introduction

The risk management plan corresponds to the risk policy defined in the *local SOP for risk management of in-house software*. It follows the requirements of ISO 14971:2019 with particular consideration of the additional requirements from Regulation (EU) 2017/745. 

## 1.1 Product

| Product name   | Version |
| -------------- | ------- |
| *Product Name* | *1.0*   |

## 1.2 Definitions

| Term | Definition                   |
| ---- | ---------------------------- |
| SOP  | Standard operating procedure |

# 2. Risk Management Team Members

*Example table:*

| ID    | Name                            | Role                         | Responsibility                                                                                            | Qualification                        | Affiliation     |
| ----- | ------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------ | --------------- |
| RTM_1 | _Project lead name_             | Project lead, risk manager   | Leading and monitoring the project development process; monitoring and control of risk-related activities | *Degree, specialisation, experience* | *Hospital Name* |
| RTM_2 | _Technical expert name_         | Technical expert             | Evaluation of technical risks                                                                             | *Degree, specialisation, experience* | *Hospital Name* |
| RTM_3 | _Technical tester name_         | Technical tester             | Technical assessment of risk control measures                                                             | *Degree, specialisation, experience* | *Hospital Name* |
| RTM_4 | _Data processing expert name_   | Data processing expert       | Evaluation of risks arising from patient data processing                                                  | *Degree, specialisation, experience* | *Hospital Name* |
| RTM_5 | _Medical and risk expert name_  | Medical expert, risk manager | Evaluation of medical risks; assessment of product use in routine patient care ("product risk")           | *Degree, specialisation, experience* | *Hospital Name* |
| RTM_6 | _Risk management reviewer name_ | Risk manager                 | Review of the risk management system                                                                      | *Degree, specialisation, experience* | *Hospital Name* |

# 3. Schedule

Schedule and responsible team members for the risk management activities:

| Risk management activity                                                                                                                                                                                                                                                                                               | Responsible persons                           | Date                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------- |
| **System-level risk analysis**: risk analysis for use of the overall therapy system under real-use conditions                                                                                                                                                                                                          | RTM_2, RTM_4, RTM_5                           | Day-Month-Year                                     |
| **Product-level risk analysis**: risk analysis for the product design, including packaging and labeling                                                                                                                                                                                                                | RTM_2, RTM_4, RTM_5                           | Day-Month-Year                                     |
| **Process-level risk analysis**: risk analysis for manufacturing processes including shipping and storage                                                                                                                                                                                                              | RTM_2, RTM_5                                  | Day-Month-Year                                     |
| **Verification of risk control measures**: check whether all risk control measures resulting from the risk analysis have been implemented and are effective                                                                                                                                                            | RTM_1, RTM_2, RTM_3, RTM_5                    | Day-Month-Year                                     |
| **Risk management review**: review of risk management activities and documentation as part of [risk-management-report](risk-management-report)                                                                                                                                                                                               | RTM_6                                         | Day-Month-Year; *interval of the recurring review* |
| **Collection and review of relevant production and post-production information**: collection and evaluation of data from the architecture and design review, unit and integration tests, process validation, and the phase after deployment; documentation as part of continuous updates to the risk management report | Evaluation: RTM_1, RTM_2, RTM_3, RTM_4, RTM_5 | At least once per year                             |

# 4. Risk Management Acceptance Criteria: Individual Risks

The acceptance criteria for individual risks are used as specified in the risk acceptance matrix in [risk-table](risk-table). The following adjustments were made compared with the *local SOP for risk management of in-house software*:

- The yellow risk acceptance level AL2 was removed because it would otherwise remain without consequences in the further process.
- The probabilities in the process risk acceptance matrix and the product risk acceptance matrix were specified for the use case. For the latter and for the product hazard analysis, possible harms were considered from a minimum occurrence probability of 1 per 1,000,000 user sessions.

# 5. Risk Management Acceptance Criteria: Overall Residual Risk

The methods for evaluating the overall residual risk and the monitoring after deployment of the in-house software are applied as defined in the *local SOP for risk management of in-house software*.

# 6. Applicable Documents

| Document name                                        | Reference (local ID) |
| ---------------------------------------------------- | -------------------- |
| *local SOP for risk management of in-house software* | *local ID*           |
| [risk-table](risk-table)                                       | *local ID*           |
| [risk-management-report](risk-management-report)                           | *local ID*           |
