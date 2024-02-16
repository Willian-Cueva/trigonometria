// api.js
const getApiUrl = (endpoint) => {
  const baseApiUrl = process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:3000/api';

  return `${baseApiUrl}/${endpoint}`;
};

export default getApiUrl;
