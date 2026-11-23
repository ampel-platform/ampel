# Stakeholder Requirements - _Software Title_

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |

# 1. Introduction

## 1.1 Product

|Product name|Version|
|---|---|
|_Name_|_Version_|

## 1.2 Definitions

| Name | Definition                                                                                           |
| ---- | ---------------------------------------------------------------------------------------------------- |
| CDSS | Clinical decision support system                                                                     |
| GDPR | General Data Protection Regulation (GDPR)                                                            |
| MDR  | Medical Device Regulation                                                                            |
| BSI  | German Federal Office for Information Security (Bundesamt für Sicherheit in der Informationstechnik) |
| CWS  | Clinical workstation system                                                                          |

# 2. Regulatory Requirements

| ID        | Name                                          | Priority | Based on                                                                | Risk Control Measure? | Dependencies |
| --------- | --------------------------------------------- | -------- | ----------------------------------------------------------------------- | --------------------- | ------------ |
| StA_RA_01 | Information Security Management System (ISMS) | High     | *local information security manual*, <br>*local data protection manual* | No                    |              |

The system is developed and deployed by implementing the BSI-recommended IT-Grundschutz using modules from the IT-Grundschutz Compendium in accordance with the *local information security manual* and *local data protection manual*.

|ID|Name|Priority|Based on|Risk Control Measure?|Dependencies|
|---|---|---|---|---|---|
|StA_RA_02|MDR|High|Regulation (EU) 2017/745|No||
Article 5
(5) With the exception of the relevant general safety and performance requirements set out in Annex I, the requirements of this Regulation shall not apply to devices, manufactured and used only within health institutions established in the Union, provided that all of the following conditions are met:

(a) the devices are not transferred to another legal entity,

(b) manufacture and use of the devices occur under appropriate quality management system,

(c) the health institution justifies in its documentation that the target patient group's specific needs cannot be met, or cannot be met at the appropriate level of performance by an equivalent device available on the market,

(d) the health institution provides information upon request on the use of such devices to its competent authority, which shall include a justification of their manufacturing, modification and use;

(e) the health institution draws up a declaration which it shall make publicly available, including:
    (i) the name and address of the manufacturing health institution;
    (ii) the details necessary to identify the devices;
    (iii) a declaration that the devices meet the general safety and performance requirements set out in Annex I to this Regulation and, where applicable, information on which requirements are not fully met with a reasoned justification therefor,

(f) the health institution draws up documentation that makes it possible to have an understanding of the manufacturing facility, the manufacturing process, the design and performance data of the devices, including the intended purpose, and that is sufficiently detailed to enable the competent authority to ascertain that the general safety and performance requirements set out in Annex I to this Regulation are met;

(g) the health institution takes all necessary measures to ensure that all devices are manufactured in accordance with the documentation referred to in point (f), and

(h) the health institution reviews experience gained from clinical use of the devices and takes all necessary corrective actions.

Member States may require that such health institutions submit to the competent authority any further relevant information about such devices which have been manufactured and used on their territory. Member States shall retain the right to restrict the manufacture and the use of any specific type of such devices and shall be permitted access to inspect the activities of the health institutions.

This paragraph shall not apply to devices that are manufactured on an industrial scale.
# 3. Usage Requirements

| ID         | Name                   | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | ---------------------- | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_001 | Aggregated CDSS Status | Medium   | *local CDSS requirements protocol* | No                    |              |

Users shall be able to see the general CDSS condition of the patient at a glance in the clinical workstation system (CWS). The aggregated CDSS status always corresponds to the most severe condition of all currently active scoring algorithms.

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name                           | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | ------------------------------ | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_002 | Transition to CDSS Information | Medium   | *local CDSS requirements protocol* | No                    |              |

Users shall be able to navigate directly from the CWS to further CDSS information (individual scoring algorithms) of the patient.

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name          | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | ------------- | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_003 | CDSS Overview | Medium   | *local CDSS requirements protocol* | Yes                   |              |

Users shall be able to view all statuses of currently active scoring algorithms of a selected patient in a clear overview. The patient identity is permanently and prominently displayed.

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name                            | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | ------------------------------- | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_004 | Notification Text (Detail View) | Medium   | *local CDSS requirements protocol* | No                    |              |

Users receive a notification text and recommendations for each abnormal scoring algorithm for a selected patient.

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name                            | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | ------------------------------- | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_005 | Contributing Data (Detail View) | Low      | *local CDSS requirements protocol* | No                    |              |

In a detail view, users can see for each abnormal scoring algorithm which data were included in the calculation.

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name                              | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | --------------------------------- | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_006 | Further Information (Detail View) | Low      | *local CDSS requirements protocol* | No                    |              |

In a detail view, users receive for each abnormal scoring algorithm a reference to further information.

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name                       | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | -------------------------- | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_007 | Traceability (Detail View) | Medium   | *local CDSS requirements protocol* | No                    |              |

In a detail view, users receive for each abnormal scoring algorithm a brief description of how the notification was generated.

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name                   | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | ---------------------- | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_008 | Feedback (Detail View) | Low      | *local CDSS requirements protocol* | No                    |              |

In a detail view, users can provide feedback on the scoring algorithms of the current patient (e.g. via email, telephone or similar).

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name               | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | ------------------ | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_009 | Email Notification | Medium   | *local CDSS requirements protocol* | No                    |              |

Users receive notifications for abnormal scores via email to a mailbox. At a minimum, the following information is included:

- Name of the scoring algorithm
- Severity / criticality
- Timestamp of notification detection

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name              | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | ----------------- | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_010 | Email Attribution | Medium   | *local CDSS requirements protocol* | No                    |              |

Recipients of a CDSS email can unambiguously attribute the information to a patient (e.g. via name, date of birth, medical case ID).

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name               | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | ------------------ | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_011 | Email Traceability | Medium   | *local CDSS requirements protocol* | No                    |              |

Email notifications to users contain sufficient information to make the notification traceable (e.g. via contributing laboratory results).

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name                  | Priority | Based on                                              | Risk Control Measure? | Dependencies |
| ---------- | --------------------- | -------- | ----------------------------------------------------- | --------------------- | ------------ |
| StA_NA_017 | Scoring Algorithm AKI | High     | *local CDSS requirements protocol*<br>KDIGO Guideline | No                    |              |

Users receive notifications for the detection of acute kidney injury (according to the KDIGO guideline). In addition, a possible nephrotoxic administration of vancomycin is flagged.

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name                      | Priority | Based on                           | Risk Control Measure? | Dependencies |
| ---------- | ------------------------- | -------- | ---------------------------------- | --------------------- | ------------ |
| StA_NA_016 | Near-Real-Time Processing | Medium   | *local CDSS requirements protocol* | No                    |              |

Users shall be able to receive notifications within a few minutes of data availability.

**Acceptance criteria:** In a review by at least two medical professionals, the requirement is recognised as fulfilled.

| ID         | Name                       | Priority | Based on                           | Risk Control Measure? | Dependencies                         |
| ---------- | -------------------------- | -------- | ---------------------------------- | --------------------- | ------------------------------------ |
| StA_NA_012 | Instructions for Use (IFU) | High     | *local CDSS requirements protocol* | No                    | StA_NA_001 to StA_NA_011, StA_NA_017 |

Users of the software must be informed about all provided system functions in an instructions for use document.

**Acceptance criteria:** An instructions for use document is available to users. In a review by at least two medical professionals, the requirement is recognised as fulfilled.

# 4. Applicable Documents

|Document Name|Reference|
|---|---|
|*local CDSS requirements protocol*|*local ID*|
|*local information security manual*|*local ID*|
|*local data protection manual*|*local ID*|
