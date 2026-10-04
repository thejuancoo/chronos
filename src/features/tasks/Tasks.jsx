import { useTasks } from "../../shared/context/TaskContext"

export default function Tasks() {
    const { tasks } = useTasks()

    return (
        <div className="flex-1 space-y-2 h-full p-4 md:p-4 pt-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Mi Tareas</h1>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4">
                {tasks.map((task) => (
                    <div>
                        {task.title_task}
                    </div>
                ))}
            </div>
        </div>
    )
}
