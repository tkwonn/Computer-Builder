import { CREATE_GPU_MODEL } from "../actions"

const gpuArr = (state = [], action) => {
  switch(action.type){
    case CREATE_GPU_MODEL:
      const filteredArr = action.gpuArr.filter(option => option["Brand"] === action.selectedBrand)
      return filteredArr
    default:
      return state
  }
}

export default gpuArr;