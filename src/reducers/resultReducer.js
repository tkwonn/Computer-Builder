import { CREATE_RESULT, DELETE_RESULT } from "../actions"

const resultObj = (state = {}, action) => {
  switch(action.type){
    case CREATE_RESULT:
      // console.log(action.computer)
      return action.computer
    case DELETE_RESULT:
      return []
    default:
      return state
  }
}

export default resultObj;