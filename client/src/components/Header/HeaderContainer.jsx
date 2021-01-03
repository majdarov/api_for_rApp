import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { withRouter } from 'react-router-dom';
import { getTitle, chooseLang } from '../../redux/navReduser';
import { authMe } from '../../redux/auth_reduser';
// import { updateProducts, setUpdated } from '../../redux/commodityReduser';
import { useEffect } from 'react';

const HeaderContainer = props => {

    let path = '/' + props.location.pathname.split('/')[1];

    const authMe = props.authMe;
    useEffect(() => authMe(), [authMe]);

    const getTitle = props.getTitle;
    useEffect(() => {
        getTitle(path);
    }, [path, getTitle])

    return <Header {...props} path={path} />
}

const mapStateToProps = state => {

    let className;

    return {
        user: {
            id: state.auth.id,
            email: state.auth.email,
            login: state.auth.login
        },
        isAuth: state.auth.isAuth,
        navBar: state.navigation.navBar,
        title: state.navigation.title,
        className,
        currentLang: state.navigation.currentLang
    }
}

export default connect(mapStateToProps, { authMe, getTitle,  chooseLang })(withRouter(HeaderContainer));
