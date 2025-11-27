
export default function MessageBar() {

    return (    
        <div className="
        flex flex-col flex-wrap
        items-center justify-center
        text-lg
        ">
            <div className="
            flex flex-col flex-wrap
            items-center justify-center
            bg-gray-200/90
            rounded-4xl
            px-8 py-1
            shadow-md
            hover:translate-y-[-3px]
            transition
            ">
                <p className="">У нас скоро новый функционал!</p>
            </div>
        </div>
    )
}