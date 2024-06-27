import {faker} from "@faker-js/faker";
import AlertCard from "./components/alert-card";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {PatientMetaData, Ruleset} from "./types";
import PatientMetaDataHeader from "./components/patient-data-header";

export default function PatientAlerts() {
    const params = useParams();

    const [patientMetaData, setPatientMetaData] = useState(null as unknown as PatientMetaData);
    const [rulesets, setRulesets] = useState([] as Ruleset[]);

    useEffect(() => {
        if (params.patient_id !== undefined && params.case_id !== undefined) {
            setPatientMetaData({
                name: "Max Mustermann",
                patientId: params.patient_id,
                caseId: params.case_id,
                sex: "männlich",
                birthdate: faker.date.birthdate()
            });
        }

        setRulesets([
            {
                ruleset: "AKI",
                ampelStatus: "yellow",
                message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                resultTime: faker.date.recent()
            },
            {
                ruleset: "Anämie",
                ampelStatus: "red",
                message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                resultTime: faker.date.recent()
            },
            {
                ruleset: "A fsdkfsfsdfsd",
                ampelStatus: "red",
                message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                resultTime: faker.date.recent()
            },
            {
                ruleset: "B",
                ampelStatus: "red",
                message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                resultTime: faker.date.recent()
            },
            {
                ruleset: "C",
                ampelStatus: "green",
                message: null,
                resultTime: faker.date.recent()
            },
            {
                ruleset: "D",
                ampelStatus: "green",
                message: null,
                resultTime: faker.date.recent()
            },
            {
                ruleset: "E",
                ampelStatus: "green",
                message: null,
                resultTime: faker.date.recent()
            }
        ])
    }, [params]);


    let greenStatus = rulesets.filter(rs => rs.ampelStatus === "green")
        .map((rs) => {
            return (
                <div key={rs.ruleset}
                     className="w-full py-2 px-4 flex flex-row justify-between hover:rounded-md hover:bg-gray-50
                                items-baseline hover:text-violet-800">
                    <span className="w-3/5">{rs.ruleset}</span>
                    <div className="flex flex-row gap-x-2 text-gray-500 text-xs w-2/5 justify-end">
                        <span>festgestellt am:</span>
                        <span className="font-mono text-gray-400">{rs.resultTime.toLocaleString()}</span>
                    </div>
                </div>
            );
        });

    let redStatus = rulesets.filter(rs => rs.ampelStatus === "red")
        .map((rs) => {
            return (
                <AlertCard
                    key={rs.ruleset}
                    title={rs.ruleset}
                    message={rs.message}
                    creationTime={rs.resultTime}
                    color="red"
                    onClick={() => console.log(`registered click on ${rs.ruleset}`)}
                />
            );
        });

    let yellowStatus = rulesets.filter(rs => rs.ampelStatus === "yellow")
        .map((rs) => {
            return (
                <AlertCard
                    key={rs.ruleset}
                    title={rs.ruleset}
                    message={rs.message}
                    creationTime={rs.resultTime}
                    color="yellow"
                    onClick={() => console.log(`registered click on ${rs.ruleset}`)}
                />
            );
        });


    return (
        patientMetaData &&
        <div className="w-full h-full">
            <div className="h-full flex flex-col gap-y-20">
                <PatientMetaDataHeader
                    name={patientMetaData.name}
                    patientId={patientMetaData.patientId}
                    caseId={patientMetaData.caseId}
                    sex={patientMetaData.sex}
                    birthdate={patientMetaData.birthdate}
                />

                <div className="h-full flex flex-col gap-y-20 relative">
                    <div className="flex flex-row gap-x-12">
                        <div className="w-full flex flex-col items-start gap-y-4">
                            <div className="flex flex-row gap-x-4 items-baseline">
                                <span className="text-lg text-gray-600">Kritische Zustände</span>
                                <span
                                    className="rounded-md px-3 bg-rose-100 text-rose-800 text-base">{redStatus.length}</span>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-3">
                                {redStatus}
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-start gap-y-4">
                            <div className="flex flex-row gap-x-4 items-baseline">
                                <span className="text-lg text-gray-600">Warnende Zustände</span>
                                <span
                                    className="rounded-md px-3 bg-amber-100 text-amber-800 text-base">{yellowStatus.length}</span>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-3">
                                {yellowStatus}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <span className="text-lg text-gray-600">Unauffällige Zustände</span>
                        <div className="flex flex-col gap-y-5 mb-4">
                            {greenStatus}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}