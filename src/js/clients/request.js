import {
  applyPartialRight,
  objectToQueryParams
} from '../utils';

/**
 * Return Object from Response.
 * @private
 * @param {Response} response Fetch Response to parse.
 * @returns {Object}
 */
function getJSON(response) {
  return response.json();
}

/**
 * Check status of Response and either return it or throw.
 * @private
 * @param {Response} response Fetch Response.
 * @returns {Response|undefined}
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(`HTTP Error: ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
}

/**
 * Make request via Fetch to given url.
 * @private
 * @param {string} url Url to contact.
 * @param {Object} [headers={}]
 * @param {Object} [params=null]
 * @param {Object} [data=null]
 * @param {string} [method='GET'']
 * @param {string[]} [responseHeaders=[]] Response headers to augment response with.
 * @returns {Promise<Response>}
 */
function request(url, headers={}, params=null, data=null, responseHeaders=[], method='GET') {
  const request = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    request.body = JSON.stringify(data);
  }

  if (params) {
    url += `?${objectToQueryParams(params)}`;
  }

  return fetch(url, request)
          .then(checkStatus)
          .then((response) => {
            const headers = responseHeaders.reduce((result, key) => {
              result[key] = response.headers.get(key);
              return result;
            }, {});

            return getJSON(response).then((json) => {
              return { ...json, ...headers };
            });
          });
}

/**
 * Make 'GET' request via Fetch to given url.
 * @public
 * @param {string} url Url to contact.
 * @param {Object} [headers={}]
 * @param {Object} {params=null}
 * @returns {Promise<Response>}
 */

 /**
  * Make 'POST' request via Fetch to given url.
  * @public
  * @param {string} url Url to contact.
  * @param {Object} [headers={}]
  * @param {Object} {params=null}
  * @param {Object} {data=null}
  * @param {string[]} [responseHeaders=[]]
  * @returns {Promise<Response>}
  */
const doPost = applyPartialRight(request, 'POST', 5);


/**
 * Make 'PUT' request via Fetch to given url.
 * @public
 * @param {string} url Url to contact.
 * @param {Object} [headers={}]
 * @param {Object} {params=null}
 * @param {Object} {data=null}
 * @param {string[]} [responseHeaders=[]]
 * @returns {Promise<Response>}
 */
const doPut = applyPartialRight(request, 'PUT', 5);

/**
 * Make 'DELETE' request via Fetch to given url.
 * @public
 * @param {string} url Url to contact.
 * @param {Object} [headers={}]
 * @param {Object} {params=null}
 * @param {Object} {data=null}
 * @param {string[]} [responseHeaders=[]]
 * @returns {Promise<Response>}
 */
 const doDelete = applyPartialRight(request, 'DELETE', 5);

export {
  request as doGet,
  doDelete,
  doPost,
  doPut
};
