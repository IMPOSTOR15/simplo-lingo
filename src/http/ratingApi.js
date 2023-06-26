import { $host } from ".";
export const getUserRating = async (user_id) => {
    const {data} = await $host.get('api/rating/user/'+ user_id)
    return data
}

export const giveCorrectFormAnswer = async (qestion_id, answer_id, user_id) => {
    const {data} = await $host.post('api/rating/get_answer', {qestion_id, answer_id, user_id, type: "form"})
    return data
}

export const giveCorrectDragAnswer = async (qestion_id, answers, user_id) => {
    const {data} = await $host.post('api/rating/get_answer', {qestion_id, answers, user_id, type: "drag"})
    return data
}

export const getLeaderboard = async () => {
    const {data} = await $host.get('api/rating/leaderbord')
    return data
}