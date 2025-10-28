import { NextResponse } from "next/server";
import OpenAi from 'openai'

const openai = new OpenAi ({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST (req) {
    try {
        const { text } = await req.json()

        const response = await openai.responses.create ({
            model: 'gpt-5-nano',
            input: `Придумай анекдот с этими словами: ${text}. Можешь ответить только текстом анекдота.`
        })
        console.log (response)
        const message = response.output_text

        return NextResponse.json ({ reply: message }) || `Нет ответа`
    } catch (err) {
        console.error (`Ошибка в запросе: ${err}`)
        return NextResponse.json ({ err: "Ошибка в запросе"}, { status: 500})
    }
}