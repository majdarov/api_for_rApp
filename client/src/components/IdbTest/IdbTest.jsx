import React, { useState } from 'react';
import { apiForIdb } from '../../api/api';
import Tree from '../common/Tree/Tree';
import { openDB } from 'idb';

async function initDb() {
    const db = await openDB('products', 7, {
        async upgrade(db, oldVersion, newVersion) {
            if (oldVersion < newVersion) {
                console.log(`New version: ${newVersion}`);
            }
            if (!db.objectStoreNames.contains('groups')) {
                const store = db.createObjectStore('groups', { keyPath: 'id' });
                store.createIndex('name', 'name', { unique: true });
                store.createIndex('date', 'created_at');
            }

        }
    });

    return db;
}

async function getGroup(id) {
    const db = await initDb();
    let group;
    if (id === 'all') {
        group = await db.getAll('groups');
    } else {
        group = await db.get('groups', id);
    }
    return group;
}

const IdbTest = () => {

    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function callbackTree(id) {
        let group = await getGroup(id);
        console.log(group);
        alert(JSON.stringify(group, null, 2));
    }

    async function butGetGroups() {
        setIsLoading(true);
        let res = await apiForIdb.getGroupsEvo();
        let g = await res.data.items;
        let resG = [];
        /*
         created_at: "2018-08-01T06:00:27.605+0000"
         id: "96639e0c-6409-9faa-d4e0-a8212b9fa795"
         name: "Веревки"
         parent_id: "3257cd3d-6e61-4315-8d83-084578c507be"
         store_id: "20180608-EEA0-408D-807D-6AB73272E383"
         updated_at: "2019-04-13T07:58:19.537+0000"
         user_id: "01-000000000910281"
         */
        g.forEach((item, idx) => {
            // if (idx === 1) console.log(item);
            let group = {
                ...item,
                pid: item.parent_id ? item.parent_id : null,
                label: item.name,
            };
            resG.push(group);
        });
        /* Init IDB */
        const db = await initDb();
        const tx = db.transaction('groups', 'readwrite');
        const promises = resG.map(item => {
            return tx.store.put(item);
        });
        promises.push(tx.done);
        await Promise.all(promises);
        let groups = await getGroup('all');
        setGroups(groups);
        setIsLoading(false);
    }

    return (
        <>
            <h1>IDB Test</h1>
            <button onClick={() => butGetGroups()} disabled={isLoading}>get Groups Evo</button>
            { isLoading && <p>Loading...</p>}
            { !!groups.length && <Tree data={groups} price="Price" treeLabel="Groups" callback={callbackTree} />}
        </>
    );
}

export default IdbTest;
