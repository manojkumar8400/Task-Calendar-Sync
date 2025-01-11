import React, { useState } from "react"
// import "./RichTextEditor.css";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useTaskCrudContext } from "../../contexts/TaskCrudContext"

export const CreateTask = ({ updatedTaskId, requestType, closeModal, isOpen }) => {
  const { createTask, updateTask, taskTitleDescription, setTaskTitleDescription } =
    useTaskCrudContext()

  const [value, setValue] = useState("")

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "image",
    "list",
    "link",
    "clean",
    "video",
  ]
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [],
      [{ list: "ordered" }, { list: "bullet" }],
      [],
      ["link"],
      // ["image", "link"],
      // ["clean"],
    ],
  }

  const taskCreateHandler = () => {
    let title = taskTitleDescription.title;
    let description = taskTitleDescription.description;

    !requestType ? 
    createTask({ title, description }) :
    // console.log({ title, description, updatedTaskId }, 'create task');

    updateTask({ title, description, updatedTaskId });
    
    // updateTask({ title, description, id });
  }

  return (
    <section
      className={`fixed z-20 items-center flex inset-0 justify-center h-svh bg-opacity-50 transition-opacity duration-1000 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className='p-3 h-fit rounded w-3/4 grid bg-teal-100 relative z-20'>
        <div className='mb-3 gap-3 flex flex-col'>
          <input
            className='p-2 outline-none rounded-sm'
            type='text'
            placeholder='Title'
            value={taskTitleDescription.title}
            onChange={(e) =>
              setTaskTitleDescription({
                ...taskTitleDescription,
                title: e.target.value,
              })
            }
          />

          <section className='quill'>
            <ReactQuill
              modules={modules}
              formats={formats}
              value={taskTitleDescription.description}
              placeholder='Take a note...'
              onChange={(value) =>
                setTaskTitleDescription({
                  ...taskTitleDescription,
                  description: value,
                })
              }
              className='quill-editer'
            />
          </section>
        </div>
        <div className='flex justify-between'>
          <button
            onClick={() => {
              closeModal(false)
              setTaskTitleDescription({ title: "", description: "" })
            }}
            className=' rounded bg-slate-400 px-4 py-1 w-fit text-white'
          >
            Cancel
          </button>
          <button
            onClick={ () => 
              taskCreateHandler()
            }
            className='rounded bg-slate-400 px-4 py-1 w-fit text-white'
          >
            Create
          </button>
        </div>
      </div>
      <div
        onClick={() => {
          closeModal(false)
          setTaskTitleDescription({ title: "", description: "" })
        }}
        className='fixed inset-0 w-full h-full bg-black bg-opacity-50 z-10'
      ></div>
    </section>
  )
}
