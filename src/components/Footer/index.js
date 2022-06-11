import React from 'react';

import {Link} from 'react-router-dom';

import background from '../../assests/img/background.jpg';
import logo from '../../assests/img/logo.png';

import './footer.scss';

const Footer = () => {
    return(
        <div className='footer' style={{backgroundImage: `url(${background})`}}>
            <div className='footer__container container'>
                <div className='footer__container__logo'>
                    <img src={logo} alt='' />
                    <Link to='/'>Movie</Link>
                </div>
                <div className='footer__container__help'>
                    <Link to='/'>Q&amp;A</Link>
                    <Link to='/'>Contact</Link>
                    <Link to='/'>News</Link>
                </div>
                <div className='footer__container__more'>
                    <Link to='/'>Term of use</Link>
                    <Link to='/'>Privacy policy</Link>
                    <Link to='/'>Copyright report</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;