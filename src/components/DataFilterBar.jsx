import React from "react"
import Dropdown from "./DropDown"

export const DataFilterBar = () => {
  return (
    <div className='flex w-full p-4 gap-4 items-center'>
      <Dropdown size='w-2/12' name='Filter' position='left-0' />
      <div className='w-8/12 '>
        <input
          className='outline-none w-full bg-white px-5 py-2 rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
          type='text'
          placeholder='Search your task here'
        />
      </div>
      <Dropdown size='w-2/12' name='Sort' />
    </div>
  )
}
