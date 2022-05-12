// POST method implementation:
import { BACKEND_API_HOST } from '../settings';

const HTTP_API_PORT = 3001;
const API_URL = process.env.NODE_ENV === 'production' ? window.location.protocol + '//' + BACKEND_API_HOST : window.location.protocol + '//' + window.location.hostname + ':' + HTTP_API_PORT;

export const post = (url = '', data = {}) => {

  return fetch(API_URL + '/' + url, {
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

  return fetch(API_URL + '/' + url,{
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

  return fetch(API_URL + '/' + url, {
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
export const put: (url: string, data: any) => Promise<{status: number, data: any}> = ((url = '', data = {}) => {

  return fetch(API_URL + '/' + url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'mode': 'cors',
    },
    body: JSON.stringify(data) }).then((resp) => {

    return { status: resp.status, data: resp.json() };
  });
});