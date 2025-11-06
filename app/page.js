'use client'
import { useEffect, useState } from "react"
import { Send, Loader2, Eraser, } from 'lucide-react'
import { Analytics } from '@vercel/analytics/next'
import Table from "./ui/table";
import { Dialogue } from "./ui/dialogue";

export default function Home() {
  const [data, setData] = useState([])
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = ()=> {
    setOutputValue(inputValue)
    
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
      setData (data.data)
      } catch (err) {
        console.error (`Ошибка: ${err}`)
      } finally {
        setLoading(false)
      }
  }

  const sendToAi = async () => {
    setLoading (true)
    setResponse ('')
    if (inputValue === '') {
      setLoading (false)
      return
    } else {
      try {
        const res = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text:inputValue })
        })
        const data = await res.json()
        setResponse(data.reply || `Status: ${data.status}, ${data.err} `)
      } catch (err) {
          console.error (err)
          setResponse (`Ошибка при запросе`)
      } finally {
        setLoading (false)
      }
    }
}
  useEffect (() => {
    fetchData()
  }, [])

  return (
    <main className= "flex flex-col items-center justify-center min-h-screen gap-4 mt-24">
      <h1 className="text-2xl font-semibold text-white">Генератор анекдотов</h1>
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
          outline-none transition-all duration-500 ease-in-out
          hover:border-sky-300 focus:border-sky-300
          hover:ring-2 focus:ring-2
          hover:ring-sky-200 focus:ring-sky-200 
          hover:ring-opacity-60 focus:ring-opacity-60
          "
        />
        <button
          onClick={()=>{
            handleSubmit()
            // sendToAi()
          }}
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
          className="
          bg-red-400 text-white px-4 rounded-xl cursor-pointer
          mr-4
          hover:bg-red-500
          transition-all ease-in-out duration-300"
          >
          <Eraser className="" size={18} />
          </button> 
        </div>
        <Dialogue outputValue={outputValue} response={response}/>
        
      
        <div className="flex flex-row w-full md:w-192">
          <p className="text-white text-lg whitespace-pre-wrap break-words m-5"></p>
        </div>
      
      <Table data={data} onRefresh={fetchData}/>
      <Analytics />
    </main>
  )
}
