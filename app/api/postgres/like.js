
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' })

async function updateLik (unit) {
    const data = await sql `
    UPDATE anecdotes
    SET likes = likes + 1
    WHERE id = ${unit.id}
    RETURNING *
    `
    return data[0]
}

export async function updateLikes (){
    try {
        return Response.json(await updateLik(unit))
    } catch (err) {
        return Response.json({ err }, { status: 500 })
    }
}