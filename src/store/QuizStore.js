import { makeAutoObservable } from "mobx"

export default class QuizStore {
    constructor() {
        this._curenQuizId = false
        this._curentQuizData = {}
        this._quizsData = {}
        makeAutoObservable(this)
    }

    setCurenQuizId(id) {
        this._curenQuizId = id
    }
    setCurentQuizData(quizData) {
        this._curentQuizData = quizData
    }
    setQuizsData(quizsData) {
        this._quizsData = quizsData
    }

    get curenQuizId() {
        return this._curenQuizId
    }
    get curentQuizData() {
        return this._curentQuizData
    }
    get quizsData() {
        return this._quizsData
    }
}