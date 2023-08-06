import React, { useState } from 'react';
import EnterExitWraper from '../components/UI/Animation/EnterExitWrapper';
import cl from '../components/AdminPageComponents/AdminPage.module.css'
import MainButton from '../components/UI/Buttons/Mainbutton'
import Alert from '../components/UI/Alert/Alert';
import { addQuestion } from '../http/qestionApi';
const AdminPage = () => {
  const [questionTitle, setQuestionTitle] = useState('')
  const [questionText, setQuestionText] = useState('')
  const [questionType, setQuestionType] = useState('form')
  const [questionPoints, setQuestionPoints] = useState(0)
  const [questionTheme, setQuestionTheme] = useState('')
  const [questionDifficult, setQuestionDifficult] = useState('easy')
  const [questionDragAllText, setQuestionDragAllText] = useState('')
  const [questionDragCorrectText, setQuestionDragCorrectText] = useState('')
  const [formAnswersArr, setFormAnswersArr] = useState([])
  const [formAnswerText, setFormAnswerText] = useState('')

  const [errorText, setErrorText] = useState('')
  
  const senQuestion = async () => {
    console.log(formAnswersArr);
    try {
      let questionData = {}
      if (questionTitle &&
          questionType &&
          questionText &&
          questionPoints &&
          questionDifficult &&
          questionTheme &&
          formAnswersArr &&
          questionType === 'form') 
        {
          questionData = {
            title: questionTitle,
            type: questionType,
            text: questionText,
            points: questionPoints,
            dificult: questionDifficult,
            theme: questionTheme,
            answersArr: formAnswersArr,
          }
        } else {
          setErrorText('Ввели не все данные')
        }
      if (questionTitle &&
          questionType &&
          questionText &&
          questionPoints &&
          questionDifficult &&
          questionTheme &&
          questionDragAllText &&
          questionDragCorrectText &&
          questionType === 'drag') 
        {
          questionData = {
            title: questionTitle,
            type: questionType,
            text: questionText,
            points: questionPoints,
            dificult: questionDifficult,
            theme: questionTheme,
            answersArr: [
              {
                questionDragAllText: questionDragAllText,
                questionDragCorrectText: questionDragCorrectText,
              }
            ],
          }
        }else {
          setErrorText('Ввели не все данные')
        }
      let responce = await addQuestion(questionData)
    } catch (e) {
        console.log(e.response.data.message)
        setErrorText(e.response.data.message)
    }
  }

  return (
    <EnterExitWraper>
    <div className={cl.mainWrapper}>
    <Alert errorText={errorText} setErorrText={setErrorText}/>
      <h2>Добавить вопрос</h2>
      <div className={cl.questionForm}>
        <label>Заголовок вопроса</label>
        <input
            type='text'
            className={cl.questionInput}
            value={questionTitle}
            onChange={e => setQuestionTitle(e.target.value)}
        />
        <span>Тип вопроса</span>
        <div className={cl.buttonRow}>
          <button 
            className={`${cl.typeButton} ${questionType === 'form' ? cl.activeButton : ''}`} 
            onClick={() => setQuestionType('form')}
          >
            form
          </button>
          <button 
            className={`${cl.typeButton} ${questionType === 'drag' ? cl.activeButton : ''}`} 
            onClick={() => setQuestionType('drag')}
          >
            drag
          </button>
        </div>
        <label>Колличество баллов</label>
        <input
            type='number'
            className={cl.questionInput}
            value={questionPoints}
            onChange={e => setQuestionPoints(e.target.value)}
        />
        <select name="theme" id="" className={cl.themeSelect} defaultValue="base" onChange={(event) => setQuestionTheme(event.target.value)}>
          <option value="base" disabled>выбери тему</option>
          <option value="tenses" className={cl.selectOption}>tenses</option>
          <option value="vocabulary" className={cl.selectOption}>vocabulary</option>
          <option value="spelling" className={cl.selectOption}>spelling</option>
          <option value="grammar" className={cl.selectOption}>grammar</option>
        </select>
        <div className={cl.buttonRow}>
          <button 
            className={`${cl.typeButton} ${questionDifficult === 'easy' ? cl.activeButton : ''}`} 
            onClick={() => setQuestionDifficult('easy')}
          >
            easy
          </button>
          <button 
            className={`${cl.typeButton} ${questionDifficult === 'medium' ? cl.activeButton : ''}`} 
            onClick={() => setQuestionDifficult('medium')}
          >
            medium
          </button>
          <button 
            className={`${cl.typeButton} ${questionDifficult === 'hard' ? cl.activeButton : ''}`} 
            onClick={() => setQuestionDifficult('hard')}
          >
            hard
          </button>
        </div>
        {questionType === 'drag' ?
          <>
            <span>Замените слова для переноса символом '*' пример: 'try*to*drag in this*.'</span>
            <textarea
                type='text'
                className={cl.questionTextArea}
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
            />
            <span>Введите все достпуные слова, разделяя их запятыми ', '</span>
            <input
                type='text'
                className={cl.questionInput}
                value={questionDragAllText}
                onChange={e => setQuestionDragAllText(e.target.value)}
            />
            <span>Введите правильный порядок слова ', '</span>
            <input
                type='text'
                className={cl.questionInput}
                value={questionDragCorrectText}
                onChange={e => setQuestionDragCorrectText(e.target.value)}
            />
          </>
          :
          ''
        }
        {questionType === 'form' ?
        <>
          <label>Текст вопроса</label>
          <textarea
              type='text'
              className={cl.questionTextArea}
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
          />
          <span>Введите ответ</span>
          <input
            type='text'
            className={cl.questionInput}
            value={formAnswerText}
            onChange={e => setFormAnswerText(e.target.value)}
          />
          <button
            className={cl.addAnswerBtn}
            onClick={() => {
              setFormAnswersArr(
                formAnswerText 
                ? (prev) => [...prev, {text: formAnswerText, isCorrect: false}] 
                : prev => [...prev]
              );
              setFormAnswerText('')
            }}
          >
            +
          </button>
          Ответы:
          <div className={cl.addedAnswersRow}>
            {formAnswersArr.map((elem, index) => 
              <div className={cl.formAnswerElem} key={index}>
                <span>{elem.text}</span>
                <input type='checkbox' checked={elem.isCorrect} onChange={e => setFormAnswersArr((prev) => prev.map((item, i) => i === index ? {...item, isCorrect: e.target.checked} : item))}/>
              </div>
            )}
          </div>
        </>
        :
        ''
        }
      </div>
      <MainButton onClick={() => senQuestion()} className={cl.aproveBtn}>Добавить</MainButton>
    </div>
    </EnterExitWraper>
  );
};

export default AdminPage;