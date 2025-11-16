'use client'
import { useEffect, useState } from "react"
import { Send, Loader2, Eraser, } from 'lucide-react'
import { Analytics } from '@vercel/analytics/next'


export default function Home() {
  const [file, setFile] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const hadleDragLeave = () => {
    setIsDragging(false)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = Array.from(e.dataTransfer.file)
    setFile (droppedFile)
    // dropApi route
  }
  
  return (
    <main className= "flex flex-col items-center justify-center min-h-screen px-6">
      <div className="flex flex-col bg-red-200 flex-wrap items-center justify-center p-5 min-h-[50vh] w-full">
        <h1 className="text-white">Добавь кота на фото</h1>
          <input type="file" className="bg-red-100 border border-dashed"></input>
        
      </div>
      <Analytics />
    </main>
  )
}
