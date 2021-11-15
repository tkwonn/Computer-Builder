import React from 'react'

import SelectCPU from './SelectCPU'
import SelectGPU from './SelectGPU'
import SelectRAM from './SelectRAM'
import SelectStorage from './SelectStorage'

export default function SelectSection() {
  return (
    <div className="container p-2">
      <SelectCPU />
      <SelectGPU />
      <SelectRAM />
      <SelectStorage />
    </div>
  )
}
