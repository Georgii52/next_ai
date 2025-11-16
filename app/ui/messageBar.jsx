
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
                <span className="text-sm blur-sm">Переходи по&nbsp;
                    <a href="" target="_blank" className="
                    text-blue-600 underline
                    hover:text-blue-800
                    visited:text-blue-400/80
                    transition-all duration-200">ссылке</a>
                    <span className="text-black/30 text-sm">&nbsp;(кликабельно)</span>
                </span>
            </div>
        </div>
    )
}