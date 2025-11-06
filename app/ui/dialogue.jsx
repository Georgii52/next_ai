import { useEffect, useState } from "react"

export function Dialogue ({ outputValue, response }) {

    const [outputStream, setOutputStream] = useState('')
    const [responseStream, setResponseStream] = useState('')

    useEffect(() => {
        if (!outputValue) return
        setOutputStream('')
        const chars = Array.from(String(outputValue))
        let i=0;
        const interval = setInterval(()=>{
            if (i < chars.length) {
                setOutputStream((prev) => prev + chars[i])
                i++
            } else {
                clearInterval(interval)
            }
        }, 50)
        return () => clearInterval(interval)
    }, [outputValue])

    useEffect(() => {
  if (!response) return
  const chars = Array.from(String(response))
  setResponseStream('')
  let i = 0
  const interval = setInterval(() => {
    if (i < chars.length) {
      setResponseStream(prev => prev + chars[i])
      i++
    } else {
      clearInterval(interval)
    }
  }, 30)
  return () => clearInterval(interval)
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
                <div className="
                flex flex-row flex-wrap justify-center items-center
                bg-gray-200/90 text-black
                p-4 ml-auto rounded-4xl rounded-br-none
                min-w-[20%]
                max-w-[85%] shadow-lg
                break-words whitespace-pre-wrap
                ">
                    <p className="p-1">{outputStream}</p>
                </div>
                <div className="
                flex flex-row flex-wrap justify-center items-center
                bg-gray-200/90 text-black
                p-4 mr-auto rounded-4xl rounded-bl-none
                min-w-[20%]
                max-w-[85%] shadow-lg
                break-words whitespace-pre-wrap
                ">
                    <p className="p-1">{responseStream}В лаборатории на столе лежит кнопка с надписью «Кнопка». Учёный говорит ассистенту: «Нажми — начнём эксперимент». Ассистент нажимает. Ничего не происходит. Через секунду экран: «Не нажимай меня слишком часто — я устала». Все смеются: кнопка устала от кликов и просит работать по расписанию.</p>
                </div>
            </div>
        </div>
    )
}