import React, { useState, useEffect, useContext } from 'react'

import { Config } from '../../config'
import { AppContext } from '../../contexts/AppContext'
import { CREATE_STORAGE_CAPACITY, CREATE_STORAGE_BRAND, CREATE_STORAGE_MODEL } from '../../actions'

export default function SelectCPU() {
  const { hddArr, ssdArr, state, dispatch } = useContext(AppContext)
  const [ hddBrandOptions, setHDDBrandOptions ] = useState([])
  const [ hddCapaOptions, setHDDCapaOptions ] = useState([])
  const [ ssdBrandOptions, setSSDBrandOptions ] = useState([])
  const [ ssdCapaOptions, setSSDCapaOptions ] = useState([])

  useEffect(() => {
    fetch(Config.url + "hdd").then(response => response.json()).then(data => {
      let brandArr = []
      let capaArr = []
      data.forEach(option => {
        if(!brandArr.includes(option["Brand"])) brandArr.push(option["Brand"])
        // Modelの文字列にストレージを表す数字が記載されているため
        // Gold 12TB (2017) -> Get 12TB
        let regexp = /[0-9]{1,3}[TG]B/g;
        let capacity = option["Model"].match(regexp).toString()
        if(!capaArr.includes(capacity)) capaArr.push(capacity)
        capaArr = sortByCapacity(capaArr)
      })
      setHDDBrandOptions(brandArr)
      setHDDCapaOptions(capaArr)
    })
  }, [])

  useEffect(() => {
    fetch(Config.url + "ssd").then(response => response.json()).then(data => {
      let brandArr = []
      let capaArr = []
      data.forEach(option => {
        if(!brandArr.includes(option["Brand"])) brandArr.push(option["Brand"])
        let regexp = /[0-9]{1,3}[TG]B/g;
        let capacity = option["Model"].match(regexp).toString()
        if(!capaArr.includes(capacity)) capaArr.push(capacity)
        capaArr = sortByCapacity(capaArr)
      })
      setSSDBrandOptions(brandArr)
      setSSDCapaOptions(capaArr)
    })
  }, [])

  const sortByCapacity = (arr) => {
    let teraByteArr = [];
    let gigaByteArr = [];

    for(let i = 0; i < arr.length; i++){
      let str = arr[i].substring(arr[i].length-2);
      if(str === "TB") teraByteArr.push(parseInt(arr[i].substring(0, arr[i].length-2)));
      else if(str === "GB") gigaByteArr.push(parseInt(arr[i].substring(0, arr[i].length-2)));
    }

    teraByteArr.sort((a,b) => b-a);
    gigaByteArr.sort((a,b) => b-a);

    teraByteArr = addUnit(teraByteArr, "TB");
    gigaByteArr = addUnit(gigaByteArr, "GB");

    teraByteArr = teraByteArr.concat(gigaByteArr);
    return teraByteArr;
  }

  const addUnit = (arr, unit) => {
    let result = []
    for(let i = 0; i < arr.length; i++){
      result.push(arr[i] + unit)
    }
    return result;
  }

  const createCapacity = e => {
    e.preventDefault();
    const selectedType = document.querySelector('#storageType').value
    let capaArr = []
    selectedType === "HDD" ? capaArr = hddCapaOptions : capaArr = ssdCapaOptions
    dispatch({type: CREATE_STORAGE_CAPACITY, capaArr})
  }

  const createBrand = e => {
    e.preventDefault();
    const selectedType = document.querySelector('#storageType').value
    let capaArr = []
    let brandArr = []
    if(selectedType === "HDD"){
      capaArr = hddCapaOptions
      brandArr = hddBrandOptions
    }
    else{
      capaArr = ssdCapaOptions
      brandArr = ssdBrandOptions
    }
    dispatch({type: CREATE_STORAGE_BRAND, capaArr, brandArr})
  }

  const createModel = e => {
    e.preventDefault();
    const selectedType = document.querySelector('#storageType').value
    let capaArr = []
    let brandArr = []
    let modelArr = []
    if(selectedType === "HDD"){
      capaArr = hddCapaOptions
      brandArr = hddBrandOptions
      modelArr = hddArr
    }
    else{
      capaArr = ssdCapaOptions
      brandArr = hddBrandOptions
      modelArr = ssdArr
    }
    const selectedCapacity = document.querySelector('#storageCapacity').value
    const selectedBrand = document.querySelector('#storageBrand').value
    dispatch({type: CREATE_STORAGE_MODEL, capaArr, brandArr, modelArr, selectedCapacity, selectedBrand})
  }

  return (
    <div className="p-2">
      <h4 className="subtitle">step4 : Select your Storage</h4>
      <div>
        <label className="block text-left my-2">
          <span className="font-bold px-3">HDD or SSD</span>
          <select onChange={createCapacity} id="storageType" className="custom-select w-full border bg-white rounded px-5 py-2 outline-none">
            <option defaultValue>----</option>
            <option value="HDD">HDD</option>
            <option value="SSD">SSD</option>
          </select>
        </label>
      </div>
      <div>
        <label className="block text-left my-2">
          <span className="font-bold px-3">Storage</span>
          <select onChange={createBrand} id="storageCapacity" className="custom-select w-full border bg-white rounded px-5 py-2 outline-none">
            <option defaultValue>----</option>
            {state["storageArr"]["capacity"].map((option, index) => {
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
          <select onChange={createModel} id="storageBrand" className="custom-select w-full border bg-white rounded px-5 py-2 outline-none">
            <option defaultValue>----</option>
            {state["storageArr"]["brand"].map((option, index) => {
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
            {state["storageArr"]["model"].map((option, index) => {
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
