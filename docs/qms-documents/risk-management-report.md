# Risk Management Report - *Product Name*

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

| Term | Definition                        |
| ---- | --------------------------------- |
| FMEA | Failure Mode and Effects Analysis |

# 2. Risk Management Process

This risk management report was prepared according to the *local SOP for risk management of in-house software*. It follows the requirements of ISO 14971:2019 with particular consideration of the additional requirements from Regulation (EU) 2017/745. The criteria for acceptance of risks are listed in [risk-table](risk-table).

| Risk management activity                                                                                                                                                      | Evidence of completion                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Risk management plan**: Risk management was planned according to ISO 14971:2019 with particular consideration of the additional requirements from Regulation (EU) 2017/745. | See [risk-management-plan](risk-management-plan) (*local ID*)                   |
| **Product-level risk analysis**: A product-level risk analysis was created.                                                                                                   | See [risk-table](risk-table) (*local ID*)                             |
| **Process-level risk analysis**: A process-level risk analysis was created.                                                                                                   | See [risk-table](risk-table) (*local ID*)                             |
| **Verification of risk control measures**: It was verified that all risk control measures resulting from the risk analysis were implemented and shown to be effective.        | See *local checklist of risk control measures* (*local ID*) |
| **Risk management review**: Review of risk management was performed and documented.                                                                                           | See [risk-management-protocol](risk-management-protocol) (*local ID*)               |

# 3. Summary

The general challenge that influences on therapy and diagnosis can always lead to death is addressed through a statistical risk assessment. Only events with a minimum probability of one statistical event in 1,000,000 user sessions are included in the risk analysis. This value, 1:1,000,000, is approximately equivalent to the general probability of dying in a car accident in Germany within two weeks.

The highest-risk hazards caused by *Product Name* arise from:

- Patient mix-up:
	- PHA_PD_R002.1, FMEA_PD_R002.1
- Incorrect results due to erroneous calculations:
	- PHA_PD_R001.1, FMEA_PD_R005.1, FMEA_PD_R007.1, FMEA_PD_R011.1
- Software shutdowns:
	- PHA_PD_R003.1, FMEA_PD_R001.1, FMEA_PD_R003.1, FMEA_PD_R006.1, FMEA_PD_R008.1, FMEA_PD_R009.1, FMEA_PD_R010.1, FMEA_PD_R013.1, FMEA_PD_R014.1
- Use error:
	- PHA_PD_R005.1
- Alert fatigue due to too many alerts:
	- PHA_PD_R004.1

The core measures for mitigating risk are:

- Technical measures and tests:
	- SyA_BU_INST_DOCKER, SyA_NFA_SQ_DD, SCO_FRAME_KAFKA_R, SCO_FRAME_KAFKA_W, SCO_FRAME_WORK_DSG, SCO_FRAME_WORK_SCH, SCO_AKI, SCO_AKI-DB, BACK_SER, BACK_DB, BACK_ERG, BACK_META, ETL_PAT, ETL_LAB, ETL_PROZ, ETL_FALL
- Prominent display of patient-identifying information:
	- StA_NA_012, SyA_FA_UI_STAMM, SyA_FA_MAIL_STAMM
- Access restrictions:
	- BACK_MAIL, SyA_NFA_SA_AUI, SyA_NFA_SQ_KONF, SyA_NFA_SA_AVM
- Feedback and support options:
	- FRONT_CASE, StA_NA_012

Overall, the risk-benefit assessment is very favorable compared with other medical devices. In absolute terms, the risks are very low. In the product hazard analysis, after implementation of risk control measures, only minor hazards (S2) have probabilities higher than very rare. In the product FMEA, this applies only to negligible hazards (S1). The main reason for the low risks is the human-in-the-loop principle. *Product Name* never directly affects patients. Warning notifications are always interpreted in the overall context by a healthcare professional.

Conclusion: The risk-benefit assessment supports the use of the *Product Name* product.

# 4. Applicable Documents

| Document name | Reference (local ID) |
|---|---|
| [risk-management-plan](risk-management-plan) | *local ID* |
| [risk-table](risk-table) | *local ID* |
| *local risk control checklist* | *local ID* |
| [risk-management-protocol](risk-management-protocol) | *local ID* |
