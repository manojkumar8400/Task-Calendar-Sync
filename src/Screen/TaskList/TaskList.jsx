import React, { useState } from "react"
import { CreateTask, DataFilterBar, Header, Task } from "../../components"

export const TaskList = () => {
  const [showCreateTask, setShowCreateTask] = useState(false)

  return (
    <main className='h-screen'>
      <Header createYourTask={setShowCreateTask} />
      <DataFilterBar />
      {/*<Task /> */}
      <Task />
      {showCreateTask && (
        <CreateTask closeModal={setShowCreateTask} isOpen={showCreateTask} />
      )}
    </main>
  )
}
