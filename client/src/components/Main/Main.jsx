import React from "react";
import { connect } from "react-redux";
import { setAppKey } from "../../redux/commodityReduser";

function addAppKey() {
    var key = document.getElementById('app_key').value;
    window.localStorage.appKey = key;
}

const Main = props => {

    return (
        <div>
            <h1>MAIN</h1>
            <input id={'app_key'} />
            <button onClick={() => {
                addAppKey();
                props.setAppKey(window.localStorage.appKey);
            }}>AddAppKey</button>
            {!!props.appKey && <p>{props.appKey}</p>}
        </div>
    );
}

const mapState = state => {
    return {appKey: state.commodityPage.appKey}
}


export default connect(mapState, {setAppKey})(Main);
