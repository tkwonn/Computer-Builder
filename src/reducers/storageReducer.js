import { CREATE_STORAGE_CAPACITY, CREATE_STORAGE_BRAND, CREATE_STORAGE_MODEL } from "../actions"

const storageArr = (state = {}, action) => {
  switch(action.type){
    case CREATE_STORAGE_CAPACITY:
      return { capacity: action.capaArr, brand: [], model: [] }
    case CREATE_STORAGE_BRAND:
      return { capacity: action.capaArr, brand: action.brandArr, model: [] }
    case CREATE_STORAGE_MODEL:
      const temp = { capacity: action.capaArr, brand: action.brandArr, model: [] }
      const filteredByCapacity = action.modelArr.filter(option => option["Model"].includes(action.selectedCapacity))
      const filteredByBrand = filteredByCapacity.filter(option => option["Brand"] === action.selectedBrand)
      temp["model"] = filteredByBrand
      return temp
    default:
      return state
  }
}

export default storageArr;