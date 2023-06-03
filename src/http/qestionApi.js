import { $host } from ".";


export const getAllQestions = async () => {
    const {data} = await $host.get('api/question/',)
    return data
}

export const getQestionsByDiff = async (diff) => {
    const {data} = await $host.get('api/question/?dificult=' + diff)
    return data
}

export const getQestionsById = async (id) => {
    const {data} = await $host.get('api/question/id/' + id)
    return data
}

export const getSolvedQuestions = async (id) => {
    const {data} = await $host.get('api/solved_question/' + id)
    return data
}

export const getQuestionsFilterBySolvedAndTheme = async (user_id, dificult, theme) => {
    const {data} = await $host.post('api/question/solved_theme_filter', {user_id, dificult, theme})
    return data
}
export const solvedCheck = async (user_id, question_id) => {
    const {data} = await $host.post('api/question/check_solved', {user_id, question_id})
    return data
}