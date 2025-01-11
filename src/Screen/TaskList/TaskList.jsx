import React, { useState } from "react"
import { CreateTask, DataFilterBar, Header, Task } from "../../components"
import { useTaskCrudContext } from "../../contexts/TaskCrudContext";

export const TaskList = () => {
  const { taskList } = useTaskCrudContext();

  const [showCreateTask, setShowCreateTask] = useState(false);
  const [isTaskUpdated, setIsTaskUpdated] = useState(false);
  const [updatedTaskId, setUpdatedTaskId] = useState(null)
    
  return (
    <main className='h-screen'>
      <Header createYourTask={setShowCreateTask} />
      <DataFilterBar />
      <Task updatedTaskId={setUpdatedTaskId} setRequestType={setIsTaskUpdated} editTask={setShowCreateTask} allTaskList={taskList}/>
      {showCreateTask && (
        <CreateTask updatedTaskId={updatedTaskId} requestType={isTaskUpdated} closeModal={setShowCreateTask} isOpen={showCreateTask} />
      )}
    </main>
  )
}
