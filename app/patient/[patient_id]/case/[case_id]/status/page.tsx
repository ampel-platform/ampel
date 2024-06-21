import {Metadata} from "next";
import {faker} from "@faker-js/faker";
import AlertCard from "@/app/patient/[patient_id]/case/[case_id]/status/_components/alert-card";

type Props = {
    params: { patient_id: string, case_id: string }
}

/**
 * Sets the title for this page to include patient ID and case ID for easier identification.
 *
 * @param identifiers
 */
export async function generateMetadata({params}: Props): Promise<Metadata> {
    return {
        title: `AMPEL Status | Patient ${params.patient_id} - Fall ${params.case_id}`,
    }
}

export default function PatientCaseStatus({params}: Props) {
    let rulesets = [
        {
            ruleset: "AKI",
            ampelStatus: "yellow",
            message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            resultFrom: faker.date.recent()
        },
        {
            ruleset: "Anämie",
            ampelStatus: "red",
            message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            resultFrom: faker.date.recent()
        },
        {
            ruleset: "A fsdkfsfsdfsd",
            ampelStatus: "red",
            message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            resultFrom: faker.date.recent()
        },
        {
            ruleset: "B",
            ampelStatus: "red",
            message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            resultFrom: faker.date.recent()
        },
        {
            ruleset: "C",
            ampelStatus: "green",
            message: null,
            resultFrom: faker.date.recent()
        },
        {
            ruleset: "D",
            ampelStatus: "green",
            message: null,
            resultFrom: faker.date.recent()
        },
        {
            ruleset: "E",
            ampelStatus: "green",
            message: null,
            resultFrom: faker.date.recent()
        }
    ];

    let greenStatus = rulesets.filter(rs => rs.ampelStatus === "green")
        .map((rs) => {
            return (
                <div key={rs.ruleset}
                     className="w-full py-2 px-4 flex flex-row justify-between hover:rounded-md hover:bg-gray-50
                                items-baseline hover:text-violet-800">
                    <span className="w-3/5">{rs.ruleset}</span>
                    <div className="flex flex-row gap-x-2 text-gray-500 text-xs w-2/5 justify-end">
                        <span>festgestellt am:</span>
                        <span className="font-mono text-gray-400">{rs.resultFrom.toLocaleString()}</span>
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
                    creationTime={rs.resultFrom}
                    color="red"
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
                    creationTime={rs.resultFrom}
                    color="yellow"
                />
            );
        });


    return (
        <div className="w-full">
            <div className="flex flex-col gap-y-20">
                <div className="flex flex-col gap-y-2">
                    <span className="text-3xl font-medium text-gray-700">Max Mustermann</span>

                    <div className="grid grid-cols-4">
                        <span className="flex flex-row gap-x-2">
                            <span className="text-gray-600">Patientennummer</span>
                            <span className="text-violet-800">{params.patient_id}</span>
                        </span>
                        <span className="flex flex-row gap-x-2">
                            <span className="text-gray-600">Fallnummer</span>
                            <span className="text-violet-800">{params.case_id}</span>
                        </span>
                        <span className="flex flex-row gap-x-2">
                            <span className="text-gray-600">Geschlecht</span>
                            <span className="text-violet-800">männlich</span>
                        </span>
                        <span className="flex flex-row gap-x-2">
                            <span className="text-gray-600">Geburtsdatum</span>
                            <span className="text-violet-800">{faker.date.birthdate().toLocaleDateString()}</span>
                        </span>
                    </div>
                </div>

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
    );
}