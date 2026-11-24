# Market Analysis - *Product Name*

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |

Last update: Day-Month-Year


# 1. Introduction

## 1.1 Product

| Product name   | Version |
| -------------- | ------- |
| *Product name* | *1.0*   |

## 1.2 Definitions

| Term  | Definition                                |
| ----- | ----------------------------------------- |
| KDIGO | Kidney Disease: Improving Global Outcomes |
| AKI   | Acute kidney injury                       |
| PDMS  | Patient Data Management Systems           |
| VTE   | Venous thromboembolism                    |
| SIRS  | Systemic Inflammatory Response Syndrome   |

# 2. Intended Purpose Searched

A clinical decision support system that draws attention to potentially undetected or unnoticed medically critical conditions at *Hospital Name* and provides interpretive assistance.

The critical conditions are detected using rule sets based on guidelines and expert knowledge. Specifically, these are:

- Acute kidney injury according to the KDIGO guideline
- Vancomycin-associated kidney injury

The intended purpose corresponds to a class IIa medical device under the MDR.

# 3. Search Scope

Inclusion criteria for the overview:

1. Products in the category "Clinical Decision Support System"
2. Existing CE certification

Exclusion criteria for the overview:

1. CDSS for contraindications and drug interactions
2. PDMS solutions for intensive care units
3. Pure image classification, e.g. in radiology

# 4. Search Steps

| Search step                                                        | Description                                                                                                                                                               | Status                                       |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Identification of already known products based on expert knowledge | Products already known to the *local development department* were summarized.                                                                                             | Completed; 7 products identified             |
| Search in the European database EUDAMED                            | Search for approved software medical devices in classes IIa, IIb, and III.                                                                                                | Completed; 6 additional products identified  |
| Search in the national database (BfArM / DMIDS)                    | Search for approved software medical devices in classes IIa, IIb, and III under the categories "information system", "decision support", and "clinical decision support". | Completed; no additional products identified |
| Contacting market participants                                     | Requests to market participants regarding their products, especially where online information was incomplete.                                                             | Completed; 1 product specified               |

# 5. Product Overview

| No. | Manufacturer | Name | CE status | Classification |
|---|---|---|---|---|
| 1 | Dedalus | clinalytix Medical AI | MDR | IIa |

Detects correlations in clinical data and then generates an alert in the HIS.

**Conditions:** Risk prediction for delirium, sepsis, AKI, VTE, and pneumonia

**Conditions not covered:** Vancomycin AKI
**Performance not covered:** NA

| No. | Manufacturer | Name | CE status | Classification |
|---|---|---|---|---|
| 2 | Tiplu | MAIA | MDR | IIa |

Clinical Decision Support System

**Conditions:** 22 guideline checks: acute kidney injury, anemia, hemolysis, folic acid deficiency, vitamin B12 deficiency, iron deficiency, diabetes mellitus, hypoglycemia, hypoglycemia in type 1 diabetes, diabetic ketoacidosis, lactic acidosis, hypokalemia, acute myocardial infarction, troponin elevation, hypernatremia, hyponatremia, Covid-19, sepsis, septic shock, fall, transaminase elevation, unclear hepatopathy, thrombocytopenia. 7 probability calculations: acute kidney injury, blood transfusion, pressure ulcer, delirium, severe hypoglycemia, sepsis, fall.

**Conditions not covered:** Vancomycin AKI
**Performance not covered:** NA

| No. | Manufacturer | Name | CE status | Classification |
|---|---|---|---|---|
| 3 | Medlytics | Medlytics | IVD | N/A |

Digital early warning system / complication prediction / patient monitoring

**Conditions:** AKI, delirium, hypoglycemia, malnutrition, SIRS

**Conditions not covered:** Vancomycin AKI
**Performance not covered:** NA

| No. | Manufacturer | Name | CE status | Classification |
|---|---|---|---|---|
| 4 | Roche | Roche Algorithm Suite | IVD | N/A |

Calculation of clinical algorithms in Roche's clinical decision support ecosystem

**Conditions:** GAAD, prediction of hepatocellular carcinoma (HCC)

**Conditions not covered:** All
**Performance not covered:** NA


| No. | Manufacturer | Name  | CE status | Classification |
| --- | ------------ | ----- | --------- | -------------- |
| 5   | UpHill       | Route | MDR       | IIa            |

Digital tracking of clinical pathways, approximately SOPs in local terminology. These can be self-created or based on one of 100 prepared templates.

**Conditions:** No alerting for acute conditions

**Conditions not covered:** All
**Performance not covered:** NA

| No. | Manufacturer | Name | CE status | Classification |
| --- | ------------ | ---- | --------- | -------------- |
| 6   | Cambio       | CDS  | MDR       | N/A            |

Development tools, a knowledge repository, and services for deployment and monitoring of Cambio CDS apps embedded in the local medical record system.

**Conditions:** Automated: prevention of stroke in patients with atrial fibrillation or flutter, i.e. CHA2DS2-VASc calculation. Manual calculations with additional user input: familial hypercholesterolaemia, iatrogenic injury prevention, prostate cancer.

**Conditions not covered:** All
**Performance not covered:** NA

| No. | Manufacturer              | Name    | CE status | Classification |
| --- | ------------------------- | ------- | --------- | -------------- |
| 7   | Huma Therapeutics Limited | Huma AI | MDR       | IIb            |

Disease management platform. Data are collected from patients for self-management or central clinician assessment, including RPM systems, companion apps, risk assessment tools, dose calculators, and algorithms.

**Conditions:** Myocardial infarction, COPD exacerbations, asthma, immunodeficiency, cancer, surgical recovery

**Conditions not covered:** All
**Performance not covered:** NA

| No. | Manufacturer | Name      | CE status | Classification |
| --- | ------------ | --------- | --------- | -------------- |
| 8   | Evidencio    | Evidencio | MDR       | IIa            |

Provides isolated CE-certified algorithms without executing software.

**Conditions:** 20 certified SaMD algorithms: Wells score, MELD 1.0, ADNEX, SCORE2, TIMI, ADAPT, ESC 0-1, ASCVD, HEART, ADHERE, CHA2DS2-VASc, AHA GWTG-HF, ABC Bleeding, ABC Stroke, BLAST, INFLUENCE 3.0, HAS-BLED, LACE, GRACE, HOSPITAL.

**Conditions not covered:** All
**Performance not covered:** NA

| No. | Manufacturer                   | Name          | CE status | Classification |
| --- | ------------------------------ | ------------- | --------- | -------------- |
| 9   | Smart Blood Analytics Swiss SA | SBAS Software | MDR       | IIa            |

Interprets routine blood test results, age, and biological sex to generate a ranked list of the 10 most likely diseases and medical conditions. Pure diagnostic supplementary information; no alerts. "The SBAS Software should not be used for screening purposes."

**Conditions:** No defined conditions. The software calculates the most likely diagnoses from 500 different diagnoses.

**Conditions not covered:** All
**Performance not covered:** NA

| No. | Manufacturer                   | Name               | CE status | Classification |
| --- | ------------------------------ | ------------------ | --------- | -------------- |
| 10  | Smart Blood Analytics Swiss SA | VIRUS vs. BACTERIA | MDR       | IIa            |

Distinguishes between viral and bacterial cause.

**Conditions:** Pathogen spectrum

**Conditions not covered:** All
**Performance not covered:** NA

| No. | Manufacturer    | Name          | CE status | Classification |
| --- | --------------- | ------------- | --------- | -------------- |
| 11  | Visiba Group AB | Visiba Triage | MDR       | IIa            |

Collects data during emergency-department triage, classifies by urgency according to the Manchester Triage Scale, and outputs suspected diagnoses based on the data collected during triage.

**Conditions:** Not comparable

**Conditions not covered:** All
**Performance not covered:** NA

| No. | Manufacturer    | Name        | CE status | Classification |
| --- | --------------- | ----------- | --------- | -------------- |
| 12  | Combinostics Oy | cNeuro cDSI | MDR       | IIa            |

Clinical decision support system that combines imaging information with a wide range of other patient data.

**Conditions:** Decision models for Alzheimer's disease, frontotemporal dementia, vascular dementia, and cognitively normal cases.

**Conditions not covered:** All
**Performance not covered:** NA

# 6. EUDAMED Search

The following search was performed on Day-Month-Year:

| Criterion | Value |
|---|---|
| URL | https://ec.europa.eu/tools/eudamed/#/screen/search-device |
| Device types | Software |
| Scope | Device |
| Search EMDN by code or description | V92: Medical device software - not included in other classes |
| Status | On the EU market |
| Risk class | Class IIa, IIb, and III |

| Result set | Records found | Hits after inclusion and exclusion criteria | Link                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | ------------: | ------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Class IIa  |           245 |                                           5 | https://ec.europa.eu/tools/eudamed/#/screen/search-device?deviceTypes=refdata.special-ivdd-device-type.software&riskClassCode=refdata.risk-class.class-iia&deviceScopes=refdata.device-scope.device&cndCode=V92&deviceStatusCode=refdata.device-model-status.on-the-market&paging=%7B%22pageIndex%22:0,%22pageSize%22:25%7D&sorting=%7B%22sortField%22:%22primaryDI%22,%22sortDirection%22:%22desc%22%7D&submitted=true&scrollTop=0 |
| Class IIb  |            15 |                                           1 | https://ec.europa.eu/tools/eudamed/#/screen/search-device?deviceTypes=refdata.special-ivdd-device-type.software&riskClassCode=refdata.risk-class.class-iib&deviceScopes=refdata.device-scope.device&cndCode=V92&deviceStatusCode=refdata.device-model-status.on-the-market&paging=%7B%22pageIndex%22:0,%22pageSize%22:25%7D&sorting=%7B%22sortField%22:%22primaryDI%22,%22sortDirection%22:%22desc%22%7D&submitted=true&scrollTop=0 |
| Class III  |             0 |                                           0 |                                                                                                                                                                                                                                                                                                                                                                                                                                     |

# 7. DMIDS Search

| Search no. | Filter criteria | Search term | Hits | Date |
|---|---|---|---:|---|
| 1 | Brief description | Decision support | 14 | Day-Month-Year |
| 2 | Brief description in English | Clinical Decision Support | 19 | Day-Month-Year |
| 3 | Class AND UMDNS | Class IIA, IIB, III and UMDNS information system | 118 | Day-Month-Year |


# 8. Applicable Documents

| Document name | Reference |
| ------------- | --------- |
|               |           |
