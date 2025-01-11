import React, { useState, useRef, useEffect } from "react"

export const TaskDropdown = ({title, options, selectedValue}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [isUpward, setIsUpward] = useState(false)
  const dropdownRef = useRef(null)

  // Detect dropdown position dynamically
  const toggleDropdown = () => {
    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect()      
      const spaceBelow = window.innerHeight - dropdownRect.bottom
      const spaceAbove = dropdownRect.top

      // If less space below, open upwards
      setIsUpward(spaceBelow < 150 && spaceAbove > 150)
      setIsOpen(!isOpen)
    }
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <div
        className='w-full h-10 flex items-center justify-between cursor-pointer px-2 rounded-md'
        onClick={toggleDropdown}
      >
        <span className='text-black w-full text-center'>{(selectedOption || selectedValue) ||  title}</span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className={`dropdown-container absolute p-2 z-10 w-full bg-gray-800 shadow-lg rounded-md ${
            isUpward ? "bottom-full mb-1" : "mt-1"
          }`}
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer  mt-1 px-4 py-2 text-center rounded-md ${option.style}`}
              onClick={() => {
                setSelectedOption(option.label)
                setIsOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
