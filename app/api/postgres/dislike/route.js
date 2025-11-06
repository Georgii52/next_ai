import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.POSTGRES_URL, { ssl: 'require' })

export async function POST(req) {
  try {
    const { id } = await req.json()
    const data = await sql`
      UPDATE anecdotes
      SET dislikes = dislikes + 1
      WHERE id = ${id}
      RETURNING *
    `
    return NextResponse.json({ success: true, data: data[0] })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}