import {faker} from "@faker-js/faker";
import AlertCard from "./components/alert-card";
import {useParams} from "react-router";
import {ReactNode, useEffect, useState} from "react";
import {AlertDetails, AlertType, AmpelStatus, PatientMetaData, Ruleset, RulesetHistory} from "./types";
import PatientMetaDataHeader from "./components/patient-data-header";
import AlertDetailOverlay from "./components/alert-detail-overlay";

const generateFakeHistoryData = (): RulesetHistory => {
    return {
        data: [
            {
                date: faker.date.recent({days: 5}),
                analyteValue: faker.number.int({min: 0, max: 50}),
                ampelStatus: faker.number.int({min: 1, max: 3})
            },
            {
                date: faker.date.recent({days: 5}),
                analyteValue: faker.number.int({min: 0, max: 50}),
                ampelStatus: faker.number.int({min: 1, max: 3})
            },
            {
                date: faker.date.recent({days: 5}),
                analyteValue: faker.number.int({min: 0, max: 50}),
                ampelStatus: faker.number.int({min: 1, max: 3})
            },
            {
                date: faker.date.recent({days: 5}),
                analyteValue: faker.number.int({min: 0, max: 50}),
                ampelStatus: faker.number.int({min: 1, max: 3})
            },
            {
                date: faker.date.recent({days: 5}),
                analyteValue: faker.number.int({min: 0, max: 50}),
                ampelStatus: faker.number.int({min: 1, max: 3})
            },
            {
                date: faker.date.recent({days: 5}),
                analyteValue: faker.number.int({min: 0, max: 50}),
                ampelStatus: faker.number.int({min: 1, max: 3})
            },
            {
                date: faker.date.recent({days: 5}),
                analyteValue: faker.number.int({min: 0, max: 50}),
                ampelStatus: faker.number.int({min: 1, max: 3})
            },
            {
                date: faker.date.recent({days: 5}),
                analyteValue: faker.number.int({min: 0, max: 50}),
                ampelStatus: faker.number.int({min: 1, max: 3})
            },
        ]
    }
}

export default function PatientAlerts() {
    const params = useParams();
    const [detailOverlayData, setDetailOverlayData] = useState(null as unknown as AlertDetails);
    const [detailOverlayVisibilityClasses, setDetailOverlayVisibilityClasses] = useState("left-full")

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
        setPatientMetaData({
            name: "Max Mustermann",
            patientId: params.patient_id || "",
            caseId: params.case_id || "",
            sex: "männlich",
            birthdate: faker.date.birthdate()
        });

        const rulesets: Ruleset[] = [
            {
                ruleset: "AKI",
                ampelStatus: AmpelStatus.YELLOW,
                message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData(),
                links: [{
                    displayText: "Deximed",
                    href: "#"
                }, {
                    displayText: "Labor",
                    href: "#"
                }]
            },
            {
                ruleset: "Anämie",
                ampelStatus: AmpelStatus.RED,
                message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData(),
                links: [{
                    displayText: "Deximed",
                    href: "#"
                }, {
                    displayText: "Labor",
                    href: "#"
                }]
            },
            {
                ruleset: "A fsdkfsfsdfsd",
                ampelStatus: AmpelStatus.RED,
                message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData(),
                links: [{
                    displayText: "Deximed",
                    href: "#"
                }, {
                    displayText: "Labor",
                    href: "#"
                }]
            },
            {
                ruleset: "B",
                ampelStatus: AmpelStatus.RED,
                message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData(),
                links: [{
                    displayText: "Deximed",
                    href: "#"
                }, {
                    displayText: "Labor",
                    href: "#"
                }]
            },
            {
                ruleset: "C",
                ampelStatus: AmpelStatus.GREEN,
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData()
            },
            {
                ruleset: "D",
                ampelStatus: AmpelStatus.GREEN,
                resultTime: faker.date.recent(),
                history: generateFakeHistoryData()
            },
            {
                ruleset: "E",
                ampelStatus: AmpelStatus.GREEN,
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
                        <div key={rs.ruleset}
                             className="w-full py-2 px-4 flex flex-row justify-between hover:rounded-md hover:bg-gray-50
                                items-baseline hover:text-violet-800">
                            <span className="w-3/5">{rs.ruleset}</span>
                            <div className="flex flex-row gap-x-2 text-gray-500 text-xs w-2/5 justify-end">
                                <span>festgestellt am:</span>
                                <span className="font-mono text-gray-400">{rs.resultTime.toLocaleString()}</span>
                            </div>
                        </div>
                    )
                    break;
            }
        });

        setRulesetsByStatus(rulesetsByStatus);
    }, []);

    return (
        patientMetaData && rulesetsByStatus &&
        <div className="w-full h-full">
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

                        <div className="flex flex-col gap-y-4">
                            <span className="text-lg text-gray-600">Unauffällige Zustände</span>
                            <div className="flex flex-col gap-y-5 mb-4">
                                {rulesetsByStatus.get(AmpelStatus.GREEN)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}