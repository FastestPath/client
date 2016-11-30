const initialState = Object.freeze({
  count: 0,
  isLoading: false
});

export default function globalReducer(state = initialState, action = {}) {

  const { isLoading } = action;

  if (isLoading !== undefined) {

    const count = isLoading ? state.count + 1 : state.count - 1;

    return {
      ...state,
      count,
      isLoading: count > 0
    }
  }

  return state;
}