import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../Assets/img/terminal-5.png';

const Header = (props) => {

    function clickLang(ev) {
        let lng;
        if (ev.target.name === 'lng') {
            lng = ev.target.value;
            props.chooseLang(lng);
            props.getTitle(props.path);
        } else {
            return;
        }
    }

    return (
        <header>
            <img src={logo} alt='Logo'></img>
            <h2>{props.title}</h2>
            <div onClick={clickLang}>
                <input name="lng" type="radio" value='ru' checked={!props.currentLang} onChange={(ev) => ev.target.checked = !props.currentLang} />RU
                <input name="lng" type="radio" value='en' checked={props.currentLang} onChange={(ev) => ev.target.checked = props.currentLang} />EN
                </div>
            <div className={s.loginBlock}>
                {props.isAuth ? props.user.login : <NavLink to={'/login'}>Log In</NavLink>}
            </div>
        </header>
    );
}

export default Header;
