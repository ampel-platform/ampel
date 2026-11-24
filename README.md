<p align="center">
    <img alt="AMPEL hero image" src=".assets/ampel_logo.svg" />
</p>

<p align="center">
    <a style="text-decoration: none" href="#">
        <img alt="GitHub Release" src="https://img.shields.io/github/v/release/ampel-platform/ampel?sort=semver&display_name=release"/></a>
    <a style="text-decoration: none" href="#">
        <img alt="GitHub License" src="https://img.shields.io/github/license/ampel-platform/ampel"/></a>
    <a style="text-decoration: none" href="https://ampel-wiki.eu">
        <img alt="Docs Badge" src="https://img.shields.io/badge/Docs-1E90FF"/></a>
    <a style="text-decoration: none" href="https://fosstodon.org/@ampel">
        <img alt="Mastodon Follow" src="https://img.shields.io/mastodon/follow/116255179670081112?domain=fosstodon.org"/></a>
</p>

The AMPEL platform, an open-source project supporting healthcare facilities to develop in-house clinical decision support systems (CDSS) that fulfill the requirements of the European medical device regulation (MDR).

## Features
__Hospital information systems (HIS) agnostic__ by using dedicated data ingestion adapters that are supposed to translate HIS information into platform specific types.

__Continuous background evaluation__ of care data thanks to an event-driven architecture that does not require any time based triggers and allows for near real-time operation.

__Extensible via custom Scoring Systems__ for dedicated analyses of care data. These can be written in different programming languages since the platforms interface is implicitly described via events defined as _Protobuf_ messages. Scoring Systems are linked to the platform by connecting to its message broker.

__Evaluation insights__ via an included UI acting as a dashboard for medical encounters.


For additional information, please refer to _[the official documentation](https://ampel-wiki.eu)_.

## Limitations

- This repository does not contain any code for linking the platform with an existing _hospital information systems (HIS)_. That's because of regulatory reasons, further explained in the corresponding paper [https://doi.org/10.48550/arXiv.2611.30858](https://doi.org/10.48550/arXiv.2611.30858).

- Scoring Systems are not part of this repository as they will be published separately. This repository is intended to serve platform purposes only.

- Version numbers of documents related to _quality management systems (QMS)_ can diverge from the version number of software that is published via this repository. As a good starting point we recommend consulting the platform's _[official documentation](https://ampel-wiki.eu)_.

- The platform does not yet provide any _FHIR_ related interfaces.

> [!CAUTION]
> This software is __NOT__ intended for medical purposes.
>
> Please read the _[NOTICE](NOTICE)_ file for complete disclaimers. Integrating the software as a _software of unknown provenance (SOUP)_ into an (in-house) medical device software places all liability on the manufacturer of that medical device.

## Maintenance
This repository is actively maintained by _University of Leipzig Medical Center, Department for Clinical AI and Translational Medicine_.

## Publications

1. Twrdik, A., Steinbach, D., Federbusch, M., Malkawi, C., Schmidt, M., & Kirsten, T. (2026). _The AMPEL platform: An open-source project for developing hospital-wide clinical decision support systems under EU-regulation_. _ArXiV_. [https://doi.org/10.48550/arXiv.2611.30990](https://doi.org/10.48550/arXiv.2611.30990)
2. Steinbach, D., Schmidt, M., Twrdik, A., Malkawi, C., Kirsten, T., & Federbusch, M. (2026). _The AMPEL Platform: A Concept for Open-Source Collaboration in Developing In-House Medical Device Software under EU-Regulation_. _ArXiV_. [https://doi.org/10.48550/arXiv.2611.30858](https://doi.org/10.48550/arXiv.2611.30858)
