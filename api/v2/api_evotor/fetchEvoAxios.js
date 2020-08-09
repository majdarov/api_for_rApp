const createRequest = require('./createRequestAxios');
const { default: Axios } = require('axios');

async function fetchEvo({ baseURL, url, headers, method, body, params, action }) {
    try {
        let request = { baseURL, url, headers, method, params };
        if (body) {
            request.data = body;
        }
    let response = await Axios(request);
    let result = await response.data;
    
    if (result.paging && result.paging.next_cursor) {
        let request = await createRequest({
        type: action,
        cursor: result.paging.next_cursor,
        });
        let response = await fetchEvo(request);
        result.items = result.items.concat(response.items);
    }
    result.paging = {};
    return result;
    } catch(err) {
        return new Error(err);
    }
}

module.exports = fetchEvo;
