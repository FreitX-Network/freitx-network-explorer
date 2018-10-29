export default function reducer(state = {
  items: null,
  fetching: true,
  error: null,
  offset: 0,
  count: 6,
  tip: 0,
}, action) {
  switch (action.type) {
  case 'FETCH_EXECUTIONS': {
    return {...state, fetching: true};
  }
  case 'FETCH_EXECUTIONS_FAIL': {
    return {...state, fetching: false, error: action.payload.error};
  }
  case 'FETCH_EXECUTIONS_SUCCESS': {
    return {
      ...state,
      fetching: false,
      items: action.payload.executions,
      offset: action.payload.offset,
      count: action.payload.count,
      tip: action.payload.tip,
    };
  }
  default: {
    return state;
  }
  }
}
