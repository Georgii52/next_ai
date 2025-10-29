'use client'
import { useState } from "react"
import { Suspense } from "react";
import { Send, Loader2, Eraser } from 'lucide-react'

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = ()=> {
    setOutputValue(inputValue)
    setInputValue("")
  }

  const handleClear = () => {
    setOutputValue ('')
    setInputValue('')
    setResponse('')
  }

  const sendToAi = async () => {
    setLoading (true)
    setResponse ('')
    if (inputValue === '') {
      setResponse ('Пожалуйста, введите что-то')
      setLoading (false)
      return
    } else {
      try {
        const res = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: inputValue })
        })
        const data = await res.json()
        setResponse(data.reply || 'Нет Ответа')
      } catch (err) {
          console.error (err)
          setResponse (`Ошибка при запросе`)
      } finally {
        setLoading (false)
      }
    }
}

  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <h1 className="text-2xl font-semibold text-white">Генератор анекдотов</h1>
      <div className="flex flex-row w-full md:w-192">
        <input 
          type="text"
          value={inputValue}
          onChange={(e)=> setInputValue(e.target.value)}
          placeholder="Напишите что-то..."
          className="
          bg-white border border-white rounded-xl w-full p-3
          ml-5 mt-2 mb-5
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
            sendToAi()
          }}
          disabled={loading}
          className="
          bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer
          ml-2 mt-2 mr-5 mb-5
          hover:bg-blue-600
          transition-all ease-in-out duration-300
          disabled:bg-blue-200 disabled
          disabled: cursor-not-allowed"
          >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        </button>
      </div>
      <button 
        onClick={()=>handleClear()}
        className="flex flex-row items-center justify-center
        bg-red-400 text-white px-4 py-2 rounded-xl
        hover:bg-red-500
        transition-all ease-in-out duration-300 cursor-pointer"
        >
          Очистить <Eraser className="m-1" size={18} />
        </button> 
      {outputValue && (
        <p className="mt-4 text-lg text-white">
          Вы ввели: <span className="font-medium">{outputValue}</span>
        </p>
      )}
      {response && (
        <div className="flex flex-row w-full md:w-192">
          <p className="text-white text-lg whitespace-pre-wrap break-words m-5">{response}</p>
        </div>
      )}
    </main>
  )
}
