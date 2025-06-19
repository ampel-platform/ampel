import { AlertType } from "../types";

type Props = {
    type: AlertType
}

export default function AlertPing({ type }: Props) {
    const color = type === AlertType.Warning ? "bg-amber-200" : "bg-rose-300";

    return (
        <span className="relative flex h-4 w-4">
            <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color}`}></span>
            <span className={`relative inline-flex rounded-full h-4 w-4 ${color}`}></span>
        </span>
    );
}