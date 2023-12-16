import React, { createContext, useContext, useState } from 'react'

const commonContext = createContext()
export const useCommonContext = () => useContext(commonContext)

const ContextApi = ({children}) => {
    const [data,setData] = useState({
        todo: [
            { _id: "task-1", content: "Task 1" },
            { _id: "task-2", content: "Task 2" },
            { _id: "task-3", content: "Task 3" },
          ],
          inProgress: [
            { _id: "task-4", content: "Task 4" },
            { _id: "task-5", content: "Task 5" },
          ],
          completed: [
            { _id: "task-6", content: "Task 6" },
            { _id: "task-7", content: "Task 7" },
          ],
    })

    const value = {
       data,
       setData
    }
  return (
    <commonContext.Provider value={value}>
        {children}
    </commonContext.Provider>
  )
}

export default ContextApi