import { NextResponse } from 'next/server'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' })

export async function insertData(sent, recieved) {
    try {
        await sql`
        INSERT INTO anecdotes (id, text, initial_prompt, created_at)
        VALUES (${recieved.id}, ${recieved.output_text}, ${sent}, ${recieved.created_at})
        `
        return NextResponse.json({ success: true })
    } catch (err) {
        console.log (err)
        return NextResponse.json({ error: err }, { status: err.status })
    }
}