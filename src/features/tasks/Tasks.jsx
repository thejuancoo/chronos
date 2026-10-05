import { useTasks } from "../../shared/context/TaskContext"

export default function Tasks() {
    const { tasks } = useTasks()
    console.log(tasks)

    return (
        <div className="flex-1 space-y-2 h-full p-4 md:p-4 pt-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Mi Tareas</h1>
            </div>
            <div className="pt-4 space-y-2">
                 {tasks.map((task) => (
                    <div
                        key={task.id_task}
                        className="py-4 px-4 w-full border border-gray-200 rounded-lg hover:bg-gray-100"
                    >
                        <div className="flex gap-3">
                            <label className="relative flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={task.is_done}
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
                                <div className="flex justify-between gap-4">
                                    <h2
                                        className={`
                                            font-medium
                                            ${task.is_done
                                                ? "line-through text-gray-400"
                                                : "text-gray-900"
                                            }
                                        `}
                                    >
                                        {task.title_task}
                                    </h2>

                                    <span className="text-gray-500 text-sm whitespace-nowrap">
                                        {task.date_task}
                                    </span>
                                </div>

                                <p
                                    className={`
                                        line-clamp-2
                                        ${task.is_done
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                        }
                                    `}
                                >
                                    {task.description_task}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
