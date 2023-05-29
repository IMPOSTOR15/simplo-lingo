import { $authHost, $host } from ".";
import jwtDecode from "jwt-decode";

export const registration = async (email, password, role) => {
    const {data} = await $host.post('api/user/registration', {email, password, role})
    // console.log(data);
    localStorage.setItem('token', data.token)
    localStorage.setItem('user_id', jwtDecode(data.token).id)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    // console.log(data);
    localStorage.setItem('token', data.token)
    localStorage.setItem('user_id', jwtDecode(data.token).id)
    return jwtDecode(data.token)
}

export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', jwtDecode(data.token).id)
        return jwtDecode(data.token)
    } catch (e) {
        console.log(e);
    }
        
    
}
export const editUser = async (user) => {
    const {data} = await $host.post('api/user/edituser', user)
    return data.user
}
export const getUserData= async (id) => {
    const {data} = await $authHost.post('api/user/getuserdata', {id})
    console.log(data.user);
    return data.user
}