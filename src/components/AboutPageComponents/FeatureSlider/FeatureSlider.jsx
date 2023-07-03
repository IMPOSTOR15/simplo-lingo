import cl from './FeatureSlider.module.css'
import React, { useRef, useEffect } from 'react';
import FeatureBlock from './FeatureBlock';
import ratingImg from '../../../assets/aboutPage/rating.svg'
import stepByStepImg from '../../../assets/aboutPage/step_by_step.svg'
import questionImg from '../../../assets/aboutPage/questions.svg'
import diificultyImg from '../../../assets/aboutPage/difficulties.svg'
import achivementsImg from '../../../assets/aboutPage/achievements.svg'

const Slider = () => {
  const features = [
    {
      title: 'Отслеживайте свой прогресс',
      description: 'SimploLingo позволяет подробно отслеживать вашу активность, позволяя контролировать ваш прогресс со временем. Наблюдайте, как улучшаются ваши языковые навыки, и повышайте уверенность в своих успехах.',
      image: stepByStepImg,
    },
    {
      title: 'Вопросы по разным темам',
      description: 'Наша обширная коллекция вопросов охватывает широкий спектр тем, гарантируя, что вы сможете практиковать английский язык в реальных ситуациях. От повседневных разговоров до делового английского и многого другого.',
      image: questionImg,
    },
    {
      title: 'Три уровня сложности',
      description: 'Выберите уровень сложности, который вам удобен. SimploLingo предлагает вопросы на трех уровнях сложности, позволяя вам начать с вашего текущего уровня владения языком и постепенно двигаться к более продвинутым темам.',
      image: diificultyImg,
    },
    {
      title: 'Система рейтинга',
      description: 'SimploLingo превращает обучение в дружеское соревнование. Зарабатывайте баллы за каждый правильный ответ и поднимайтесь в рейтинге нашей таблицы лидеров. Бросайте вызов друзьям или другим ученикам по всему миру.',
      image: ratingImg,
    },
    {
      title: 'Достижения',
      description: 'Держите мотивацию на высоком уровне с системой достижений SimploLingo. Получайте значки и трофеи по мере достижения определенных результатов и продемонстрируйте вашу владение английским друзьям и другим ученикам.',
      image: achivementsImg,
    },
    {
      title: 'Отслеживание прогресса',
      description: 'SimploLingo позволяет подробно отслеживать вашу активность, позволяя контролировать ваш прогресс со временем. Наблюдайте, как улучшаются ваши языковые навыки, и повышайте уверенность в своих успехах.',
      image: stepByStepImg,
    },
    {
      title: 'Вопросы по разным темам',
      description: 'Наша обширная коллекция вопросов охватывает широкий спектр тем, гарантируя, что вы сможете практиковать английский язык в реальных ситуациях. От повседневных разговоров до делового английского и многого другого.',
      image: questionImg,
    },
    {
      title: 'Три уровня сложности',
      description: 'Выберите уровень сложности, который вам удобен. SimploLingo предлагает вопросы на трех уровнях сложности, позволяя вам начать с вашего текущего уровня владения языком и постепенно двигаться к более продвинутым темам.',
      image: diificultyImg,
    },
    {
      title: 'Система рейтинга и таблица лидеров',
      description: 'SimploLingo превращает обучение в дружеское соревнование. Зарабатывайте баллы за каждый правильный ответ и поднимайтесь в рейтинге нашей таблицы лидеров. Бросайте вызов друзьям или другим ученикам по всему миру.',
      image: ratingImg,
    },
    {
      title: 'Достижения',
      description: 'Держите мотивацию на высоком уровне с системой достижений SimploLingo. Получайте значки и трофеи по мере достижения определенных результатов и продемонстрируйте вашу владение английским друзьям и другим ученикам.',
      image: achivementsImg,
    },
  ];
  
  return (
    <div className={cl.sliderContainer}>
        <div className={cl.sliderInner}>
          {features.map((feature, index) => (
            <FeatureBlock
              key={index}
              id={index}
              title={feature.title}
              imgsrc={feature.image}
              description={feature.description}
            />
          ))}
        </div>
    </div>

    
  );
};

export default Slider;