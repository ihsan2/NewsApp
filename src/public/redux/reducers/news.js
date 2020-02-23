const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const news = (state = initialState, action) => {
  switch (action.type) {
    // get news
    case 'NEWS_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'NEWS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'NEWS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        data: action.payload.data.articles,
      };

    default:
      return state;
  }
};

export default news;
