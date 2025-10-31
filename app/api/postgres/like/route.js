import { NextResponse } from 'next/server'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' })

export async function POST(req) {
  try {
    const { id } = await req.json()
    const data = await sql`
      UPDATE anecdotes
      SET likes = likes + 1
      WHERE id = ${id}
      RETURNING *
    `
    return NextResponse.json({ success: true, data: data[0] })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}