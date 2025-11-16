'use client'
import { useEffect, useState, useRef } from "react"
import { Send, Loader2, Eraser, MessageSquare, ArrowBigUpDash, Construction } from 'lucide-react'
import { Analytics } from '@vercel/analytics/next'
import Table from "./ui/table";
import { Dialogue } from "./ui/dialogue";
import MessageForm from "./ui/messageForm";

export default function Home() {
  const [data, setData] = useState([])
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingResponse, setLoadingResponse] = useState(false)
  const targetRef = useRef(null)

  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }

  const handleSubmit = ()=> {
    setOutputValue(inputValue)
    setInputValue('')
  }

  const handleClear = () => {
    setOutputValue ('')
    setInputValue('')
    setResponse('')
  }

  const fetchData = async () => {
    setLoading (true)
    try{
      const res = await fetch ('/api/postgres', {
        method: 'GET',
        headers: { 'Content-Type':'application/json' }
        })
      const data = await res.json()
      setData (data.data ?? [])
      } catch (err) {
        console.error (`Ошибка: ${err}`)
      } finally {
        setLoading(false)
      }
  }

  const sendToAi = async () => {
    setLoading (true)
    setLoadingResponse(true)
    setResponse ('')
    if (inputValue === '') {
      alert ('Пожалуйста, введите что-то')
      setLoading (false)
      setLoadingResponse(false)
      return
    } else {
      try {
        const res = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: inputValue })
        })
        const data = await res.json()
        setResponse(data.reply || `Status: ${data.status}, ${data.err} `)
      } catch (err) {
          console.error (err)
          setResponse (`Ошибка при запросе`)
      } finally {
        setLoading (false)
        setLoadingResponse (false)
      }
    }
}
  useEffect (() => {
    fetchData()
  }, [])
  useEffect (() => {
    fetchData()
  }, [response])

  return (
    <main className= "flex flex-col items-center justify-center min-h-screen my-8 gap-3 my-4">
      <button onClick={handleScrollTop} className="
      fixed bottom-6 right-6 z-50
      bg-gray-200 rounded-full
      p-2 shadow-lg
      transition-transform duration-200 ease-out
      hover:bg-gray-300 hover:translate-y-[-3px]
      cursor-pointer"><ArrowBigUpDash size={28}/></button>
      <div className="flex items-center justify-between w-full px-4 md:w-192 text-2xl font-semibold text-white">
        <h1 className="ml-2">Генератор анекдотов</h1>
        <button onClick={handleScroll} className="
          ml-auto
          bg-green-600 text-white p-4 rounded-xl cursor-pointer
          hover:bg-green-500
          transition-all ease-in-out duration-300"><MessageSquare className='fill-transparent hover:fill-white transition duration-200' size={18} /></button>
      </div>
      <div className="flex flex-row w-full md:w-192">
        <input 
          type="text"
          value={inputValue}
          onChange={(e)=> setInputValue(e.target.value)}
          placeholder="Напишите что-то..."
          className="
          text-black
          bg-white border border-white rounded-xl w-full p-3
          ml-5 
          outline-none transition-all duration-300 ease-in-out
          hover:border-sky-300 focus:border-sky-300
          hover:ring-4 focus:ring-2
          hover:ring-sky-600 focus:ring-sky-200 
          hover:ring-opacity-60 focus:ring-opacity-60
          "
        />
        <button
          onClick={()=>{
            handleSubmit()
            sendToAi()
          }}
          title='Отправить'
          disabled={loading}
          className="
          bg-blue-500 text-white px-4 rounded-xl cursor-pointer
          ml-2 mr-2
          hover:bg-blue-600
          transition-all ease-in-out duration-300
          disabled:bg-blue-200 disabled
          disabled:cursor-not-allowed"
          >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        </button>
        <button
          onClick={()=>handleClear()}
          title='Очистить всё'
          className="
          bg-red-400 text-white px-4 rounded-xl cursor-pointer
          mr-4
          hover:bg-red-500
          transition-all ease-in-out duration-300"
          >
          <Eraser size={18} />
          </button> 
      </div>
      <Dialogue outputValue={outputValue} response={response} loadingResponse={loadingResponse}/>
      <Table data={data} onRefresh={fetchData}/>
      <Analytics />
      <div className="w-full flex flex-col items-center justify-center">
        <p className="
        text-black rounded-4xl p-4 text-xl
        absolute z-50
        flex flex-row gap-2 items-center
        bg-gray-200/90
        "><Construction className='text-orange-400' size={34}/>
        Work in progress
        <Construction className='text-orange-400' size={34}/>
        </p>
        <div ref={targetRef} className="blur-xl w-full">
          <MessageForm />
        </div>
      </div>
    </main>
  )
}
