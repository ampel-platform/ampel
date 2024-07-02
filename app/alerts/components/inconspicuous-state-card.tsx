type Props = {
    title: string,
    description: string,
    creationTime: Date
}

export default function InconspicuousStateCard({title, description, creationTime}: Props) {
    return (
        <div className="rounded-md flex flex-col border border-solid border-gray-200"
        >
            <div className="flex flex-col gap-y-2 w-full py-3 px-4">
                <span className="font-medium text-lg text-gray-500 line-clamp-1">{title}</span>
                <span className="line-clamp-3 text-gray-400">{description}</span>
                <div className="flex flex-row gap-x-2 text-gray-400 text-xs justify-end ">
                    <span>festgestellt am:</span>
                    <span className="font-mono">{creationTime.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}