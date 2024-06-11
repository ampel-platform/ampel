import {Metadata} from "next";

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

    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: 'AMPEL Status - Historie',
            },
        },
        responsive: true,
        scales: {
            y: {
                stacked: true,
            },
        },
    };

    const chartData = {
        labels: ["grün, gelb, rot"],
        datasets: [

        ]
    };

    return (
        <div className="w-full max-w-screen-xl flex flex-col gap-y-6">
            <div className="flex flex-row justify-between items-baseline">
                <span className="text-3xl font-semibold text-gray-800">Max Mustermann</span>
                <div className="flex flex-row gap-x-4">
                    <span className="text-gray-700">Patientennummer: {params.patient_id}</span>
                    <span className="text-gray-700">Fallnummer: {params.case_id}</span>
                </div>
            </div>

            <div>
            </div>

            <hr className=""/>

            <div className="flex flex-row gap-x-4">
                <div className="w-full flex flex-col items-start">
                    <div className="flex flex-row gap-x-2">
                        <span>Kritische Zustände</span>
                        <span className="rounded-l-md rounded-r-md px-3 bg-rose-200 text-rose-800">1</span>
                    </div>
                </div>
                <div className="w-full flex flex-col items-start">
                    <div className="flex flex-row gap-x-2">
                        <span>Warnende Zustände</span>
                        <span className="rounded-l-md rounded-r-md px-3 bg-amber-100 text-amber-800">2</span>
                    </div>
                </div>
            </div>

            <hr className=""/>
        </div>
    );
}