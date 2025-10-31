import { ThumbsUp, ThumbsDown, Loader } from 'lucide-react'
import { refresh } from 'next/cache'
import { useState } from 'react'

export default function Table ({ data, onRefresh }) {

    const [liked, setLiked] = useState (new Set())
    const [disliked, setDisliked] = useState(new Set())
    const [loadingId, setLoadingId] = useState(null)

    const toggleLike = async (item) => {
        if (loadingId===item.id) return
        setLoadingId(item.id)
        const newLiked = new Set(liked)
        const newDisliked = new Set(disliked)
        let endpoint = '/api/postgres/like'

        if (newLiked.has(item.id)) {
            newLiked.delete(item.id)
            endpoint = '/api/postgres/unlike'
        } else {
            newLiked.add(item.id)
            newDisliked.delete(item.id)
        }
        setLiked(newLiked)
        setDisliked(newDisliked)

        await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: item.id }),
        })
        onRefresh && onRefresh()
        setLoadingId(null)
    }

    const toggleDislike = async (item) => {
        if (loadingId===item.id) return
        setLoadingId(item.id)
        const newLiked = new Set(liked)
        const newDisliked = new Set(disliked)
        let endpoint = '/api/postgres/dislike'

        if (newDisliked.has(item.id)) {
            newDisliked.delete(item.id)
            endpoint = '/api/postgres/undislike'
        } else {
            newDisliked.add(item.id)
            newLiked.delete(item.id)
        }
        setLiked(newLiked)
        setDisliked(newDisliked)

        await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: item.id }),
        })
        onRefresh && onRefresh()
        setLoadingId(null)
    }

    return (
        <div className="
        flex flex-col
        w-full px-6
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
                    <p className="m-2 max-w-[80%]">{item.text}</p>
                    <div className="
                    flex flex-row justify-center items-center
                    gap-2
                    ">
                        <button onClick={()=>toggleLike(item)} className="
                        flex flex-row gap-1 justify-center items-center
                        cursor-pointer
                        transition-all ease-in-out duration-300
                        active:scale-110
                        ">
                            <ThumbsUp className={`
                            transition-all ease-in-out duration-300
                            ${liked.has(item.id)
                            ?'text-green-600 fill-green-600'
                            :'text-green-600 fill-transparent hover:text-green-700'}
                            `} size={24}/>{item.likes}
                        </button>
                        <button onClick={()=>toggleDislike(item)} className="
                        flex flex-row gap-1 justify-center items-center
                        cursor-pointer
                        transition-all ease-in-out duration-300
                        active:scale-110
                        ">
                            <ThumbsDown className={`
                            transition-all ease-in-out duration-300
                            ${disliked.has(item.id)
                            ?'text-red-700 fill-red-700'
                            :'text-red-700 fill-transparent hover:text-red-600'}
                            `}
                            size={24}/>{item.dislikes}
                        </button>
                    </div>
                </div>
            )
        ))}
            </div>
        </div>
    )
}