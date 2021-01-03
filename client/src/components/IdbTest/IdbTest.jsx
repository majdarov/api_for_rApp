import React, { useState } from 'react';
import { apiForIdb } from '../../api/api';
import Tree from '../common/Tree/Tree';
import { getGroup, pushItems } from '../../api/apiIDB';

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
        console.log(res);
        let g = await res.items;
        await pushItems('groups', g);
        /*
         created_at: "2018-08-01T06:00:27.605+0000"
         id: "96639e0c-6409-9faa-d4e0-a8212b9fa795"
         name: "Веревки"
         parent_id: "3257cd3d-6e61-4315-8d83-084578c507be"
         store_id: "20180608-EEA0-408D-807D-6AB73272E383"
         updated_at: "2019-04-13T07:58:19.537+0000"
         user_id: "01-000000000910281"
         */
        let groups = await getGroup('all');
        groups.forEach((item) => {
            // if (idx === 1) console.log(item);
            item.pid = item.parent_id ? item.parent_id : null;
            item.label = item.name;
        });
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
