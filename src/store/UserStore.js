import { makeAutoObservable } from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._userData = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setUserData(user_data) {
        this._userData = user_data
    }

    get userData() {
        return this._userData
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}