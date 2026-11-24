# Intended use - *product name*

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |

# 1. Introduction

## 1.1 Product

| Product name   | Version |
| -------------- | ------- |
| *product name* | *1.0*   |

## 1.2 Definitions

| Name  | Definition                                |
| ----- | ----------------------------------------- |
| AKI   | Acute kidney injury                       |
| CDSS  | Clinical decision support system          |
| CWS   | Clinical workstation system               |
| HIS   | Hospital information system               |
| KDIGO | Kidney Disease: Improving Global Outcomes |


# 2. Intended Purpose

*Product name* is a clinical decision support system (CDSS) that transparently calculates potentially undetected or unnoticed medically critical conditions at *hospital name*, draws traceable attention to them, and provides interpretive assistance. These conditions (hereinafter referred to as models) are detected via rule sets (or algorithms) based on clinical guidelines and expert knowledge. Specifically, these are:

- *Clinical condition / diagnosis 1*
- *Clinical condition / diagnosis 2*


## 2.1 Medical Indications & Contraindications

There are no restrictions regarding the indications and contraindications for the use of the product. The user must be able to understand the medical indication in order to decide whether the product is suitable for the respective patient.

## 2.2 Foreseeable Misuse

|ID|Name|
|---|---|
|ZB_VF_Feh|Signal misinterpretation|

The user misunderstands the meaning or urgency of a notification (e.g. warning vs. critical action recommendation).

|ID|Name|
|---|---|
|ZB_VF_AF|Alert fatigue|

Repeated alerts are ignored or overlooked by the user because they are perceived as disruptive or false-positive.

| ID       | Name           |
| -------- | -------------- |
| ZB_VF_PV | Patient mix-up |

The user mixes up the patient, and a notification or alert is attributed to the wrong patient.

|ID|Name|
|---|---|
|ZB_VF_VE|Confusion of units/values|

The user misinterprets laboratory values, for example by confusing units of measurement (mg/dl vs. mmol/l).

| ID       | Name                    |
| -------- | ----------------------- |
| ZB_VF_ÜS | Overlooking the display |

The alert is displayed on screen but is not perceived because the user's focus is on other tasks.

| ID        | Name                                |
| --------- | ----------------------------------- |
| ZB_VF_VAQ | Confusion of multiple alert sources |

The user treats different alerts from different systems (HIS, LIS, medical devices) as identical and overlooks differences.

## 2.3 Abnormal Use

| ID       | Name                        |
| -------- | --------------------------- |
| ZB_VF_ÜA | Over-reliance on automation |

Users adopt suspected diagnoses without interpreting them in the context of the treatment.

|ID|Name|
|---|---|
|ZB_VF_IA|Ignoring the application|

Users disregard the notifications entirely.

# 3. Patient Population

## 3.1 Age

|ID|Name|
|---|---|
|PP_Alter|Patient age|

The product is intended for patients aged 18 years and older.

# 4. User Profiles

## 4.1. Healthcare Professionals

### 4.1.1. Level of Education

| ID         | Name            |
| ---------- | --------------- |
| NP_BS_Arzt | Physician staff |

The intended users are licensed physicians.

|ID|Name|
|---|---|
|NP_BS_Apoth|Pharmacy staff|

The intended users are pharmacists.

### 4.1.2. Language

|ID|Name|
|---|---|
|NP_NAT_Sprache|Language comprehension & reading comprehension|

The user understands the German language. The user can read and understand "western" Arabic numerals and letters.

### 4.1.3. Experience

|ID|Name|
|---|---|
|NP_ERF_POS|Mandatory online training|

Prior to use, instruction in the operation of the notification system must be completed, which is provided in the form of a training video or the instructions for use.

### 4.1.4 Permissible Impairments

|ID|Name|
|---|---|
|NP_ZB_Sehen|Visual impairment|

The user may have a mild visual impairment or a corrected visual acuity of log MAR 0.2 (6/10 or 20/32).

# 5. Operating Environment

### 5.1 Operating Environment

|ID|Name|
|---|---|
|BU_H_Moni|Monitor|

The product is a web-based notification and visualization software. The interface should be accessed and operated on a display of at least 10 inches and a resolution of at least 1920×1080.

|ID|Name|
|---|---|
|BU_H_EG|End device|

Users require a PC or laptop with access to the HIS and an installed browser to display the user interface. Operation is performed exclusively via external peripheral devices (mouse).

## 5.2 Use Environment

|ID|Name|
|---|---|
|BU_OM_Klinik|Clinical use|

The user interface is used on the hospital's standard IT workstations with approved, up-to-date web browsers. It can be embedded as a status column in the CWS and called from there. Operation is only permitted in environments where the legibility of the displays and independent checking of notifications are guaranteed at all times.

## 5.3 Special Conditions of Use

|ID|Name|
|---|---|
|BU_BV_NWI|Network infrastructure|

The system may only be operated in a secured hospital network.

## 5.4. Frequency & Duration of Use

|ID|Name|
|---|---|
|BU_HD_Häuf|Frequency of individual use|

The system is designed without a defined upper limit on frequency of use. If the system requires additional performance, this can be provided through additional hardware.

|ID|Name|
|---|---|
|BU_HD_Dauer|Frequency of processed data streams|

The system is designed without a defined upper limit on the data streams to be processed. If the system requires additional performance, this can be provided through additional hardware. The reliability of the system is ensured through regular maintenance and monitoring of the IT infrastructure.

# 6. Principle of Operation and Mode of Action

|ID|Name|
|---|---|
|BW_CDS|Clinical Decision Support System|

A clinical decision support system (CDSS) is a form of health information technology that provides staff with knowledge and information to improve decision-making in clinical workflows.The data required for this purpose are provided as streams from the hospital, processed, and persisted. This includes real-time decision support

- in the form of a status indicator that can be displayed per medical case in the CWS
- a user interface accessible by clicking on the status indicator, providing an overview for tracing the automated decision recommendation and notification-specific individual hints
- notifications by email.

The basis for the decision recommendations is provided by the scoring components, which can be added to the system modularly.

|ID|Name|
|---|---|
|BW_SK_AKI|Scoring algorithm AKI|

The system detects acute kidney injury based on changes in serum creatinine levels in the blood. The determination is deterministic and based on the KDIGO guideline.

|ID|Name|
|---|---|
|BW_SK_VAAKI|Scoring algorithm Vancomycin-associated AKI|

As a refinement of BW_SK_AKI, the system additionally detects the association of the AKI with the potentially nephrotoxic antibiotic vancomycin. The vancomycin blood level measurement taken in temporal association with AKI detection serves as an indicator.

# 7. Body Parts

This is standalone software that is not applied to body parts.

# 8. Variants and Accessories

This is standalone software without connected variants or accessories.

# 9. Applicable Documents

| Document Name | Reference |
| ------------- | --------- |
|               |           |

