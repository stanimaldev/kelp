import redux, {createStore} from "redux";

// export Action Creator
export const setCurrentBiz = (e) => {
  return {
    type: "BUSINESS_CLICKED",
    payload: e.target.alt
  }
}


const defaultState = {
  currentBiz: "bananas",
  currentMarker: "default marker!"
}

// export Reducer
export const currentBusinessReducer = (state = defaultState, action) => {
  switch(action.type) {
    case "BUSINESS_CLICKED":
      return {...state, currentBiz: action.payload}
    case "MARKER_CLICKED":
      return {...state, currentMarker: action.payload}
    default:
      return state
  }
}


// Redux Store
const currentBusinessStore = createStore(currentBusinessReducer);


// Subscribe Function
// currentBusinessStore.subscribe(() => console.log(currentBusinessStore.getState()))

// Export the store
export default currentBusinessStore;