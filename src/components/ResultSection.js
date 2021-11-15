import React, { useState, useContext } from 'react'

import { AppContext } from '../contexts/AppContext'
import { Config } from '../config'
import { Computer } from '../model'
import { CREATE_RESULT, DELETE_RESULT } from '../actions'

export default function ResultSection() {
  const { state, dispatch } = useContext(AppContext)
  const [ isValidInput, setValidInput ] = useState(false)

  const addResult = e => {
    e.preventDefault();
    if(isAllSelected()){
      Config.computerCount++
      const cpu = state["cpuArr"][0]
      const gpu = state["gpuArr"][0]
      const ram = state["ramArr"][0]
      const storage = state["storageArr"].model[0]
      setValidInput(true)
      // console.log(cpu, gpu, ram, storage)
      const computer = new Computer(cpu, gpu, ram, storage)
      dispatch({type: CREATE_RESULT, computer})
    }
    else{
      alert("Please fill in all fields!")
    }
  }

  const deleteResult = e => {
    e.preventDefault();
    setValidInput(false)
    const confirm = window.confirm("Are you sure you want to delete it?")
    if(confirm) dispatch({type: DELETE_RESULT})
  }

  const isAllSelected = () => {
    const stepNodeList = document.querySelectorAll(".custom-select")
    for(let node of stepNodeList){
      if(node.value === "----") return false
    }
    return true
  }

  return (
    <div>
      <div className="flex justify-center my-3">
        <button onClick={addResult} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Get result
        </button>
      </div>
      {isValidInput && 
        <div className="container p-5 my-5">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="bg-blue-300">
                        <th scope="col" className="w-2/5 px-6 py-3 text-left text-xs font-medium font-bold uppercase tracking-wider">
                          Components
                        </th>
                        <th scope="col" className="w-1/6 py-3 text-left text-xs font-medium font-bold uppercase tracking-wider">
                          Brand
                        </th>
                        <th scope="col" className="w-3/5 py-3 text-center text-xs font-medium font-bold uppercase tracking-wider">
                          Model
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                CPU
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{state["resultObj"].cpu.Brand}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span>
                            {state["resultObj"].cpu.Model}
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-blue-100">
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                GPU
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{state["resultObj"].gpu.Brand}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span>
                            {state["resultObj"].gpu.Model}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Memory Card
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{state["resultObj"].ram.Brand}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span>
                            {state["resultObj"].ram.Model}
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-blue-100">
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Storage
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{state["resultObj"].storage.Brand}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span>
                            {state["resultObj"].storage.Model}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-around p-3">
            <h2 className="p-4 inline-flex text-xl leading-5 font-semibold rounded-full shadow bg-blue-100 text-blue-800">Gaming: {state["resultObj"].getScoreForGaming()}%</h2>
            <h2 className="p-4 inline-flex text-xl leading-5 font-semibold rounded-full shadow bg-blue-100 text-blue-800">Working: {state["resultObj"].getScoreForWorking()}%</h2>
          </div>
          <div className="flex justify-center mt-3">
            <button onClick={deleteResult} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
              Delete
            </button>
          </div>
        </div>
      }
    </div>
  )
}
