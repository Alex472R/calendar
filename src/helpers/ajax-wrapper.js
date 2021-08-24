import axios from 'axios'

export const ajaxWrapper = (params) => {
  const token = localStorage.getItem('token')
  let defaultHeaders = {
    'Content-type': 'application/json',
    'Authorization': token
  };
  const headers = {
    ...defaultHeaders,
    ...params.headers
  }

  return axios({
    headers,
    method: params.method,
    url: params.url,
    data: params.data
  })
}