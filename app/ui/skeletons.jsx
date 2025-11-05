export function TableSkeleton () {

    return (
        Array.from({ length: 5 }).map((_, i)=> (
        <div key={i} className="
            flex flex-row flex-wrap
            items-center justify-between p-4 m-2
            shimmer
            bg-gray-300 rounded-4xl
            
            ">
                <div className="
                min-w-[35%]
                max-w-[100%]
                p-3 m-2
                bg-gray-200/70
                rounded-4xl
                shadow-sm">
                </div>
                <div className="
                w-[100%]
                p-3 m-2 h-40
                bg-gray-200/70
                rounded-4xl
                shadow-sm">
                </div>
                <div></div>
        </div>
        ))
    )
}