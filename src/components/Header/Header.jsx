import React from "react"

export const Header = ({ createYourTask }) => {
  return (
    <section className='shadow-sm p-4'>
      <header className='flex justify-between items-center'>
        <span>TaskSync</span>
        <div className="flex gap-4">
          <button
            onClick={(_) => createYourTask(true)}
            className='font-bold text-white px-4 py-2 rounded m-auto bg-gray-400 border-gray-600'
          >
            Create task
          </button>
          <button className='font-bold text-white px-4 py-2 rounded m-auto bg-gray-400 border-gray-600'>
            Task progress tracker
          </button>
        </div>
      </header>
    </section>
  )
}
