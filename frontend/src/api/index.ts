// POST method implementation:

const HTTP_API_PORT = 3001;


const API_HOST = process.env.NODE_ENV === 'production' ? 'https://portal-backend.eu-gb.cf.appdomain.cloud' : window.location.protocol + '//' + window.location.hostname + ':' + HTTP_API_PORT;

export const post = (url = '', data = {}) => {
  // Default options are marked with *
  return fetch(API_HOST + '/' + url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'mode': 'cors',
    },
    body: JSON.stringify(data) }).then((resp) => {

    return resp.json();
  });
//	return response.json(); // parses JSON response into native JavaScript objects
};

// GET method implementation:
export const get = (url = '') => {
  // Default options are marked with *
  return fetch(API_HOST + '/' + url,{
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'mode': 'cors',
    },
  }).then((resp) => {
    return resp.json();
  });
};