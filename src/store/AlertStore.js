import { makeAutoObservable } from "mobx"

export default class AlertStore {
    constructor() {
        this._alertsArr = []
        makeAutoObservable(this)
    }

    addAlert(alert) {
        this._alertsArr.push(alert)
    }

    get alertsArr() {
        return this._alertsArr
    }

}