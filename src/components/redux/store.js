import redux, {createStore} from "redux";

// export Action Creator
export const setCurrentBiz = (e) => {
  return {
    type: "BUSINESS_CLICKED",
    payload: e.target.alt
  }
}


// export Reducer
export const currentBusinessReducer = (currentBiz = "bananas", action) => {
  switch(action.type) {
    case "BUSINESS_CLICKED":
      return currentBiz = action.payload
    default:
      return currentBiz
  }
}


// Redux Store
const currentBusinessStore = createStore(currentBusinessReducer);


// Subscribe Function
currentBusinessStore.subscribe(() => console.log(currentBusinessStore.getState()))

// Export the store
export default currentBusinessStore;