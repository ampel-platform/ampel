import { faker } from "@faker-js/faker";
import AlertCard from "./components/alert-card";
import { ReactNode, useEffect, useState } from "react";
import { AlertDetails, AlertType, AmpelStatus, PatientMetaData, Ruleset, RulesetHistory } from "./types";
import PatientMetaDataHeader from "./components/patient-data-header";
import AlertDetailOverlay from "./components/alert-detail-overlay";
import InconspicuousStateCard from "./components/inconspicuous-state-card";
import { useParams } from "@remix-run/react";

const generateFakeHistoryData = (): RulesetHistory => {
    return {
        data: [
            {
                date: faker.date.recent({ days: 5 }),
                analyteValue: faker.number.int({ min: 0, max: 50 }),
                ampelStatus: faker.number.int({ min: 1, max: 3 })
            },
            {
                date: faker.date.recent({ days: 5 }),
                analyteValue: faker.number.int({ min: 0, max: 50 }),
                ampelStatus: faker.number.int({ min: 1, max: 3 })
            },
            {
                date: faker.date.recent({ days: 5 }),
                analyteValue: faker.number.int({ min: 0, max: 50 }),
                ampelStatus: faker.number.int({ min: 1, max: 3 })
            },
            {
                date: faker.date.recent({ days: 5 }),
                analyteValue: faker.number.int({ min: 0, max: 50 }),
                ampelStatus: faker.number.int({ min: 1, max: 3 })
            },
            {
                date: faker.date.recent({ days: 5 }),
                analyteValue: faker.number.int({ min: 0, max: 50 }),
                ampelStatus: faker.number.int({ min: 1, max: 3 })
            },
            {
                date: faker.date.recent({ days: 5 }),
                analyteValue: faker.number.int({ min: 0, max: 50 }),
                ampelStatus: faker.number.int({ min: 1, max: 3 })
            },
            {
                date: faker.date.recent({ days: 5 }),
                analyteValue: faker.number.int({ min: 0, max: 50 }),
                ampelStatus: faker.number.int({ min: 1, max: 3 })
            },
            {
                date: faker.date.recent({ days: 5 }),
                analyteValue: faker.number.int({ min: 0, max: 50 }),
                ampelStatus: faker.number.int({ min: 1, max: 3 })
            },
        ]
    }
}

export default function PatientAlerts() {
    const params = useParams();
    const [detailOverlayData, setDetailOverlayData] = useState(null as unknown as AlertDetails);
    const [detailOverlayVisibilityClasses, setDetailOverlayVisibilityClasses] = useState("left-full");
    const [inconspicuousStatesVisible, setInconspicuousStatesVisible] = useState(false);

    const [patientMetaData, setPatientMetaData] = useState(null as unknown as PatientMetaData);
    const [rulesetsByStatus, setRulesetsByStatus] = useState(new Map<AmpelStatus, ReactNode[]>([
        [AmpelStatus.RED, []],
        [AmpelStatus.YELLOW, []],
        [AmpelStatus.GREEN, []]
    ]));

    const displayDetailOverlay = (details: AlertDetails) => {
        setDetailOverlayData(details);
        setDetailOverlayVisibilityClasses("left-0");
    }

    const hideDetailOverlay = () => {
        setDetailOverlayVisibilityClasses("left-full");
    }

    useEffect(() => {
        console.log(params.patient_id);
        setPatientMetaData({
            name: "Max Mustermann",
            patientId: params.patient_id || "",
            caseId: params.case_id || "",
            sex: "männlich",
            birthdate: faker.date.birthdate()
        });

        const rulesets: Ruleset[] = [
            {
                ruleset: "Akute Nierenschädigung [AKIN 1, Vancomycin]",
                ampelStatus: AmpelStatus.RED,
                message: "Der Kreatininanstieg weist auf eine akute Nierenschädigung im Zusammenhang mit einer Vancomycintherapie hin (AKIN-Stadium 1 nach KDIGO-Kriterien). Weiterführende Diagnostik- und Therapiemaßnahmen (KDIGO-Bundle) empfohlen.",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData(),
                links: [{
                    displayText: "Deximed",
                    href: "https://deximed.de/home/klinische-themen/niere-harnwege/krankheiten/nierenerkrankungen/nierenversagen-akutes#allgemeine-informationen-atiologie-und-pathogenese"
                }, {
                    displayText: "Labor",
                    href: "#"
                }]
            },
            {
                ruleset: "Anämie",
                ampelStatus: AmpelStatus.YELLOW,
                message: "<p>Laut Querschnittsleitlinie der BÄK (2020) ist die Transfusion eines Blutbeutels bei Hb < 4,3 mmol/l dringend zu erwägen.</p><br>Bitte reflektieren Sie patientenspezifisch:<br><p style='margin-left: 10px'>- <b>allg. Risikofaktoren,</b><br>- <b>Klinik</b><br>- <b>Ischämietypische EKG</b>-Veränderungen<br>- <b>Labor</b> und betreiben Sie ggf. <b>weitere Diagnostik.</b></p><br>Bei Transfusion denken Sie bitte frühzeitig an Kreuzblut. Ein Transfusionserfolg sollte innerhalb von 24h überprüft werden.\"",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData(),
                links: [{
                    displayText: "Deximed",
                    href: "https://deximed.de/home/klinische-themen/blut/symptome/anaemie-bei-erwachsenen"
                }, {
                    displayText: "Labor",
                    href: "#"
                }]
            },
            {
                ruleset: "Refeeding Syndrom",
                ampelStatus: AmpelStatus.RED,
                message: "Laborchemische Diagnose eines Refeedingsyndroms. Es wird empfohlen tägliche Kontrollen von Kalium, Magnesium und Phosphat bis zum Elektrolytausgleich vorzunehmen und das Ernährungsteam zu involvieren. Einem RFS ähnelnde Elektrolytentgleisungen sind auch bei Hirntraumata und nach Leberoperationen beschrieben. Bitte prüfen Sie die Indikation.",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData(),
                links: [{
                    displayText: "Deximed",
                    href: "https://deximed.de/home/klinische-themen/geriatrie/krankheiten/stoffwechsel-ernaehrung/mangelernaehrung#verlauf-komplikationen-und-prognose-komplikationen"
                }, {
                    displayText: "SOP",
                    href: "http://roxtra.medizin.uni-leipzig.de/Roxtra/index.aspx?FileID=82421"
                }, {
                    displayText: "Labor",
                    href: "#"
                }]
            },
            {
                ruleset: "Hyperkalzämie",
                ampelStatus: AmpelStatus.RED,
                message: "Bei lebensbedrohlich erhöhtem Kalzium wurde bislang keine Therapiekontrolle durchgeführt. Die Diagnostik der Ursache sowie Therapie wird empfohlen. Die Kontrolle des Behandlungserfolgs nach spätestens 12 Stunden wurde überschritten.",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData(),
                links: [{
                    displayText: "Deximed",
                    href: "https://deximed.de/home/klinische-themen/endokrinologie-stoffwechsel/symptome/hyperkalzaemie#diagnostik-diagnostische-uberlegungen"
                }, {
                    displayText: "Labor",
                    href: "#"
                }]
            },
            {
                ruleset: "Sepsis",
                ampelStatus: AmpelStatus.GREEN,
                message: "Detektion einer potentiellen Sepsiskonstellation",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData()
            },
            {
                ruleset: "Hypokaliämie",
                ampelStatus: AmpelStatus.GREEN,
                message: "Detektion und Sicherstellung einer Konsequenz (Nachkontrolle) bei Hypokaliämie",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData()
            },
            {
                ruleset: "Hypocalcämie",
                ampelStatus: AmpelStatus.GREEN,
                message: "Detektion und Sicherstellung einer Konsequenz (Nachkontrolle) bei Hypocalcämie",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData()
            },
            {
                ruleset: "Hyponatriämie",
                ampelStatus: AmpelStatus.GREEN,
                message: "Detektion und Sicherstellung einer Konsequenz (Nachkontrolle) bei Hyponatriämie",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData()
            },
            {
                ruleset: "Laktatämie",
                ampelStatus: AmpelStatus.GREEN,
                message: "Detektion eines Infektionsgeschehens und Sicherstellung einer Konsequenz (Nachkontrolle)",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData()
            },
            {
                ruleset: "Diabetes",
                ampelStatus: AmpelStatus.GREEN,
                message: "Detektion von bisher nicht kodiertem Diabetes mellitus",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData()
            },
            {
                ruleset: "Fibrinogenmangel",
                ampelStatus: AmpelStatus.GREEN,
                message: "Detektion von unbekanntem Fibrinogenmangel",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData()
            },
            {
                ruleset: "Hyperglykämie",
                ampelStatus: AmpelStatus.GREEN,
                message: "Detektion von anhaltenden Hyperglykämien bzw. solchen ohne Konsequenz (Nachkontrolle)",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData()
            },
            {
                ruleset: "Procalcitonin-Monitoring",
                ampelStatus: AmpelStatus.GREEN,
                message: "Detektion eines nicht adäquaten Procalcitoninabfalls",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData()
            }
        ];

        let rulesetsByStatus: Map<AmpelStatus, ReactNode[]> = new Map([
            [AmpelStatus.RED, []],
            [AmpelStatus.YELLOW, []],
            [AmpelStatus.GREEN, []]
        ]);
        rulesets.forEach((rs) => {
            switch (rs.ampelStatus) {
                case AmpelStatus.RED:
                    rulesetsByStatus.get(AmpelStatus.RED)?.push(
                        <AlertCard
                            key={rs.ruleset}
                            type={AlertType.Critical}
                            title={rs.ruleset}
                            message={rs.message}
                            creationTime={rs.resultTime}
                            onClick={() => displayDetailOverlay({
                                ruleset: rs.ruleset,
                                ampelStatus: AlertType.Critical,
                                message: rs.message,
                                resultTime: rs.resultTime,
                                rulesetHistory: rs.history,
                                links: rs.links || []
                            })}
                        />
                    );
                    break;
                case AmpelStatus.YELLOW:
                    rulesetsByStatus.get(AmpelStatus.YELLOW)?.push(
                        <AlertCard
                            key={rs.ruleset}
                            type={AlertType.Warning}
                            title={rs.ruleset}
                            message={rs.message}
                            creationTime={rs.resultTime}
                            onClick={() => displayDetailOverlay({
                                ruleset: rs.ruleset,
                                ampelStatus: AlertType.Warning,
                                message: rs.message,
                                resultTime: rs.resultTime,
                                rulesetHistory: rs.history,
                                links: rs.links || []
                            })}
                        />
                    )
                    break;
                case AmpelStatus.GREEN:
                    rulesetsByStatus.get(AmpelStatus.GREEN)?.push(
                        <InconspicuousStateCard
                            key={rs.ruleset}
                            title={rs.ruleset}
                            description={rs.message || ""}
                            creationTime={rs.resultTime}
                        />
                    )
                    break;
            }
        });

        setRulesetsByStatus(rulesetsByStatus);
    }, []);


    return (
        patientMetaData && rulesetsByStatus &&
        <div className="w-full h-full px-4">
            <div className="w-full h-full flex flex-col gap-y-10">
                <PatientMetaDataHeader
                    name={patientMetaData.name}
                    patientId={patientMetaData.patientId}
                    caseId={patientMetaData.caseId}
                    sex={patientMetaData.sex}
                    birthdate={patientMetaData.birthdate}
                />

                <div className="w-full h-full flex flex-col relative">
                    <div className={`w-full h-full absolute transition-all ease-in-out duration-500 z-50 
                                     ${detailOverlayVisibilityClasses}`}>
                        <AlertDetailOverlay
                            data={detailOverlayData}
                            onClose={hideDetailOverlay}
                        />
                    </div>

                    <div className="w-full h-full flex flex-col gap-y-20">
                        <div className="flex flex-row gap-x-12">
                            <div className="w-full flex flex-col items-start gap-y-4">
                                <div className="flex flex-row gap-x-4 items-baseline">
                                    <span className="text-lg text-gray-600">Kritische Zustände</span>
                                    <span
                                        className="rounded-md px-3 bg-rose-100 text-rose-800 text-base">{rulesetsByStatus.get(AmpelStatus.RED)?.length}</span>
                                </div>

                                <div className="w-full grid grid-cols-2 gap-3">
                                    {rulesetsByStatus.get(AmpelStatus.RED)}
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-start gap-y-4">
                                <div className="flex flex-row gap-x-4 items-baseline">
                                    <span className="text-lg text-gray-600">Warnende Zustände</span>
                                    <span
                                        className="rounded-md px-3 bg-amber-100 text-amber-800 text-base">{rulesetsByStatus.get(AmpelStatus.YELLOW)?.length}</span>
                                </div>

                                <div className="w-full grid grid-cols-2 gap-3">
                                    {rulesetsByStatus.get(AmpelStatus.YELLOW)}
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-full flex flex-col gap-y-4">
                            <a className="flex flex-row gap-x-4 text-gray-600 items-center hover:cursor-pointer"
                                onClick={() => setInconspicuousStatesVisible(!inconspicuousStatesVisible)}>
                                <span className="text-lg">Unauffällige Zustände</span>
                                <span className="rounded-md px-3 bg-gray-100 text-gray-800 text-base">
                                    {rulesetsByStatus.get(AmpelStatus.GREEN)?.length}
                                </span>
                                {!inconspicuousStatesVisible &&
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        className="size-4">
                                        <path fillRule="evenodd"
                                            d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                                            clipRule="evenodd" />
                                    </svg>
                                }
                                {inconspicuousStatesVisible &&
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        className="size-4">
                                        <path fillRule="evenodd"
                                            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                            clipRule="evenodd" />
                                    </svg>
                                }
                            </a>

                            <div
                                className={`grid grid-cols-3 gap-3 overflow-hidden ${inconspicuousStatesVisible ? "inline-grid" : "hidden"}`}>
                                {rulesetsByStatus.get(AmpelStatus.GREEN)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}