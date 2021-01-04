import React from "react";
import { connect } from "react-redux";
import { setAppKey, setStoreKey, setStores, initApp } from "../../redux/appReducer";
import { apiForIdb } from "../../api/api";
import { readJsonFile, saveConfig } from "../../api/apiFile";
import { delDb } from "../../api/apiIDB";

function addKey(id) {
    var key = document.getElementById(id).value;
    if (!key) return;
    window.localStorage[id] = key;
    return key;
}

const Main = props => {


    let inpRef = React.createRef();

    async function saveData() {
        await saveConfig('config');
        console.log('File with data saved');
    }

    async function setAppKeyAndStores(key) {
        localStorage.appKey = key;
        props.setAppKey(key);
        try {
            let stores = await apiForIdb.getStores();
            props.setStores(stores);
        } catch (err) {
            delete localStorage.appKey;
            props.setAppKey(null);
            console.error(err);
        }
    }

    async function clickAddAppKey() {
        var key = addKey('appKey');
        if (!key) return;
        await setAppKeyAndStores(key);
    }

    function liClick(e) {
        let storeKey = e.target.id;
        localStorage.storeKey = storeKey;
        props.setStoreKey(storeKey);
        // props.initApp(true);
    }

    async function cleareStorage(storageName) {
        localStorage.clear();
        await delDb(storageName);
        props.setAppKey(null);
        props.setStoreKey(null);
        props.initApp(false);

    }

    async function restoreConfig() {
        let file = inpRef.current;
        let config = await readJsonFile(file);
        await setAppKeyAndStores(config.appKey);
        localStorage.storeKey = config.storeKey;
        props.setStoreKey(config.storeKey);
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
            { props.isInit && <h2>App Is Initialized</h2>}
            { props.isInit &&
                <div>
                    <button onClick={() => cleareStorage('Evo')}>cleare Storage</button>
                    <button onClick={saveData}>Save Config</button>
                </div>
            }
            {
                !props.isInit &&
                <label>Restore config
                    <input type="file" ref={inpRef} onChange={restoreConfig} hidden />
                </label>
            }
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
