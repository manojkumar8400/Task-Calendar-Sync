// import axios from "axios"
import axios from "axios"
import { createContext, useContext, useState, useEffect } from "react"

const TaskCrudContext = createContext()

const TaskCrudProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([])
  const [taskTitleDescription, setTaskTitleDescription] = useState({
    title: "",
    description: "",
  })
  const [searchvalue, setSearchValue] = useState(null)
  const [filteredTasks, setFilteredTasks] = useState([])

  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/fetchData?userId=11"
        )
        setTaskList(data.data)
      } catch (error) {
        console.log(error, "Error fetching")
      }
    }

    fetchAllTask()
  }, [])

  const createTask = async ({ title, description }) => {
    const body = {
      userId: "11",
      title: title,
      description: description,
      priority: "",
      status: "",
      dueDate: "",
      occurence: "",
      category: "",
    }

    try {
      const data = await axios.post("http://localhost:4000/api/create", body)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async ({ title, description, updatedTaskId }) => {
    const body = {
      userId: "11",
      title: title,
      description: description,
      priority: "",
      Status: "",
      dueDate: "",
      occurence: "",
      category: "",
    }

    try {
      const data = await axios.put(
        `http://localhost:4000/api/updateTask/${updatedTaskId}`,
        body
      )
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTasks = async (taskIds) => {
    console.log({ taskIds })

    const body = {
      taskIds: taskIds,
    }

    try {
      const data = await axios.delete("http://localhost:4000/api/deleteTask", {
        data: body, // Include the body in the `data` field
        headers: {
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity, // Ensure this matches the original configuration
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TaskCrudContext.Provider
      value={{
        taskList,
        createTask,
        updateTask,
        deleteTasks,
        taskTitleDescription,
        setTaskTitleDescription,
        searchvalue,
        setSearchValue,
        filteredTasks, 
        setFilteredTasks
      }}
    >
      {children}
    </TaskCrudContext.Provider>
  )
}

const useTaskCrudContext = () => useContext(TaskCrudContext)
export { useTaskCrudContext, TaskCrudProvider }
