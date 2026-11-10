# Development Plan - *Product Name*

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

| Term | Definition |
|---|---|
| SOUP | Software of unknown provenance |
| VM | Virtual machine |
| ISMS | Information security management system |

# 2. Development Team Members

*Example table:*

| ID   | Name                           | Role                                                 | Responsibility                                                                                                                                                                                                                        | Qualification                        | Affiliation     |
| ---- | ------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | --------------- |
| TM_1 | _Project lead name_            | *Project lead*                                       | *Leading and monitoring the project development process; responsible for product release*                                                                                                                                             | *Degree, specialisation, experience* | *Hospital Name* |
| TM_2 | _Technical expert name_        | *Developer, architect, code reviewer*                | *Design of architecture and design and implementation of system components for the specified requirements; code reviewer*                                                                                                             | *Degree, specialisation, experience* | *Hospital Name* |
| TM_3 | _Technical tester name_        | *Tester, frontend developer, code reviewer*          | *Definition and execution of specific tests for the specified requirements; development of frontend requirements; code reviewer*                                                                                                      | *Degree, specialisation, experience* | *Hospital Name* |
| TM_4 | _Data processing expert name_  | *Architect, data processing expert, tester*          | *Responsible for stakeholder requirements, system requirements, and design and architecture; definition and execution of specific tests and test data sets with focus on scoring components; preparation of the instructions for use* | *Degree, specialisation, experience* | *Hospital Name* |
| TM_5 | _Medical and risk expert name_ | *Medical-technical expert, project and risk manager* | *Responsible for market analysis, development plan, risk management and risk analysis, and test documentation; preparation and review of medical-technical requirements*                                                              | *Degree, specialisation, experience* | *Hospital Name* |
| TM_6 | _Deputy project lead name_     | *Deputy project lead*                                | *Leading and monitoring the project development process*                                                                                                                                                                              | *Degree, specialisation, experience* | *Hospital Name* |

# 3. Development Phases

The [[development-chart]] contains the development schedule, including milestones, deadlines, and responsibilities.

# 4. Development Environment

## 4.1 Guidelines

| ID        | Name                                   | Priority | Traceability                        | Risk control measure? | Dependencies |
| --------- | -------------------------------------- | -------- | ----------------------------------- | --------------------- | ------------ |
| EU_RIC_01 | Information security management system | High     | *local information security manual* | No                    |              |
Implementation of BSI-recommended IT-Grundschutz using modules from the IT-Grundschutz Compendium according to the current *local information security manual*.

## 4.2 Hardware Constraints

| ID       | Name                     | Priority | Traceability | Risk control measure? | Dependencies |
| -------- | ------------------------ | -------- | ------------ | --------------------- | ------------ |
| EU_HB_01 | Computer for development | High     |              | No                    |              |
Development requires at least one computer with:

CPU: 4 cores
Graphics: no minimum requirements
RAM: 16 GB
Storage: at least 20 GB
Operating system: Unix-based system or Windows
Peripherals: keyboard, mouse, display

## 4.3 Technologies and Tools

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_TW_01 | Java compiler Maven | High |  | No | EU_INST_01, EU_PS_01 |
Development programmed in Java must be performed with the Maven compiler.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_TW_02 | Go compiler | High |  | No | EU_INST_02, EU_PS_01 |
Development programmed in Go must be performed with the compiler supplied with Go.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_TW_03 | Docker | Medium |  | No | EU_INST_03 |
Containerization images must be created using Docker.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_TW_04 | Docker Registry | Medium |  | No | EU_TW_03, EU_INST_04 |
SOUP used in containers is provided through Docker Registry: https://hub.docker.com/.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_TW_05 | GitHub Container Registry | Medium |  | No | EU_TW_03, EU_TW_04 |
Internally developed Docker images are provided and managed through GitHub Container Registry: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_TW_06 | IDE | Low |  | No | EU_INST_06 |
Development must use the JetBrains IDE suite (IntelliJ, GoLand, DataGrip)(https://www.jetbrains.com/ides/) or VS Code (https://code.visualstudio.com/).

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_TW_07 | SQL editor | Low |  | No | EU_INST_06, EU_INST_07 |
DBeaver ([https://dbeaver.io/](https://dbeaver.io/)) or DataGrip must be used as SQL editor.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_TW_08 | GitHub Actions | Low |  | No |  |
Automated test runs and build processes must be performed through GitHub Actions: https://github.com/features/actions.

## 4.4 Installation and Runtime Environment

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_INST_01 | Java compiler Maven | High |  | No |  |
CPU: no minimum requirements
Graphics: no minimum requirements
RAM: no minimum requirements
Storage: 1 GB
Operating system: Unix-based system or Windows

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_INST_02 | Go compiler | High |  | No |  |
CPU: no minimum requirements
Graphics: no minimum requirements
RAM: no minimum requirements
Storage: 1 GB
Operating system: Unix-based system or Windows

| ID         | Name   | Priority | Traceability | Risk control measure? | Dependencies |
| ---------- | ------ | -------- | ------------ | --------------------- | ------------ |
| EU_INST_03 | Docker | Medium   |              | No                    |              |
CPU: 64-bit kernel and CPU support for virtualization
Graphics: no minimum requirements
RAM: 4 GB
Storage: 1 GB
Operating system: Unix-based system

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_INST_04 | Docker Registry | Medium |  | No | EU_TW_03 |
No local requirements. Externally operated and hosted. Link: https://hub.docker.com/.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_INST_05 | GitHub Container Registry | Low |  | No | EU_TW_03, EU_TW_04 |
No local requirements. Externally operated and hosted. Link: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_INST_06 | IDE | Low |  | No |  |
CPU: Any modern CPU
Graphics: no minimum requirements
Monitor resolution: 1024x768
RAM: 2 GB
Storage: 3.5 GB
Operating system: Unix-based system or Windows (Windows 10, Server 2019, or any 64-bit Windows)

Links:
https://www.jetbrains.com/help/idea/installation-guide.html#requirements; https://www.jetbrains.com/help/go/installation-guide.html#requirements; https://www.jetbrains.com/help/datagrip/installation-guide.html#requirements; https://code.visualstudio.com/

| ID         | Name                 | Priority | Traceability | Risk control measure? | Dependencies |
| ---------- | -------------------- | -------- | ------------ | --------------------- | ------------ |
| EU_INST_07 | SQL editor (DBeaver) | Low      |              | No                    |              |
CPU: Any modern CPU
Graphics: no minimum requirements
RAM: 4 GB
Storage: 200 MB
Operating system: Unix-based system or Windows

Link: https://celerdata.com/glossary/dbeaver

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_INST_08 | GitHub Actions | Low |  | No |  |
No local requirements. Externally operated and hosted with: 

CPU: 64-bit kernel and CPU support for virtualization
Graphics: no graphics requirements
RAM: 7 GB
Storage: 14 GB
Operating system: Unix-based system.

Links:
https://docs.github.com/en/actions/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners#standard-github-hosted-runners-for-public-repositories; https://docs.github.com/de/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_INST_09 | Node.js + npm | Low |  | No |  |
CPU: 64-bit kernel and CPU support for virtualization
Graphics: no minimum requirements
RAM: 2 GB
Storage: 200 MB
Operating system: Unix-based system.

Link: https://nodejs.org/

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_INST_10 | Vite build tool | Low |  | No | EU_INST_09 |
CPU: 64-bit kernel and CPU support for virtualization
Graphics: no minimum requirements
RAM: 2 GB
Storage: 200 MB
Operating system: Unix-based system.

Link: https://vitejs.dev/

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_INST_11 | TypeScript | Low |  | No | EU_PS_03 |
CPU: 64-bit kernel and CPU support for virtualization
Graphics: no minimum requirements
RAM: 2 GB
Storage: 200 MB
Operating system: Unix-based system

Link: https://www.typescriptlang.org/

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_INST_12 | Remix Framework | Low |  | No | EU_INST_09, EU_INST_10, EU_INST_11, EU_PS_03 |
CPU: 64-bit kernel and CPU support for virtualization
Graphics: no minimum requirements
RAM: 2 GB
Storage: 200 MB
Operating system: Unix-based system

Link: https://remix.run/docs

## 4.5 Programming Language

| ID       | Name                             | Priority | Traceability | Risk control measure? | Dependencies |
| -------- | -------------------------------- | -------- | ------------ | --------------------- | ------------ |
| EU_PS_01 | Programming language Java and Go | Medium   |              | No                    |              |
Unless otherwise defined, source code must be written in Java version 21 or Go version 1.24.

| ID       | Name                            | Priority | Traceability | Risk control measure? | Dependencies |
| -------- | ------------------------------- | -------- | ------------ | --------------------- | ------------ |
| EU_PS_02 | Programming language Java - ETL | Medium   |              | No                    |              |
ETL processes must be implemented in Java version 1.8.

| ID       | Name                                 | Priority | Traceability | Risk control measure? | Dependencies |
| -------- | ------------------------------------ | -------- | ------------ | --------------------- | ------------ |
| EU_PS_03 | Programming language TypeScript - UI | Medium   |              | No                    |              |
The user interface must be implemented in TypeScript version 5.8.3.


## 4.6 Design and Coding Guidelines

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_DCR_01 | Java style guide | Low |  | No |  |

Java development must follow the Google Java Style Guide at https://google.github.io/styleguide/.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_DCR_02 | Go style guide | Low |  | No |  |

Go development must follow the Google Go Style Guide at https://google.github.io/styleguide/.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_DCR_03 | TypeScript style guide | Low |  | No |  |

TypeScript development must follow the Google TypeScript Style Guide at https://google.github.io/styleguide/.

## 4.7 Documentation

There are no additional documentation guidelines.

# 5. Configuration Management

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_KM_01 | Git | High |  | No |  |

Version control of source code and build files is performed with Git. Media files are not placed under version control.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_KM_02 | GitHub | Medium |  | No | EU_KM_01 |

Version control configuration and processes for release and automated testing are managed with GitHub.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_KM_03 | Branch management | Medium |  | No |  |

Branch management is performed according to the Gitflow workflow: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_KM_04 | Version identifiers | Medium |  | No |  |

Each software version is identified according to semver 2.0.0 (semver.org), resulting in the version format MAJOR.MINOR.PATCH, e.g. 1.0.0.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_KM_05 | Management of external dependencies in version control | Medium |  | No |  |

External components are not placed under version control again. They are referenced and resolved when build artifacts are created.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_KM_06 | Backup management | High |  | No |  |

Data used by the system or generated by the system itself must be backed up at regular intervals. Each backup must be checked to verify that it can be restored without errors.

| ID | Name | Priority | Traceability | Risk control measure? | Dependencies |
|---|---|---|---|---|---|
| EU_KM_07 | Maintenance management | High |  | No |  |

The system is checked for updates by the developers at regular intervals. Updates are assessed together with the development team to decide whether they will be implemented.

# 6. Applicable Documents

| Document name | Reference |
|---|---|
| *local information security manual* | *local ID* |
| [[development-chart]] | *local ID* |
