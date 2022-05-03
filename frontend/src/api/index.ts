// POST method implementation:

const HTTP_API_PORT = 3001;


const API_HOST = process.env.NODE_ENV === 'production' ? window.location.protocol + '://portal-backend.eu-gb.cf.appdomain.cloud' : window.location.protocol + '//' + window.location.hostname + ':' + HTTP_API_PORT;

export const post = (url = '', data = {}) => {

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
};

// GET method implementation:
export const get = (url = '') => {

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

// DELETE method implementation:
export const remove = ((url = '', data = {}) => {

  return fetch(API_HOST + '/' + url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'mode': 'cors',
    },
    body: JSON.stringify(data) }).then((resp) => {

    return resp.json();
  });
});

// PUT method implementation:
export const put = ((url = '', data = {}) => {

  return fetch(API_HOST + '/' + url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'mode': 'cors',
    },
    body: JSON.stringify(data) }).then((resp) => {

    return resp.json();
  });
});