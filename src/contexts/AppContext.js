import React, { createContext, useState, useEffect, useReducer } from 'react';

import reducer from "../reducers";
import { Config } from '../config';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const initialState = { cpuArr: [], gpuArr: [], ramArr: [], storageArr: { capacity: [], brand: [], model: [] }, resultObj: {}}

  const [state, dispatch] = useReducer(reducer, initialState)

  const [cpuArr, setCpuArr] = useState([]);
  const [gpuArr, setGpuArr] = useState([]);
  const [ramArr, setRamArr] = useState([]);
  const [hddArr, setHDDArr] = useState([]);
  const [ssdArr, setSSDArr] = useState([]);

  useEffect(() => {
    for(let component of Config.components){
      fetch(Config.url + component).then(response=>response.json()).then(data=>{
        if(component === "cpu") setCpuArr(data);
        else if(component === "gpu") setGpuArr(data);
        else if(component === "ram") setRamArr(data);
        else if(component === "hdd") setHDDArr(data);
        else if(component === "ssd") setSSDArr(data);
      })
    }
  }, [])

  // {props.children} is for receiving Consumer Components
  // Add states and functions to value-{...}
  return(
    <AppContext.Provider value={{cpuArr, setCpuArr, gpuArr, setGpuArr, ramArr, setRamArr, hddArr, setHDDArr, ssdArr, setSSDArr, state, dispatch}}>
      {props.children}
    </AppContext.Provider>
  )
}
export default AppContextProvider;