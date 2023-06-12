import { $host } from ".";


export const getUserActivity = async (user_id, month_index) => {
    const {data} = await $host.post('api/activity/get_user_activity', {user_id, month_index})
    // console.log(data);
    return data
}