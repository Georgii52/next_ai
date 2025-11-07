import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export function Dialogue ({ outputValue, response, loadingResponse }) {

    const [outputStream, setOutputStream] = useState('')
    const [responseStream, setResponseStream] = useState('')

    useEffect(() => {
        if (!outputValue) return;
        const text = String(outputValue)
        let isCancelled = false

        async function streamText () {
            setOutputStream('') 
            for (let char in text) {
                if(isCancelled) break
                setOutputStream(prev => prev + text[char])
                await new Promise(resolve => setTimeout(resolve, 40))
            }
        }
        streamText()
        return ()=>{isCancelled=true}
        }, [outputValue])

    useEffect(() => {
        if (!response) return
        const text = String(response)
        console.log (text)
        let isCancelled = false

        async function streamText () {
            setResponseStream('')
            for (let char in text) {
                if(isCancelled) break
                setResponseStream(prev => prev + text[char])
                await new Promise(resolve => setTimeout(resolve, 40))
            }
        }
        streamText()
        return () => {isCancelled=true}
    }, [response])

    return(
        <div className="
        flex flex-col flex-wrap
        w-full px-4
        md:w-192
        ">
            <div className="
            flex flex-col flex-wrap justify-between
            bg-sky-200/70 px-4 py-6 w-full
            rounded-4xl
            gap-4
            ">
                {!outputValue ? (<div className="
                flex flex-row flex-wrap justify-center items-center
                bg-gray-200/90 text-black
                p-4 ml-auto rounded-4xl rounded-br-none
                min-w-[20%]
                max-w-[85%] shadow-lg
                break-all whitespace-pre-wrap
                transition-all duration-500
                ">
                    <span className="animate-pulse">Ждём ввод</span>
                </div>
                ):
                (<div className="
                flex flex-row flex-wrap justify-center items-center
                bg-gray-200/90 text-black
                p-4 ml-auto rounded-4xl rounded-br-none
                min-w-[20%]
                max-w-[85%] shadow-lg
                break-all whitespace-pre-wrap
                ">
                    <span className="">{outputStream}</span>
                </div>)}
                {loadingResponse ? (<div className="
                transition-all duration-700 ease-in-out
                flex flex-row flex-wrap justify-center items-center
                bg-gray-200/90 text-black
                p-4 mr-auto rounded-4xl rounded-bl-none
                min-w-[40%]
                max-w-[85%] shadow-lg
                break-all whitespace-pre-wrap
                ">
                    <span className="flex items-center gap-2">
                        <span className="typing">Думаем над ответом</span>
                    </span>
                </div>
                ):
                response ? (<div className="
                transition-all duration-1000 ease-in-out
                flex flex-row flex-wrap justify-center items-center
                bg-gray-200/90 text-black
                p-4 mr-auto rounded-4xl rounded-bl-none
                min-w-[20%]
                max-w-[85%] shadow-lg
                break-all whitespace-pre-wrap
                ">
                    <span className="p-1">{responseStream}</span>
                </div>) : <></>}
            </div>
        </div>
    )
}