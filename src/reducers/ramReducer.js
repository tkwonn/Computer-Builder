import { CREATE_RAM_MODEL } from "../actions"

const ramArr = (state = [], action) => {
  switch(action.type){
    case CREATE_RAM_MODEL:
      const filteredByNum = action.ramArr.filter(option => option["Model"].split(" ").pop().split("x").shift() === action.selectedNum)
      const filteredByBrand = filteredByNum.filter(option => option["Brand"] === action.selectedBrand)
      return filteredByBrand
    default:
      return state
  }
}

export default ramArr;