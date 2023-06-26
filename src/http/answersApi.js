import { $host } from ".";


export const getQestionAnswers = async (question_id) => {
    const {data} = await $host.get('api/answer/' + question_id)
    return data
}

export const getCorrectAnswers = async (question_id, user_id) => {
    const {data} = await $host.post('api/answer/correct_answers', {question_id, user_id})
    return data
}
