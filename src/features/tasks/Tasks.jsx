import { useState } from "react"
import { toast } from "sonner"
import { 
    PlusIcon,
    TrashIcon,
    PencilIcon
} from "@heroicons/react/24/outline"
import { useTasks } from "../../shared/context/TaskContext"
import DialogAddTask from "./components/DialogAddTask"
import DialogEditTask from "./components/DialogEditTask"

export default function Tasks() {
    const [isDialogAddTaskOpen, setIsDialogAddTaskOpen] = useState(false)
    const [isDialogEditTaskOpen, setIsDialogEditTaskOpen] = useState(false)
    const [selectTask, setSelectedTask] = useState(null)
    const { tasks, dropTask, toggleTaskDone } = useTasks()

    const isCompleteTask = async (id, toggleTask) => {
        try {
            await toggleTaskDone(id, toggleTask)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="flex-1 space-y-2 h-full p-4 md:p-4 pt-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Mis Tareas</h1>
                <button 
                    onClick={() => setIsDialogAddTaskOpen(true)}
                    className="flex justify-center items-center bg-blue-600 text-white py-1 px-2 rounded-lg hover:bg-blue-700"
                >
                    <PlusIcon className="mr-1 size-5"/>
                    Crear una tarea
                </button>
            </div>
            <div className="pt-4 space-y-2">
                {tasks.length > 0 ? 
                    (tasks.map((task) => (
                        <div
                            key={task.id_task}
                            className="py-4 px-4 w-full border border-gray-200 rounded-lg hover:bg-gray-100"
                        >
                            <div className="flex gap-3">
                                <label className="relative flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={task.is_done}
                                        onChange={() => isCompleteTask(task.id_task, !task.is_done)}
                                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-gray-300
                                            cursor-pointer transition-all checked:bg-green-500 checked:border-green-500"
                                    />
                                    <span
                                        className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                                            text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-3 h-3"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </label>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="flex flex-col gap-0">
                                            <h2
                                                className={`
                                                    font-medium leading-tight
                                                    ${task.is_done
                                                        ? "line-through text-gray-400"
                                                        : "text-gray-900"
                                                    }
                                                `}
                                            >
                                                {task.title_task}
                                            </h2>

                                            <p
                                                className={`
                                                    line-clamp-2 mt-2 leading-tight
                                                    ${task.is_done
                                                        ? "text-gray-400"
                                                        : "text-gray-600"
                                                    }
                                                `}
                                            >
                                                {task.description_task}
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center items-center shrink-0">
                                            <span className="text-gray-500 text-sm whitespace-nowrap">
                                                {task.date_task}
                                            </span> 

                                            <div className="space-x-2">
                                                <button 
                                                    onClick={() => {
                                                        //dropTask(task.id_task)
                                                        setIsDialogEditTaskOpen(true)
                                                        setSelectedTask(task)
                                                    }}
                                                    className="mt-1 p-2 hover:bg-gray-300 rounded-full hover:cursor-pointer"
                                                >
                                                    <PencilIcon className="size-5 text-gray-700"/>
                                                </button>

                                                <button 
                                                    onClick={() => { 
                                                        dropTask(task.id_task)
                                                        toast.success("Tarea eliminada")
                                                    }}
                                                    className="mt-1 p-2 hover:bg-red-100 rounded-full hover:cursor-pointer"
                                                >
                                                    <TrashIcon className="size-5 text-red-500"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))) : (
                        <div className="pt-12">
                            <p className="text-xl text-gray-500 text-center">No hay tareas aun</p>
                        </div>
                    )
                }
            </div>

            <DialogAddTask
                isDialogAddTaskOpen={isDialogAddTaskOpen}
                setIsDialogAddTaskOpen={setIsDialogAddTaskOpen}
            />

            <DialogEditTask
                isDialogEditTaskOpen={isDialogEditTaskOpen}
                setIsDialogEditTaskOpen={setIsDialogEditTaskOpen}
                task={selectTask}
            />
        </div>
    )
}
