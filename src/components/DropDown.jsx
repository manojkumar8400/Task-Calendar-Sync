import React, { useState } from "react"

const Dropdown = ({ data, size, name, position, callEvent }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  const handleMouseEnter = (index) => {
    setHoveredItem(index)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  const handleSortings = (item) => {
    if (name === "Sort") {
      callEvent(item)
    }
  }

  const handleFiltering = (item) => {
      console.log(typeof callEvent === "function", { item })
      callEvent(item)
  }

  return (
    <div className={`${size} relative inline-block text-left`}>
      <div>
        <button
          type='button'
          className='inline-flex w-full justify-center items-center gap-x-1.5 rounded-3xl bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
          id='menu-button'
          aria-expanded={isOpen}
          aria-haspopup='true'
          onClick={() => setIsOpen(!isOpen)}
        >
          {name}
          <svg
            className='-mr-1 h-5 w-5 text-gray-400'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      <div
        className={`${
          isOpen
            ? "transition ease-out duration-100 transform opacity-100 scale-100"
            : "transition ease-in duration-75 transform opacity-0 scale-95 hidden"
        } ${position} absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='menu-button'
      >
        <div
          className='py-1 relative  flex flex-col items-start gap-1'
          role='none'
        >
          {data?.map((item, index) => (
            <div
              // onClick={() => setIsOpen(false)}
              className='w-full block text-sm text-gray-700'
              role='menuitem'
              key={item.title}
            >
              <p
                onClick={() => handleSortings(item.title)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className='filter-item  px-4 py-2 cursor-pointer'
              >
                {item.title}
              </p>
              {hoveredItem === index && (
                <div
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className='filter-subItem w-max shadow-lg absolute flex flex-col items-start gap-1'
                >
                  {item?.dropdown?.map((subItem, index) => (
                    <button
                      onClick={() => handleFiltering(subItem)}
                      className='w-full px-4 py-2'
                      key={subItem}
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
