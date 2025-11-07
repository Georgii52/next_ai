import { NextResponse } from "next/server";
import OpenAi from 'openai'
import { insertData } from "../postgres/insert/route";

const openai = new OpenAi ({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req) {
    try {
        const { text } = await req.json()

        const response = await openai.responses.create ({
            model:'gpt-5-nano',
            input: `Придумай анекдот с этими словами: ${text}. Можешь ответить только текстом анекдота.`
        })
        const message = response.output_text
        try {
           insertData (text, response)
           console.log ('DB OK')
        } catch (err) {
           console.error (err)
        }
        return NextResponse.json ({ reply: message })
    } catch (err) {
        console.log(err.error.message, err.status)
        return NextResponse.json ({ err: err.error.message, status: err.status })
    }
}