import { makeAutoObservable } from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._userData = {}
        this._userRating = {}
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
    setUserRating(userRating) {
        this._userRating = userRating
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
    get userRating() {
        return this._userRating
    }
}