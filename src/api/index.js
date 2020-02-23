export const API_KEY = 'b2dc28e0584e48f99255a929e52c58fd';
export const ROOT_URL = 'https://newsapi.org/v2';
const withKey = url => `${ROOT_URL}${url}?apiKey=${API_KEY}`;

// Get Top Headlines
export const getNewsUrl = (page, pageSize, country) =>
  `${withKey(
    '/top-headlines',
  )}&page=${page}&pageSize=${pageSize}&country=${country}`;

// Get Search News
export const getSearchNewsUrl = (q, page, pageSize) =>
  `${withKey('/everything')}&q=${q}&page=${page}&pageSize=${pageSize}`;
