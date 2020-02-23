import axios from 'axios';

export const getNews = url => ({
  type: 'NEWS',
  payload: axios.get(url),
});

export const getSearchNews = url => ({
  type: 'SEARCH',
  payload: axios.get(url),
});
