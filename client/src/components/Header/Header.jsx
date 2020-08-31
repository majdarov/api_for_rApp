import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import logo from '../../Assets/img/terminal-5.png';

const Header = (props) => {

    function clickUpdate() {
        if (props.update) {
            props.setUpdated(true);
            props.updateProducts();
        }
    }

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

    let update;

    if (props.update) {
        update = " (need update!)";
    } else if (props.update !== null) {
        update = " (updated!)";
    } else {
        update = null;
    }

    return (
        <header>
            <img src={logo} alt='Logo'></img>
            <h2>{props.title}</h2>
            <div style={{ display: 'inline-block' }}>
                {props.isUpdated ? <Preloader /> :
                    <div className={props.className} onClick={() => clickUpdate()}>
                        {update}
                    </div>
                }
            </div>
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