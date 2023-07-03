import React from 'react';
import cl from './AboutFooter.module.css'
import githubLogo from '../../assets/Footer/githubLogo.svg'
import telegramLogo from '../../assets/Footer/telegramLogo.svg'
import linkedinLogo from '../../assets/Footer/linkedinLogo.svg'
const AboutFooter = () => {
    return (
        <div className={cl.aboutFooterWrapper}>
            <h3 className={cl.footerHeader}>© 2023 SimploLingo</h3>
            <div className={cl.ContactBlock}>
                <a
                    className={cl.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/IMPOSTOR15"
                >
                    <img
                        className={cl.contactImg}
                        src={githubLogo}
                        alt="Github контакт"
                    />
                </a>
                <a
                    className={cl.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://t.me/impostor15"
                >
                    <img
                        className={cl.contactImg}
                        src={telegramLogo}
                        alt="Telegram контакт"
                    />
                </a>
                <a
                    className={cl.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/андрей-дагаев-a6001626a/"
                >
                    <img
                        className={cl.contactImg}
                        src={linkedinLogo}
                        alt="Linkedin контакт"
                    />
                </a>
            </div>
        </div>
    );
};

export default AboutFooter;