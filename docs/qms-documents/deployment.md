# Deployment Procedure - *Product Name*

|                      |                 |
| -------------------- | --------------- |
| **Template ID**      | *Local ID*      |
| **Template Version** | *Version*       |
| **Approval**         | *Approver name* |

# 1. Brief Description / Objective

The deployment procedure describes the activities for initial integration and for updating integrations of the product into user environments. It also covers user management and user training. Compliance with this procedure ensures that users receive the product and/or services in the intended manner.

## 1.1 Scope

The deployment procedure applies exclusively to the product described in section 1.2 at *Hospital Name*.

Process owner: _Project lead name_

## 1.2 Product

| Product name   | Version |
| -------------- | ------- |
| *Product name* | *1.0*   |

## 1.3 Definitions

| Term | Definition |
|---|---|
| HIS | Hospital information system |

# 2. Procedure Description

## 2.1 Overview

The deployment procedure includes the following activities:

- Assessment of integration requirements
- Coordination with users
- User management
- User training
- Handling feedback
- Handling updates
- Handling IT maintenance windows
- Deactivation

Procedure activities differ for each product and are described in a product-specific procedure document. The activities for *product name* are described in sections 2.2 to 2.9.

## 2.2 Assessment of Integration Requirements

### 2.2.1 Inputs

| Source                                           | Input                            |
| ------------------------------------------------ | -------------------------------- |
| *local SOP for development of in-house software* | system requirements, test report |

### 2.2.2 Description

The integration requirements that arose during development of the in-house software (especially interface definitions) are already described in [system-requirements](system-requirements) and finally assessed as fulfilled in [test-report](test-report). The final product version also results in a *product name startup checklist* that is stored centrally.

### 2.2.3 Participants

- *local development team*

### 2.2.4 Results

- Updated startup checklist at *link*

## 2.3 Coordination with Users

### 2.3.1 Inputs

| Source                                           | Input                                                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| *local SOP for development of in-house software* | system requirements, instructions for use, test specifications (acceptance test), test protocols (acceptance test) |
| *local quality management department*            | *local SOP for change management of in-house software*                                                             |
| Development department                           | Startup checklist                                                                                                  |

### 2.3.2 Description

Installation is performed by the development team according to the startup checklist. Technical information is provided to users by handing over [instructions-for-use](instructions-for-use), including communication channels for problems.

If integration problems occur:

- [system-requirements](system-requirements) is updated to avoid similar problems for future users;
- the *local SOP for change management of in-house software* is initiated with a change request if the medical device itself must be changed.

Successful integration is documented through the acceptance test.

The date and version of the deployed product and the user information are documented in the *local medical device list* and included in the *local medical device inventory*.

### 2.3.3 Participants

- Users
- Project staff for the in-house software
- Participants in change management for the in-house software

### 2.3.4 Results

- Updated system requirements
- Completed startup checklist
- Change request due to deployment activities
- Instructions for use, deployed product, *local medical device list*

## 2.4 User Management

### 2.4.1 Inputs

| Source                                           | Input               |
| ------------------------------------------------ | ------------------- |
| *local SOP for development of in-house software* | system requirements |

### 2.4.2 Description

No additional user accounts are required within the in-house software as defined by [system-requirements](system-requirements).

### 2.4.3 Participants

None.

### 2.4.4 Results

None.

## 2.5 User Training

### 2.5.1 Inputs

| Source                                           | Input                |
| ------------------------------------------------ | -------------------- |
| *local SOP for development of in-house software* | Instructions for use |

### 2.5.2 Description

All steps necessary for safe operation of the product are included in [instructions-for-use](instructions-for-use). Introduction is performed through the medical device officers established at *Hospital Name*. A person from the *local medical technology department* is available through the contact options listed in [instructions-for-use](instructions-for-use) for questions and forwards them to project staff where required (see also "Handling Feedback").

### 2.5.3 Participants

- Project staff for the in-house software
- Medical technology department staff
- Medical device officers
- Users

### 2.5.4 Results

- Product introduction

## 2.6 Handling Feedback

### 2.6.1 Inputs

| Source                                            | Input                                   |
| ------------------------------------------------- | --------------------------------------- |
| Users                                             | Product-related feedback and complaints |
| *local SOP for feedback and complaint management* |                                         |

### 2.6.2 Description

The communication channel for customer feedback and complaints is specified in [instructions-for-use](instructions-for-use). All incoming input is processed according to the *local SOP for feedback and complaint management*.

### 2.6.3 Participants

- All relevant participants in feedback and complaint management for the in-house software

### 2.6.4 Results

- Feedback and complaints from users

## 2.7 Handling *Product Name* Updates

### 2.7.1 Inputs

| Source                                                                                                      | Input                   |
| ----------------------------------------------------------------------------------------------------------- | ----------------------- |
| *local SOP for development of in-house software*;<br>*local SOP for change management of in-house software* | Product version updates |

### 2.7.2 Description

In case of a version update, the requirements for the deployment procedure changed by the update are reviewed and, where required, changes are implemented accordingly.

Updates are coordinated with users before deployment, and users are informed about possible product downtime where applicable. After deployment, the new product version is updated in the *local medical device list*, and the medical technology department is informed so that the inventory can be updated.

### 2.7.3 Participants

- Users
- Project management and project staff for the in-house software

### 2.7.4 Results

- Updated deployment procedure
- New product version deployed
- Updated *local medical device list* / updated *local medical device inventory*

## 2.8 Handling IT Maintenance Windows

### 2.8.1 Inputs

| Source                 | Input                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| *local IT department*  | Announcement of scheduled or unscheduled IT maintenance window (including planned measures) |
| Development department | Startup checklist                                                                           |

### 2.8.2 Description

In case of a scheduled or unscheduled maintenance window, software functions may be affected. Based on the announcement, the project team determines whether *product name* must be temporarily taken offline during the window. Users are informed about possible product downtime where applicable.

Before restart, activities from section 2.2 (assessment of integration requirements) are repeated, especially regarding functionality of the input interface. The restart itself is performed according to the startup checklist, analogous to section 2.3 (coordination with users).

### 2.8.3 Participants

- IT department staff
- Project management and project staff for the in-house software
- Users

### 2.8.4 Results

- Completed startup checklist
- Protocol of all activities related to the maintenance window

## 2.9 Deactivation

### 2.9.1 Inputs

| Source | Input |
|---|---|
| Clinic management | Instruction to cease operation |

### 2.9.2 Description

If a decision is made to remove the in-house software from operation, either by clinic management or by project management for the in-house software, the team lead is responsible for withdrawing the software, updating the *local medical device list* accordingly, and informing the *local medical technology department* so that the medical device inventory can be updated.

### 2.9.3 Participants

- Clinic management
- Project management for the in-house software

### 2.9.4 Results

- Deactivated in-house software
- Updated *local medical device list* / updated *local medical device inventory*

# 3. Applicable Documents

| Document name | Reference (local ID) |
|---|---|
| *local SOP for development of in-house software* | *local ID* |
| *local SOP for problem solving for in-house software* | *local ID* |
| *local SOP for change management of in-house software* | *local ID* |
| *local SOP for feedback and complaint management* | *local ID* |
| *local medical device list* | *local ID* |
| *local medical device inventory* | *local ID* |
