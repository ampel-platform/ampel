'use client';

type Props = {
    title: string,
    message: string | null,
    creationTime: Date,
    color: "red" | "yellow"
}

export default function AlertCard({title, message, creationTime, color}: Props) {
    let pingColor = color === "red" ? "bg-rose-300" : "bg-amber-300";
    let bgColor = color === "red" ? "bg-rose-400" : "bg-amber-400";
    let borderColor = color === "red" ? "border-rose-400" : "border-amber-400";

    return (
        <div className={`rounded-md flex flex-col border border-solid ${borderColor} relative overflow-visible
                        hover:cursor-pointer`}
             onClick={() => console.log("click registered")}
        >
            <div className="absolute -right-2 -top-2">
                <span className="relative flex h-4 w-4">
                    <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pingColor}`}></span>
                    <span className={`relative inline-flex rounded-full h-4 w-4 ${bgColor}`}></span>
                </span>
            </div>
            <div className="flex flex-col gap-y-2 w-full p-2">
                <span className="font-semibold text-lg">{title}</span>
                <p className="line-clamp-3">{message}</p>
                <div className="flex flex-row gap-x-2 text-gray-400 text-xs justify-end ">
                    <span>festgestellt am:</span>
                    <span className="font-mono">{creationTime.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}