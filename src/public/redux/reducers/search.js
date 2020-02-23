const initialState = {
  data: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  totalResults: '',
};

const search = (state = initialState, action) => {
  switch (action.type) {
    // get search news
    case 'SEARCH_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'SEARCH_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'SEARCH_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        data: action.payload.data.articles,
        totalResults: action.payload.data.totalResults,
      };

    default:
      return state;
  }
};

export default search;
