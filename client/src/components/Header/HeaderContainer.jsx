import React from 'react';
import s from './Header.module.css';
import { connect } from 'react-redux';
import Header from './Header';
import { withRouter } from 'react-router-dom';
import { getTitle, chooseLang } from '../../redux/navReduser';
import { authMe } from '../../redux/auth_reduser';
import { updateProducts, setUpdated } from '../../redux/commodityReduser';
import { useEffect } from 'react';

/* class HeaderContainer extends React.Component {
    componentDidMount() {
        let path = '/' + this.props.location.pathname.split('/')[1];
        this.props.getTitle(path);
        this.props.authMe();
    };
    render() {
        return <Header {...this.props} />
    }
} */

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

    let update;
    let className;
    let lastUpdate;
    if (state.navigation.title === "Товары" || "Products") {
        lastUpdate = state.commodityPage.lastUpdate;
        if (!lastUpdate || Date.now() - lastUpdate > 86400000) {
            update = true;
            className = s.needupdate;
        } else {
            update = false;
            className = s.updated;
        }
    } else {
        update = null;
    }
    return {
        user: {
            id: state.auth.id,
            email: state.auth.email,
            login: state.auth.login
        },
        isAuth: state.auth.isAuth,
        navBar: state.navigation.navBar,
        title: state.navigation.title,
        update,
        className,
        lastUpdate,
        isUpdated: state.commodityPage.isUpdated,
        pId: state.commodityPage.pid,
        currentLang: state.navigation.currentLang
    }
}

export default connect(mapStateToProps, { authMe, getTitle, updateProducts, setUpdated, chooseLang })(withRouter(HeaderContainer));
