// POST method implementation:

const HTTP_API_PORT = 3001;

export const post = (url = '', data = {}) => {
  // Default options are marked with *
  return fetch(window.location.protocol + '//' + window.location.hostname + ':' + HTTP_API_PORT + '/' + url, {
    method: 'POST',
    //  credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data) }).then((resp) => {

    return resp.json();
  });
//	return response.json(); // parses JSON response into native JavaScript objects
};

// GET method implementation:
export const get = (url = '') => {
  // Default options are marked with *
  return fetch(window.location.protocol + '//' + window.location.hostname + ':' + HTTP_API_PORT + '/' + url).then((resp) => {
    return resp.json();
  });
};