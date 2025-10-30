import { ThumbsUp, ThumbsDown, Loader } from 'lucide-react'

export default function Table ({ data, onRefresh }) {

    return (
        <div className="
        flex flex-col
        w-screen px-6
        flex-wrap
        "> <p className="flex flex-row align-center justify-center m-0 pb-1 text-2xl text-white">Наши Анекдоты:</p>
            <div className="
            flex flex-col flex-wrap
            text-white
            w-full
            bg-gray-400
            p-2
            rounded-4xl
            outline-none
        ">
            {data.length === 0 ? (<p className="
            flex
            bg-gray-300 text-black
            items-center
            justify-center
            rounded-4xl
            p-4 m-2
            text-lg
            ">Загружаем приколы...<Loader className='animate-spin m-2' size={28}/></p>):
            (
                data.map((item)=>(
                <div key={item.id} className="
                flex flex-row flex-wrap
                text-black whitespace-pre-wrap text-base
                items-center justify-between p-4 m-2
                bg-gray-300
                rounded-4xl
                transition-all duration-200 ease-in-out
                outline-none
                hover:bg-gray-200
                ">
                    <p className="m-2">Промпт: {item.initial_prompt}</p>
                    <p className="m-2">{item.text}</p>
                    <div className="
                    flex flex-row flex-wrap justify-center items-center
                    gap-2
                    m-2
                    ">
                        <button className="
                        flex flex-row gap-1 justify-center items-center
                        cursor-pointer
                        transition-all ease-in-out duration-300
                        
                        ">
                            <ThumbsUp className='text-green-600
                            hover:text-green-700
                            transition-colors ease-in-out duration-100
                            ' size={24}/>{item.likes}
                        </button>
                        <button className="
                        flex flex-row gap-1 justify-center items-center
                        cursor-pointer
                        transition-all ease-in-out duration-300
                        hover:
                        ">
                            <ThumbsDown className='text-red-600
                            hover:text-red-700
                            transition-colors ease-in-out duration-100' size={24}/>{item.dislikes}
                        </button>
                    </div>
                </div>
            )
        ))}
            </div>
        </div>
    )
}