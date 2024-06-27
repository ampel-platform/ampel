'use client';

type Props = {
    title: string,
    message: string | null,
    creationTime: Date,
    color: "red" | "yellow",
    onClick: () => any
}

export default function AlertCard({title, message, creationTime, color, onClick}: Props) {
    let pingColor = color === "red" ? "bg-rose-300" : "bg-amber-200";
    let bgColor = color === "red" ? "bg-rose-300" : "bg-amber-200";
    let borderColor = color === "red" ? "border-gray-200" : "border-gray-200";

    return (
        <div className={`rounded-md flex flex-col border border-solid ${borderColor} relative overflow-visible
                        hover:cursor-pointer`}
             onClick={onClick}
        >
            <div className="absolute -right-2 -top-2">
                <span className="relative flex h-4 w-4">
                    <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pingColor}`}></span>
                    <span className={`relative inline-flex rounded-full h-4 w-4 ${bgColor}`}></span>
                </span>
            </div>
            <div className="flex flex-col gap-y-2 w-full py-3 px-4">
                <span className="font-medium text-lg text-violet-800">{title}</span>
                <p className="line-clamp-3 text-gray-700">{message}</p>
                <div className="flex flex-row gap-x-2 text-gray-400 text-xs justify-end ">
                    <span>festgestellt am:</span>
                    <span className="font-mono">{creationTime.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}