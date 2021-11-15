import { CREATE_CPU_MODEL } from "../actions";

const cpuArr = (state = [], action) => {
  switch(action.type){
    case CREATE_CPU_MODEL:
      const filteredArr = action.cpuArr.filter(option => option["Brand"] === action.selectedBrand)
      return filteredArr
    default:
      return state;
  }
}

export default cpuArr;