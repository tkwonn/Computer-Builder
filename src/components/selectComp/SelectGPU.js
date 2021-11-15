import React, { useState, useEffect, useContext } from 'react'

import { Config } from '../../config'
import { AppContext } from '../../contexts/AppContext'
import { CREATE_GPU_MODEL } from '../../actions'

export default function SelectCPU() {
  const { gpuArr, state, dispatch } = useContext(AppContext)
  const [ brandOptions, setBrandOptions ] = useState([])

  useEffect(() => {
    fetch(Config.url + "gpu").then(response => response.json()).then(data => {
      let result = []
      data.forEach(option => {
        if(!result.includes(option["Brand"])) result.push(option["Brand"])
      })
      setBrandOptions(result)
    })
  }, [])

  const createModel = e => {
    e.preventDefault();
    const selectedBrand = document.querySelector('#gpuBrand').value
    dispatch({type: CREATE_GPU_MODEL, gpuArr, selectedBrand})
  }

  return (
    <div className="p-2">
      <h4 className="subtitle">step2 : Select your GPU</h4>
      <div>
        <label className="block text-left my-2">
          <span className="font-bold px-3">Brand</span>
          <select onChange={createModel} id="gpuBrand" className="custom-select w-full border bg-white rounded px-5 py-2 outline-none">
            <option defaultValue>----</option>
            {brandOptions.map((option, index) => {
              return(
                <option value={option} key={index.toString()}>{option}</option>
              )
            })}
          </select>
        </label>
      </div>
      <div>
        <label className="block text-left my-2">
          <span className="font-bold px-3">Model</span>
          <select className="custom-select w-full border bg-white rounded px-5 py-2 outline-none">
            <option defaultValue>----</option>
            {state["gpuArr"].map((option, index) => {
              return(
                <option value={option["Model"]} key={index.toString()}>{option["Model"]}</option>
              )
            })}
          </select>
        </label>
      </div>
    </div>
  )
}
