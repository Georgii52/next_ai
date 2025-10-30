import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' })

async function getData () {
    const data = await sql`
    SELECT * FROM anecdotes
    ORDER BY created_at DESC
    `
    return data
}
export async function GET() {
    try {
        return Response.json(await getData())
    } catch (err) {
        return Response.json({ err }, { status: 500 })
    }
}