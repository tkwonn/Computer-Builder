import React, { useState, useEffect, useContext } from 'react'

import { Config } from '../../config'
import { AppContext } from '../../contexts/AppContext'
import { CREATE_CPU_MODEL } from '../../actions'

export default function SelectCPU() {
  const { cpuArr, state, dispatch } = useContext(AppContext)
  const [ brandOptions, setBrandOptions ] = useState([])

  useEffect(() => {
    fetch(Config.url + "cpu").then(response => response.json()).then(data => {
      let result = []
      data.forEach(option => {
        if(!result.includes(option["Brand"])) result.push(option["Brand"])
      })
      setBrandOptions(result)
    })
  }, []) 

  const createModel = e => {
    e.preventDefault();
    const selectedBrand = document.querySelector('#cpuBrand').value
    dispatch({type: CREATE_CPU_MODEL, cpuArr, selectedBrand})
  }

  return (
    <div className="p-2">
      <h4 className="subtitle">step1 : Select your CPU</h4>
      <div>
        <label className="block text-left my-2">
          <span className="font-bold px-3">Brand</span>
          <select onChange={createModel} id="cpuBrand" className="custom-select w-full border bg-white rounded px-5 py-2 outline-none">
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
          <select id="cpuModel" className="custom-select w-full border bg-white rounded px-5 py-2 outline-none">
            <option defaultValue>----</option>
            {state["cpuArr"].map((option, index) => {
              return(
                <option value={option} key={index.toString()}>{option["Model"]}</option>
              )
            })}
          </select>
        </label>
      </div>
    </div>
  )
}
