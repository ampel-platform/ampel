# Release Checklist for In-House Software - LAMPE

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |

# 1. Meeting Overview

| | |
|---|---|
| **Objective** | This review checks the completeness and consistency of all documentation and product-related activities before release of the in-house software. |
| **Location** | MS Teams |
| **Date** | Day-Month-Year |
| **Addendum** | Day-Month-Year |

The meeting on Day-Month-Year took place while the product was in a pre-final state. Completion of the outstanding items was communicated to all participants by email on Day-Month-Year as an addendum.

Items addressed:

1. Inclusion of *product name* in the *local IT maintenance windows* (appointment agreed)  
   Processing: *appointment on Day-Month-Year and inclusion completed.*

2. Automated test documentation for approximately 70 programmed tests outstanding (appointment already planned)  
   Processing: *completed; see test documentation.*

3. One risk control measure (schemas for the ETL process) was implemented only partially. Due to the very low risk resulting from the missing measure, the decision was made to perform a risk-benefit assessment and implement the measure in version 1.1. (appointment already planned)  
   Processing: *risk-benefit assessment appointment completed, additional tests for the ETL path created, schemas planned for version 1.1.*

# 2. Product

| Product name   | Version |
| -------------- | ------- |
| *Product name* | *1.0*   |

# 3. Participants

| Name                                   | Affiliation                                     | Role / Responsibility                                           |
| -------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------- |
| _Project lead name_                    | *local development department*, *Hospital Name* | Project lead *product name*                                     |
| _Data processing expert name_          | *local development department*, *Hospital Name* | *product name* staff, especially technical documentation and QM |
| _Medical and risk expert name_         | *local development department*, *Hospital Name* | *product name* staff, especially risk management and QM         |
| _Technical tester name_                | *local development department*, *Hospital Name* | *product name* staff                                            |
| _Quality management reviewer name_     | *local quality management department*           | Review of the risk management report                            |
| _Risk management reviewer name_        | *local risk management department*              | Review of the risk management report                            |
| _Medical technology reviewer name_     | _local medical technology department_           | Review of the risk management report                            |
| _Information management reviewer name_ | *local information management department*       | Review of the risk management report                            |
| _External consultant name_             | *external consulting organization*              | Consulting                                                      |
| _Legal consultant name_                | *local legal department*                        | Consulting                                                      |

# 4. Documentation Checklist

The following documents are up to date, complete, and approved:

| Document name | Yes/No | Comment / open activities |
| --- | --- | --- |
| Product specification | Yes | [intended-use](intended-use) |
| Product classification | Yes | [mdr-classification](mdr-classification) |
| Development plan | Yes | [development-plan](development-plan)<br>Additional development schedule: [development-chart](development-chart) |
| Stakeholder requirements | Yes | [stakeholder-requirements](stakeholder-requirements) |
| Stakeholder requirements review | Yes | [stakeholder-requirements-review](stakeholder-requirements-review) |
| System requirements | Yes | [system-requirements](system-requirements) |
| System requirements review | Yes | [system-requirements-review](system-requirements-review) |
| Architecture and design | Yes | [architecture](architecture) |
| SOUP list | Yes | [soup-list](soup-list) |
| Architecture and design review | Yes | [architecture-review](architecture-review) |
| Test plan | Yes | [test-plan](test-plan) |
| Test specification | Yes | [test-specifications](test-specifications) |
| Test protocol(s) | Yes | [test-protocol-UIT](test-protocol-UIT)<br>[test-protocol-ST](test-protocol-ST)<br>[test-protocol-AT](test-protocol-AT) |
| Test report(s) | Yes | [test-report](test-report) |
| Deployment procedure | Yes | [deployment](deployment) |
| Instructions for use | Yes | [instructions-for-use](instructions-for-use) |
| Bug-fix list | No | First product version, not applicable |
| List of known anomalies | No | First product version, not applicable |
| Risk management plan | Yes | [risk-management-plan](risk-management-plan) |
| Risk analysis table | Yes | [risk-table](risk-table) |
| Risk management report | Yes | [risk-management-report](risk-management-report) |
| Market analysis | Yes | [market-analysis](market-analysis) |
| Public declaration for in-house software | No | Not applicable. The central hospital document is not part of this local publication. |
| Medical device inventory for in-house software | No | Not applicable. Replaced by activity "Entry in the local medical device inventory" in section 5 |
| Release notes | No | First product version, not applicable |

# 5. Activities Performed

The following activities are complete:

| Activity                                                                                                                                                                                                                                                                                                                                                                                       | Yes/No | Comment                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Specification of all relevant product functionalities; completion and review of requirements                                                                                                                                                                                                                                                                                                   | Yes    | See stakeholder requirements plus traceability in system requirements and architecture and design                                                                                                                                                                                                                                                                                                                                                                            |
| Evaluation of all relevant risks, including risks from known anomalies                                                                                                                                                                                                                                                                                                                         | Yes    | See risk analysis table, especially product FMEA. <br><br>**Addendum:** review of the risk management report completed                                                                                                                                                                                                                                                                                                                                                       |
| Verification and validation activities, i.e. all test phases                                                                                                                                                                                                                                                                                                                                   | Yes    | Tests fully performed. <br><br>**Addendum:** acceptance test with pharmacists completed on Day-Month-Year, documentation completed in test protocols and test report                                                                                                                                                                                                                                                                                                         |
| Complete documentation of traceability: stakeholder requirements can be assigned to system requirements and acceptance tests; system requirements can be assigned to architecture components and system tests; architecture components can be assigned to implemented software units and unit/integration tests; all risks and risk control measures can be assigned to resulting requirements | Yes    | 1. Stakeholder -> system: Yes; stakeholder -> acceptance test: pre-final.<br><br>**Addendum:** acceptance test completed on Day-Month-Year.<br><br>2. System -> architecture: Yes; system -> system tests: pre-final. <br><br>**Addendum:** test documentation completed.<br><br>3. Architecture -> software units: Yes; architecture -> unit/integration tests: pre-final. <br><br>**Addendum:** test documentation completed.<br><br>4. Risk measures -> requirements: Yes |
| Assignment of and reference to the version number, as defined in the development plan, in all product-related documents                                                                                                                                                                                                                                                                        | Yes    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Entry in the local medical device inventory                                                                                                                                                                                                                                                                                                                                                    | Yes    | Registration form submitted and *local medical device ID* assigned on Day-Month-Year                                                                                                                                                                                                                                                                                                                                                                                         |

# 6. Result

Product release is granted.

As of Day-Month-Year, not all release conditions had been fulfilled. The participants agreed that transmission of the outstanding content would be a condition for release.

Outstanding content was transmitted on Day-Month-Year. Review of the final outstanding document, the risk management report, was completed on Day-Month-Year.

# 7. Applicable Documents

| Document name | Reference (local ID) |
|---|---|
| See references in section 5. |  |
