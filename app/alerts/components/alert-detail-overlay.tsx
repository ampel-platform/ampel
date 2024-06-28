import {AlertDetails, AlertType, Link, RulesetHistory} from "../types";
import AlertPing from "./alert-ping";
import {Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

type OverlayProps = {
    data: AlertDetails
    onClose: () => any
}

function OverlayBackNavigation({onClick}: { onClick: () => any }) {
    return (
        <div className="flex flex-row">
            <a href="#"
               className="flex flex-row gap-x-2 items-center text-gray-600 hover:text-violet-800"
               onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path fillRule="evenodd"
                          d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z"
                          clipRule="evenodd"/>
                </svg>
                <span>zurück zur Alarmübersicht</span>
            </a>
        </div>
    );
}

function AlertHeader({name, type}: { name: string, type: AlertType }) {
    return (
        <div className="flex flex-row gap-x-4 items-center">
            <AlertPing type={type}/>
            <span className="font-medium text-xl text-violet-800">{name}</span>
        </div>
    );
}

function HintMessage({message}: { message: string | null }) {
    return (
        message &&
        <div className="flex flex-col gap-y-4">
            <span className="font-medium text-gray-600">Hinweis</span>
            <span className="text-gray-600">{message}</span>
        </div>
    );
}

function AlertLinks({links}: { links: Link[] }) {
    let additionalLinks = links.map(l => {
        return (
            <a className="px-4 py-3 rounded-md border border-solid border-gray-200 text-violet-800 hover:bg-violet-100"
               href={l.href}>
                <div className="flex flex-row gap-x-2 items-center">
                    <span>{l.displayText}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                        <path
                            d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"/>
                        <path
                            d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"/>
                    </svg>
                </div>
            </a>
        )
    });

    return (
        <div className="flex flex-col gap-y-4">
            <span className="font-medium text-gray-600">Weiterführende Links</span>
            <div className="flex flex-row gap-x-2">
                {additionalLinks}
            </div>
        </div>
    );
}

function AlertHistory({history}: { history: RulesetHistory }) {

    const transformedData = history.data
        .sort((a, b) => {
            if (a.date.getTime() === b.date.getTime()) {
                return 0;
            } else if (a.date.getTime() < b.date.getTime()) {
                return -1;
            } else {
                return 1;
            }
        })
        .map((h) => {
            return {
                date: h.date.toLocaleString(),
                analyteValue: h.analyteValue,
                ampelStatus: h.ampelStatus
            }
        });

    return (
        <div className="flex flex-col gap-y-4">
            <span className="font-medium text-gray-600">Alarmhistorie</span>
            <ResponsiveContainer width="100%" aspect={4}>
                <ComposedChart
                    width={500}
                    height={400}
                    data={transformedData}
                >
                    <CartesianGrid stroke="#f5f5f5"/>
                    <XAxis dataKey="date"/>
                    <YAxis yAxisId="left" dataKey="ampelStatus"/>
                    <YAxis yAxisId="right" dataKey="analyteValue" orientation="right"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar name="Ampelstatus" yAxisId="left" dataKey="ampelStatus" fill="rgba(91, 33, 182, 0.4)"/>
                    <Line name="Leitanalyt" yAxisId="right" dataKey="analyteValue" stroke="rgba(157, 23, 77, 1)"/>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

export default function AlertDetailOverlay({data, onClose}: OverlayProps) {
    return (
        data &&
        <div className="flex flex-col gap-y-4 bg-white">
            <OverlayBackNavigation onClick={onClose}/>
            <div className="px-6">
                <div className="flex flex-col gap-y-8">
                    <AlertHeader name={data.ruleset} type={data.ampelStatus}/>

                    <div className="grid grid-cols-2 gap-x-12">
                        <HintMessage message={data.message}/>
                        <AlertLinks links={data.links}/>
                    </div>

                    <AlertHistory history={data.rulesetHistory}/>
                </div>
            </div>
        </div>
    );
}