import { updateLikes } from "./updateLikes";
import { updateDislikes } from "./updateDislikes";
import { getAll } from "./route";

export async function POST(req) {
    try {
        const { id, action } = await req.json()
        getAll()
        let result

        if (action === 'like') result = await updateLikes(id)
        else if (action === 'dislike') result = await updateDislikes(id)
        else throw new Error ("Неизвестное действие")

        return Response.json(result)
    }catch (err) {
        console.error (`Возникла ошибка: ${err}`)
        return Response.json({ error: err.message }, { status: 500})
    }
}