import React, { useState } from "react"
import Dropdown from "./DropDown"
import { useTaskCrudContext } from "../contexts/TaskCrudContext"
import { filterOptions, sortOptions } from "../constants/dropdownOptions"

export const DataFilterBar = () => {
  const { setSearchValue, taskList, setFilteredTasks } = useTaskCrudContext()
  const [isHighToLow, setIsHighToLow] = useState(true)
  const [isAscendingOrder, setIsAscendingOrder] = useState(true)

  // Sort, Filter task functionality
  const sortTaskList = (sortType) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 }
    const filters = {
      Low: (task) => task.priority === "Low",
      Medium: (task) => task.priority === "Medium",
      High: (task) => task.priority === "High",
      Completed: (task) => task.status === "Completed",
      "In-progress": (task) => task.status === "In- progress",
      Pending: (task) => task.status === "Pending",
      "One-time": (task) => task.occurrences === "One-time",
      Daily: (task) => task.occurrences === "Daily",
      Weekly: (task) => task.occurrences === "Weekly",
      Monthly: (task) => task.occurrences === "Monthly",
      Work: (task) => task.category === "Work",
      Personal: (task) => task.category === "Personal",
      Urgent: (task) => task.category === "Urgent",
    }

    switch (sortType) {
      case "Due Date": {
        const sortedDueData = [...taskList].sort((a, b) =>
          isAscendingOrder
            ? new Date(a.dueDate) - new Date(b.dueDate)
            : new Date(b.dueDate) - new Date(a.dueDate)
        )
        setFilteredTasks(sortedDueData)
        setIsAscendingOrder(!isAscendingOrder)
        break
      }

      case "Priority": {
        const sortedData = [...taskList].sort((a, b) =>
          isHighToLow
            ? priorityOrder[a.priority] - priorityOrder[b.priority]
            : priorityOrder[b.priority] - priorityOrder[a.priority]
        )
        setFilteredTasks(sortedData)
        setIsHighToLow(!isHighToLow)
        break
      }

      default: {
        if (filters[sortType]) {
          setFilteredTasks([...taskList].filter(filters[sortType]))
        } else {
          setFilteredTasks(taskList) // Reset to default task list
        }
        break
      }
    }
  }

  return (
    <div className='flex w-full p-4 gap-4 items-center'>
      <Dropdown
        data={filterOptions}
        size='w-2/12'
        name='Filter'
        position='left-0'
        callEvent={sortTaskList}
      />
      <div className='w-8/12 '>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          className='outline-none w-full bg-white px-5 py-2 rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
          type='text'
          placeholder='Search your task here'
        />
      </div>
      <Dropdown
        data={sortOptions}
        size='w-2/12'
        name='Sort'
        callEvent={sortTaskList}
      />
    </div>
  )
}
