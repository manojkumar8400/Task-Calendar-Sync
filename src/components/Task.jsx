import React from "react"
import Pencil from "../assets/pencil.svg"

export const Task = () => {
  return (
    <div className='task-list mx-4 rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 overflow-auto relative'>
      <header className='cursor-context-menu flex justify-between border-b-2 border-gray-200 sticky w-full top-px bg-slate-100'>
        <p className='text-center py-2 px-2 border-r-2 border-gray-200 min-w-80'>
          Item
        </p>
        <p className='text-center py-2 px-2 w-full border-r-2 border-gray-200'>
          Priority
        </p>
        <p className='text-center py-2 px-2 w-full border-r-2 border-gray-200'>
          Status
        </p>
        <p className='text-center py-2 px-2 w-full border-r-2 border-gray-200'>
          Due Date
        </p>
        <p className='text-center py-2 px-2 w-full border-r-2 border-gray-200'>
          Priority
        </p>
        <p className='text-center py-2 px-2 w-full border-r-2 border-gray-200'>
          Occurence
        </p>
        <p className='text-center py-2 px-2 w-full'>Category</p>
      </header>
      <div>
        <div className='flex justify-between border-b-2 border-gray-200'>
          <div className='item-title min-w-80 flex items-center justify-between px-2 border-r-2 border-gray-200'>
            <span className='cursor-context-menu text-center py-2 px-2'>
              Test item this is 1
            </span>
            <button className='edit-pencil'>
              <img className='w-6' src={Pencil} alt='pencil' />
            </button>
          </div>
          <p className='cursor-pointer text-center py-2 px-2 w-full border-r-2 border-gray-200'>
            Priority
          </p>
          <p className='cursor-pointer text-center py-2 px-2 w-full border-r-2 border-gray-200'>
            Status
          </p>
          <p className='cursor-pointer text-center py-2 px-2 w-full border-r-2 border-gray-200'>
            Due Date
          </p>
          <p className='cursor-pointer text-center py-2 px-2 w-full border-r-2 border-gray-200'>
            Priority
          </p>
          <p className='cursor-pointer text-center py-2 px-2 w-full border-r-2 border-gray-200'>
            Occurence
          </p>
          <p className='cursor-pointer text-center py-2 px-2 w-full'>
            Category
          </p>
        </div>
      </div>
    </div>
  )
}
