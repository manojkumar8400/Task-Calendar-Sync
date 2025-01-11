import React, { useEffect, useState } from "react"
import Pencil from "../assets/pencil.svg"
import Delete from "../assets/delete.svg"
import { useTaskCrudContext } from "../contexts/TaskCrudContext"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import { TaskDropdown } from "./TaskDropDown/TaskDropDown"
import {
  priorityOptions,
  statusOptions,
  categoryOptions,
  occurenceOptions,
} from "../constants/dropdownOptions"

export const Task = ({
  updatedTaskId,
  setRequestType,
  editTask,
  allTaskList,
}) => {
  const {
    setTaskTitleDescription,
    deleteTasks,
    searchvalue,
    filteredTasks,
    setFilteredTasks,
  } = useTaskCrudContext()

  const [startDate, setStartDate] = useState(new Date())
  const [deleteTask, setDeleteTask] = useState({
    deleteConfirmation: false,
    taskList: [],
  })

  // Search functionality
  useEffect(() => {
    if (searchvalue !== null && searchvalue !== "") {
      const filtered = allTaskList?.filter((task) =>
        task.title?.toLowerCase().includes(searchvalue)
      )
      setFilteredTasks(filtered)
    } else {
      setFilteredTasks(allTaskList)
    }
  }, [searchvalue, allTaskList])

  const editTaskHandler = (title, desc, id) => {
    updatedTaskId(id)
    editTask(true)
    setTaskTitleDescription({
      title: title,
      description: desc,
    })
    setRequestType(true)
  }

  const deleteTaskHandler = (taskId) => {
    setDeleteTask({
      taskList: deleteTask.taskList.includes(taskId)
        ? deleteTask.taskList.filter((itemId) => itemId !== taskId)
        : [...deleteTask.taskList, taskId],
    })
  }

  return (
    <div className='task-list mx-4 rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 overflow-auto relative'>
      <header className='cursor-context-menu grid-column justify-between border-b-2 border-gray-200 sticky z-10 w-full top-0 bg-slate-100'>
        <div className='flex justify-center items-center border-r-2 border-gray-200'>
          <button
            disabled={deleteTask.taskList.length === 0}
            className={`delete-btn !cursor-pointer`}
          >
            <img
              onClick={() =>
                setDeleteTask({ ...deleteTask, deleteConfirmation: true })
              }
              className={`w-4 ${
                deleteTask.taskList.length === 0 ? "opacity-50" : ""
              }`}
              src={Delete}
              alt='delete icon'
            />
          </button>
        </div>
        <p className='text-center py-2 px-2 border-r-2 border-gray-200'>Item</p>
        <p className='text-center py-2 px-2 border-r-2 border-gray-200'>
          Priority
        </p>
        <p className='text-center py-2 px-2 border-r-2 border-gray-200'>
          Status
        </p>
        <p className='text-center py-2 px-2 border-r-2 border-gray-200'>
          Due Date
        </p>
        <p className='text-center py-2 px-2 border-r-2 border-gray-200'>
          Occurence
        </p>
        <p className='text-center py-2 px-2'>Category</p>
      </header>
      <div className='task-list-container  h-5/6'>
        {filteredTasks?.map((task) => (
          <div
            key={task._id}
            className='grid-column justify-between border-b-2 border-gray-200'
          >
            <div className='flex items-center justify-center border-r-2 border-gray-200'>
              <input
                onChange={() => deleteTaskHandler(task._id)}
                type='checkbox'
              />
            </div>
            <div className='item-title flex items-center justify-between px-2 border-r-2 border-gray-200'>
              <span className='cursor-context-menu text-center py-2 px-2'>
                {task.title}
              </span>
              <button
                onClick={() =>
                  editTaskHandler(task.title, task.description, task._id)
                }
                className='edit-pencil'
              >
                <img className='w-6' src={Pencil} alt='pencil' />
              </button>
            </div>
            <div className='cursor-pointer text-center  px-2 border-r-2 border-gray-200'>
              <TaskDropdown
                title={"Select Priority"}
                options={priorityOptions}
                selectedValue={task.priority}
              />
            </div>
            <div className='cursor-pointer text-center  px-2 border-r-2 border-gray-200'>
              <TaskDropdown
                title={"Select Status"}
                options={statusOptions}
                selectedValue={task.status}
              />
            </div>
            <div className='cursor-pointer flex text-center  px-2 border-r-2 border-gray-200'>
              <DatePicker
                selected={startDate}
                minDate={new Date() + 1}
                onChange={(date) => {
                  setStartDate(date)
                  console.log(date)
                }}
              />
            </div>
            <div className='cursor-pointer text-center  px-2 border-r-2 border-gray-200'>
              <TaskDropdown
                title={"Select Occurence"}
                options={occurenceOptions}
                selectedValue={task.occurrences}
              />
            </div>
            <div className='cursor-pointer text-center  px-2'>
              <TaskDropdown
                title={"Select Category"}
                options={categoryOptions}
                selectedValue={task.category}
              />
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className='flex items-center justify-center h-full'>
            <h1 className='font-bold text-xl'>Task not found!!</h1>
          </div>
        )}
      </div>
      {deleteTask.deleteConfirmation && (
        <div className='flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10'>
          <div className='bg-white rounded h-32 p-4 flex flex-col justify-between'>
            <p className='text-xl font-medium'>
              Are you sure want to delete it.
            </p>
            <div className='flex justify-between'>
              <button
                onClick={() => setDeleteTask({ deleteConfirmation: false })}
                className='rounded bg-white border-2 border-slate-400 hover:bg-slate-400 hover:text-white transition px-4 py-1 w-fit text-slate-400'
              >
                Cancel
              </button>
              <button
                onClick={() => deleteTasks(deleteTask.taskList)}
                className='rounded bg-slate-400 px-4 py-1 w-fit text-white border-2 border-slate-400 hover:border-slate-400 hover:bg-white hover:text-slate-400 transition'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
