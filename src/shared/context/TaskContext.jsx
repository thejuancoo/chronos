import { createContext, useContext, useState, useEffect } from "react";

import { 
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../../service/taskService";
import useAuth from "../hooks/useAuth";

const TaskContext = createContext()

export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(null)

    const { auth, loading: authLoading } = useAuth()

    const fetchTasks = async () => {
        try {
            setLoading(true)
            setErrors(null)
            
            const data = await getAllTasks()
            setTasks(data)
        } catch (error) {
            setErrors(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(authLoading) return
        
        if(!auth){
            setTasks([])
            return
        }

        fetchTasks()
    }, [auth, authLoading])

    const addTask = async (taskData) => {
        try {
            const response = await createTask(taskData)
            
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const taskById = async (id) => {
        try {
            const task = await getTaskById(id)

            return task
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                taskById
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
    const context = useContext(TaskContext)

    return context
}