import { createContext, useContext, useState, useEffect } from "react";

import { 
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    toggleTaskDoneRequest
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
            setTasks((prevTasks) => [...prevTasks, response])
            
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

    const dropTask = async (id) => {
        try {
            setErrors(null)
            setLoading(true)

            const data = await deleteTask(id)
            setTasks((prevTasks) => prevTasks.filter((task) => task.id_task !== id))
            return data
        } catch (error) {
            setErrors(errors.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleTaskDone = async (id, done) => {
        try {
            setLoading(true)
            setErrors(false)

            const taskFound = tasks.find(task => task.id_task === id)
            await toggleTaskDoneRequest(id, taskFound.is_done === 0 ? true : false)
            tasks.map(task => task.id_task === id ? task.is_done = task.is_done === 0 ? 1 : 0 : task.is_done)
            setTasks([...tasks])
        } catch (error) {
            console.log(error)
            setErrors(errors.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                taskById,
                dropTask,
                toggleTaskDone
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