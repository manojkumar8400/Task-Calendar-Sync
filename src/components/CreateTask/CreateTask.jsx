import React, { useState } from "react"
// import "./RichTextEditor.css";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export const CreateTask = ({ closeModal, isOpen }) => {
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

  return (
    <section
      className={`fixed items-center flex inset-0 justify-center h-svh bg-opacity-50 transition-opacity duration-1000 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className='p-3 h-fit rounded w-3/4 grid bg-teal-100 relative z-20'>
        <div className='mb-3 gap-3 flex flex-col'>
          <input
            className='p-2 outline-none rounded-sm'
            type='text'
            placeholder='Title'
          />

          <section className='quill'>
            <ReactQuill
              modules={modules}
              formats={formats}
              value={value}
              placeholder='Take a note...'
              onChange={setValue}
              className='quill-editer'
            />
          </section>
        </div>
        <div className='flex justify-between'>
          <button
            onClick={() => closeModal(false)}
            className=' rounded bg-slate-400 px-4 py-1 w-fit text-white'
          >
            Cancel
          </button>
          <button className='rounded bg-slate-400 px-4 py-1 w-fit text-white'>
            Create
          </button>
        </div>
      </div>
      <div
        onClick={() => closeModal(false)}
        className='fixed inset-0 w-full h-full bg-black bg-opacity-50 z-10'
      ></div>
    </section>
  )
}
