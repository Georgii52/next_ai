
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' })

export default async function insertData (sent, recieved) {
    await sql`
    INSERT INTO anecdotes (id, text, initial_prompt, created_at)
    VALUES (${recieved.id}, ${recieved.output_text}, ${sent}, ${recieved.created_at})
    `
}