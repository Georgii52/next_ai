'use client'
import { useState } from "react"

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

  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <h1 className="text-2xl font-semibold">OpenAi API Тест</h1>
      <input 
        type="text"
        value={inputValue}
        onChange={(e)=> setInputValue(e.target.value)}
        placeholder="Введите промпт"
        className="border rounded-lg p-2 w-64 text-left"
      />
      <button 
        onClick={()=>{
          handleSubmit()
          sendToAi()
        }}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-200 disabled">
        {loading? 'Отправка...': 'Отправить'}
      </button>
      <button 
        onClick={()=>handleClear()}
        className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500">Очистить всё</button> 
      {outputValue && (
        <p className="mt-4 text-lg text-gray-700">
          Вы ввели: <span className="font-medium">{outputValue}</span>
        </p>
      )}
      {response && (
        <p className="flex px-64 mt-4 text-lg text-gray-700 whitespace-pre-wrap text-center">{response}</p>
      )}
    </main>
  )
}
