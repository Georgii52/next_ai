import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.POSTGRES_URL, { ssl: 'require' })

export async function GET() {
    try {
        const data = await sql `
        SELECT * FROM anecdotes
        ORDER BY created_at DESC
        `
        return NextResponse.json({ success: true, data: data })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })        
    }
}