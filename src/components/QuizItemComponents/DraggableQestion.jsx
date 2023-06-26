import { useEffect, useState } from 'react';
import cl from './DraggableQestion.module.css'
import DNDArea from '../UI/DragableComponents/DNDArea';

import { v4 as uuidv4 } from 'uuid';

const DraggableQestion = (answers, quizData) => {
  const [questionFlow, setQuestionFlow] = useState([null, null])

  const [questionData, setQuestionData] = useState({
    areaNumsL: 2,
    text: "кто *, тот *.",
    answers: [
      {
        id: 1,
        text: "двинется",
        isAlreadyUsed: false,
      },
      {
        id: 2,
        text: "человек",
        isAlreadyUsed: false,
      },
      {
        id: 3,
        text: "человек плохой обдино досадно",
        isAlreadyUsed: false,
      },
    ],
    correctFlow: [1,2]
  })


  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {

    let questionFlow = questionData.text.split("*")
    setCurrentAnswers(questionData.answers);
    setQuestionFlow(questionFlow);
  }, [])

  useEffect(() => {
    console.log(userAnswers);
  }, [userAnswers])

  const handleDrop = (block_id, areaId) => {
    let newCurrentAnswers = [...currentAnswers];
    let newUserAnswers = [...userAnswers];

    if(newUserAnswers[areaId]) {
        const replacedBlockIndex = newCurrentAnswers.findIndex(answer => answer.id === newUserAnswers[areaId].id);
        if(replacedBlockIndex !== -1) {
            newCurrentAnswers[replacedBlockIndex].isAlreadyUsed = false;
        }
    }

    const movingBlockIndex = newCurrentAnswers.findIndex(answer => answer.id === parseInt(block_id));

    if(movingBlockIndex !== -1) {
        newCurrentAnswers[movingBlockIndex].isAlreadyUsed = true;
        newUserAnswers[areaId] = newCurrentAnswers[movingBlockIndex];
    }

    setCurrentAnswers(newCurrentAnswers);
    setUserAnswers(newUserAnswers);
  };

  return (
    <div className={cl.draggableQuestionWrapper}>
      <div className={cl.qestionText}>
      <div className={cl.quizCard}>
          <h2 className={cl.quizTitle}>{quizData.id}. {quizData.title}</h2>
          <p className={cl.quizDescription}>{quizData.text}</p>
      </div>
      <div className={cl.devider}></div>
        {questionFlow.map((elem, index) => (
          index < questionFlow.length - 1 ?
          [
            <p
              key={index}
              className={cl.qestionElemText}
            >
              {elem}
            </p>, 
            <DNDArea
              key={index + 1}
              id={index}
              handleDrop={handleDrop}
              text={userAnswers[index]?.text || ''}
              isQestionArea={true}
            />
          ]
          :
          <p key={index} className={cl.qestionElemText}>{elem}</p>
        ))}
      </div>
      <div className={cl.answers}>
        {currentAnswers.map((answer) => (
          <DNDArea
            handleDrop={handleDrop}
            id={answer.id}
            key={answer.id}
            text={answer.text}
            isAlreadyUsed={answer.isAlreadyUsed}
            isQestionArea={false}
          />
        ))}
      </div>
      

    </div>
  );
};

export default DraggableQestion;
