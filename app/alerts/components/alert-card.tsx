'use client';

import {AlertType} from "../types";
import AlertPing from "./alert-ping";

type Props = {
    title: string,
    message?: string,
    creationTime: Date,
    type: AlertType,
    onClick: () => any
}

export default function AlertCard({title, message, creationTime, type, onClick}: Props) {
    return (
        <div className="rounded-md flex flex-col border border-solid border-gray-200 relative overflow-visible
                        hover:cursor-pointer"
             onClick={onClick}
        >
            <div className="absolute -right-2 -top-2">
                <AlertPing type={type}/>
            </div>
            <div className="flex flex-col gap-y-2 w-full py-3 px-4">
                <span className="font-medium text-lg text-violet-800">{title}</span>
                {message &&
                    <span className="line-clamp-3 text-gray-700">
                        <div dangerouslySetInnerHTML={{__html: message}}/>
                    </span>
                }
                <div className="flex flex-row gap-x-2 text-gray-400 text-xs justify-end ">
                    <span>festgestellt am:</span>
                    <span className="font-mono">{creationTime.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}