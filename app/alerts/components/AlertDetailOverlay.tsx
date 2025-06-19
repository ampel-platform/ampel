import { AlertDetails, AlertType, AmpelStatus, Link, RulesetHistory } from "../types";
import AlertPing from "./AlertPing";
import {

    CartesianGrid,

    ComposedChart,

    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import StatusIcon from "./StatusIcon";
import StatusLegend from "./StatusLegend";

type OverlayProps = {
    data: AlertDetails
    onClose: () => any
}

function OverlayBackNavigation({ onClick }: { onClick: () => any }) {
    return (
        <div className="flex flex-row">
            <a href="#"
                className="flex flex-row gap-x-2 items-center text-gray-600 hover:text-violet-800"
                onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path fillRule="evenodd"
                        d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z"
                        clipRule="evenodd" />
                </svg>
                <span>zurück zur Alarmübersicht</span>
            </a>
        </div>
    );
}

function AlertHeader({ name, type }: { name: string, type: AlertType }) {
    return (
        <div className="flex flex-row gap-x-4 items-center">
            <AlertPing type={type} />
            <span className="font-medium text-xl text-violet-800">{name}</span>
        </div>
    );
}

function HintMessage({ message }: { message?: string }) {
    return (
        message &&
        <div className="flex flex-col gap-y-4">
            <span className="font-medium text-gray-600">Hinweis</span>
            {message &&
                <span className="text-gray-600">
                    <div dangerouslySetInnerHTML={{ __html: message }} />
                </span>
            }
        </div>
    );
}

function AlertLinks({ links }: { links: Link[] }) {
    let additionalLinks = links.map(l => {
        return (
            <a className="px-4 py-3 rounded-md border border-solid border-gray-200 text-violet-800 hover:bg-violet-100"
                href={l.href} target="_blank">
                <div className="flex flex-row gap-x-2 items-center">
                    <span>{l.displayText}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                        <path
                            d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
                        <path
                            d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
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

function AlertHistory({ history }: { history: RulesetHistory }) {

    const convertAmpelStatusToFillColor = (status: AmpelStatus): string => {
        switch (status) {
            case AmpelStatus.RED:
                return "rgba(251, 207, 232, 0.7)"
            case AmpelStatus.YELLOW:
                return "rgba(254, 243, 199, 0.7)"
            case AmpelStatus.GREEN:
                return "rgba(243, 244, 246, 0.7)"
        }
    }

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
                ampelStatus: h.ampelStatus,
                ampelStatusFillColor: convertAmpelStatusToFillColor(h.ampelStatus)
            }
        });

    const mr = 1;

    return (
        <div className="flex flex-col gap-y-4 ">
            <span className="font-medium text-gray-600">Leitanalyt</span>
            <ResponsiveContainer width="100%" aspect={4}>
                <ComposedChart
                    width={500}
                    height={400}
                    data={transformedData}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />
                    {/*<Legend />
                     <Bar name="Ampelstatus" yAxisId="status" dataKey="ampelStatus">
                        {
                            transformedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.ampelStatusFillColor}/>
                            ))
                        }
                    </Bar> */}
                    <Line
                        name="Leitanalyt"
                        yAxisId="value"
                        dataKey="analyteValue"
                        stroke="rgba(91, 33, 182, 0.7)"
                        dot={(props) => {
                            const { index } = props;
                            const isLastPoint = index === transformedData.length - 1;
                            const ampelStatus = props.points[index].payload.ampelStatus;

                            if (isLastPoint) {
                                return (
                                    <>
                                        <circle
                                            cx={props.cx - 1}
                                            cy={props.cy - 12}
                                            r={5}
                                            fill={ampelStatus == 1 ? "red" : "white"}
                                            stroke="black"
                                            strokeWidth={1} />
                                        <polygon

                                            points={`${props.cx - mr},${props.cy - 5 - mr} ${props.cx - 6 - mr},${props.cy + 6 - mr} ${props.cx + 6 - mr},${props.cy + 6 - mr}`}
                                            fill={ampelStatus == 2 ? "yellow" : "white"}
                                            stroke="black"
                                            strokeWidth={1}
                                        />
                                        <rect
                                            x={props.cx - 7}
                                            y={props.cy + 8}
                                            width={11}
                                            height={11}
                                            fill={ampelStatus == 3 ? "limegreen" : "white"}
                                            stroke="black"
                                            strokeWidth={1}
                                        />
                                    </>
                                );
                            } else {
                                return (
                                    <StatusIcon ampelStatus={ampelStatus} cx={props.cx} cy={props.cy} index={index} />
                                );
                            }
                        }} />
                    <XAxis dataKey="date" label={{ value: "Datum", position: "insideBottomRight", offset: -5 }} />
                    {/* <YAxis yAxisId="status" dataKey="ampelStatus" orientation="right" hide={true} /> */}
                    <YAxis yAxisId="value" dataKey="analyteValue" label={{ value: "μl/mol", angle: 45, position: "insideLeft" }} />
                </ComposedChart>
            </ResponsiveContainer >



        </div>
    );
}

export default function AlertDetailOverlay({ data, onClose }: OverlayProps) {
    return (
        data &&
        <div className="h-full flex flex-col gap-y-4 bg-white">
            <OverlayBackNavigation onClick={onClose} />
            <div className="px-6">
                <div className="flex flex-col gap-y-8">
                    <AlertHeader name={data.ruleset} type={data.ampelStatus} />

                    <div className="grid grid-cols-2 gap-x-12">
                        <HintMessage message={data.message} />
                        <div className="flex items-center justify-between gap-4">
                            <AlertLinks links={data.links} />
                            <StatusLegend />
                        </div>
                    </div>

                    <AlertHistory history={data.rulesetHistory} />
                </div>
            </div>
        </div>
    );
}