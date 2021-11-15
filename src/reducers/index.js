import { combineReducers } from "redux";

import cpuArr from './cpuReducer'
import gpuArr from './gpuReducer'
import ramArr from './ramReducer'
import storageArr from './storageReducer'
import resultObj from './resultReducer'

export default combineReducers({cpuArr, gpuArr, ramArr, storageArr, resultObj})