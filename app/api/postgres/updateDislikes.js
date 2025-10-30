
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' })

async function updateDis (unit) {
    const data = await sql `
    UPDATE anecdotes
    SET dislikes = dislikes + 1
    WHERE id = ${unit.id}
    RETURNING *
    `
    return data
}

export async function updateDislikes () {
    try {
        return Response.json(await updateDis(unit))
    } catch (err) {
        return Response.json({ err }, { status: 500 })
    }
}