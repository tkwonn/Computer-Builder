import React, { useState, useEffect, useContext } from 'react'

import { Config } from '../../config'
import { AppContext } from '../../contexts/AppContext'
import { CREATE_RAM_MODEL } from '../../actions'

export default function SelectCPU() {
  const { ramArr, state, dispatch } = useContext(AppContext)
  const [ brandOptions, setBrandOptions ] = useState([])
  const [ numOptions, setNumOptions ] = useState([])

  useEffect(() => {
    fetch(Config.url + "ram").then(response => response.json()).then(data => {
      let brandArr = []
      let numArr = []
      data.forEach(option => {
        if(!brandArr.includes(option["Brand"])) brandArr.push(option["Brand"])
        // Modelの文字列にメモリサイズを表す数字が記載されているため 
        // Ripjaws 4 DDR4 2400 C14 8x16GB -> Get 8
        const number = option["Model"].split(" ").pop().split("x").shift();
        if(!numArr.includes(number)) numArr.push(number)
      })
      setBrandOptions(brandArr)
      setNumOptions(numArr.sort())
    })
  }, [])

  const createModel = e => {
    e.preventDefault();
    const selectedNum = document.querySelector('#stickNum').value
    const selectedBrand = document.querySelector('#ramBrand').value
    dispatch({type: CREATE_RAM_MODEL, ramArr, selectedNum, selectedBrand})
  }

  return (
    <div className="p-2">
      <h4 className="subtitle">step3 : Select your Memory Card</h4>
      <div>
        <label className="block text-left my-2">
          <span className="font-bold px-3">How Many</span>
          <select onChange={createModel} id="stickNum" className="custom-select w-full border bg-white rounded px-5 py-2 outline-none">
            <option defaultValue>----</option>
            {numOptions.map((option, index) => {
              return(
                <option value={option} key={index.toString()}>{option}</option>
              )
            })}
          </select>
        </label>
      </div>
      <div>
        <label className="block text-left my-2">
          <span className="font-bold px-3">Brand</span>
          <select onChange={createModel} id="ramBrand" className="custom-select w-full border bg-white rounded px-5 py-2 outline-none">
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
            {state["ramArr"].map((option, index) => {
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
