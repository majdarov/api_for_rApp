import React from "react";
import { connect } from "react-redux";
import { setAppKey, setStoreKey, setStores, initApp } from "../../redux/appReducer";
import { createRequest, fetchEvo } from '../../api/api_evotor';

function addKey(id) {
    var key = document.getElementById(id).value;
    if (!key) return;
    window.localStorage[id] = key;
    return key;
}

async function getStores(appKey) {
    let request = await createRequest({ type: 'store_v2' }, appKey);
    // console.log(request);
    let stores = await fetchEvo(request);
    console.log(stores);
    return stores.items;

}

const Main = props => {

    async function clickAddAppKey() {
        var key = addKey('appKey');
        if (!key) return;
        props.setAppKey(key);
        try {
            let stores = await getStores(key);
            props.setStores(stores);
        } catch (err) {
            delete localStorage.appKey;
            props.setAppKey(null);
            console.error(err);
        }

    }

    function liClick(e) {
        let storeKey = e.target.id;
        localStorage.storeKey = storeKey;
        props.setStoreKey(storeKey);
        // props.initApp(true);
    }

    return (
        <div>
            <h1>MAIN</h1>
            {!props.appKey &&
                <div>
                    <input id={'appKey'} />
                    <button onClick={clickAddAppKey}>AddAppKey</button>
                </div>
            }
            { !!props.appKey && !props.isInit && <p>{props.appKey}</p>}
            { props.appKey && !!props.stores.length && !props.storeKey &&
                <div style={{ cursor: 'pointer' }}>
                    Select store
                    <ul>
                        {props.stores.map(item => {
                            return (
                                <li key={item.id} id={item.id} onClick={liClick}>{item.id}: {item.name}</li>
                            )
                        })}
                    </ul>
                </div>
            }
            { !!props.storeKey && !props.isInit && <p>{props.storeKey}</p>}
            { props.isInit && <h2>App Is Initialized</h2> }
        </div>
    );
}

const mapState = state => {
    return {
        appKey: state.app.appKey,
        storeKey: state.app.storeKey,
        isInit: state.app.isInit,
        stores: state.app.stores
    }
}

export default connect(mapState, { setAppKey, setStoreKey, setStores, initApp })(Main);
