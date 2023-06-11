import React from 'react';
import AchivementBoard from '../components/AchivementComponents/AchivementBoard';
import EnterExitWraper from '../components/UI/Animation/EnterExitWrapper';

const AchivementPage = () => {
    return (
        <EnterExitWraper>
        <div>
            <AchivementBoard/>
        </div>
        </EnterExitWraper>
    );
};

export default AchivementPage;