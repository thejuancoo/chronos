import { useState } from 'react'
import { useEvents } from '../../shared/context/EventContext'
import DialogShowEvent from '../../shared/components/layout/DialogShowEvent'

export default function Calendar() {
  const { events } = useEvents()

  const actualDate = new Date()
  const month = actualDate.getMonth()
  const year = actualDate.getFullYear()
  const today = actualDate.getDay()

  const [selectedDay, setSelectedDay] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date(year, month, today))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalEventOpen, setIsModalEventOpen] = useState(false)

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const formatDateKey = (year, month, day) => {
    const formattedMonth = String(month + 1).padStart(2, "0")
    const formattedDay = String(day).padStart(2, "0")

    return `${year}-${formattedMonth}-${formattedDay}`
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const previousDate = new Date(year, month, -i)

      const previousYear = previousDate.getFullYear()
      const previousMonth = previousDate.getMonth()
      const day = previousDate.getDate()

      const key = formatDateKey(
        previousYear,
        previousMonth,
        day
      )

      days.push({
        date: day,
        month: previousMonth,
        year: previousYear,
        transactions: events[key] || [],
        isCurrentMonth: false,
        isToday: false
      })
    }

    // Días del mes actual
    const today = new Date()

    for (let i = 1; i <= daysInMonth; i++) {
      const key = formatDateKey(year, month, i)

      const isToday =
        today.getDate() === i &&
        today.getMonth() === month &&
        today.getFullYear() === year

      days.push({
        date: i,
        month,
        year,
        transactions: events[key] || [],
        isCurrentMonth: true,
        isToday
      })
    }

    // Días del siguiente mes
    const remainingDays = 42 - days.length

    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i)

      const nextYear = nextDate.getFullYear()
      const nextMonth = nextDate.getMonth()
      const day = nextDate.getDate()

      const key = formatDateKey(
        nextYear,
        nextMonth,
        day
      )

      days.push({
        date: day,
        month: nextMonth,
        year: nextYear,
        transactions: events[key] || [],
        isCurrentMonth: false,
        isToday: false
      })
    }

    return days
  }

  const calendarDays = getDaysInMonth(currentDate)

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToDay = () => {
    setCurrentDate(new Date())
  }

  const getTotalForDay = (day) => day.transactions.reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="flex-1 space-y-4 h-full p-4 md:p-4 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={previousMonth}
            className="p-2 border border-gray-200 hover:bg-gray-100 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:text-gray-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h2 className="text-3xl font-bold tracking-tight dark:text-white">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button
            onClick={nextMonth}
            className="p-2 border border-gray-200 hover:bg-gray-100 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:text-gray-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4 border rounded-md border-gray-200">
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => {
            const total = getTotalForDay(day)
            // const hasIncome = day.transactions.some((t) => t.type === "income")
            // const hasExpense = day.transactions.some((t) => t.type === "expense")
            // const hasScheduled = day.transactions.some((t) => t.type === "scheduled")
            const hasEvents = day.transactions.length > 0

            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedDay(day)
                  setIsModalEventOpen(true)
                }}
                className={`min-h-25 border rounded-md border-gray-200 p-2 hover:shadow-md text-left transition-all
                  ${!day.isCurrentMonth ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:border-gray-600" : "bg-white dark:bg-black dark:border-gray-600"}
                  ${day.isToday ? "border-gray-600 border-2 dark:border-gray-100 dark:border-4" : ""}
                  ${selectedDay?.date === day.date && selectedDay?.month === day.month ? "ring-2 ring-blue-600" : ""}  
                `}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`text-sm font-medium dark:text-white ${day.isToday ? "flex h-6 w-6 items-center justify-center" : ""}`}
                  >
                    {day.date}
                  </span>
                  {hasEvents && (
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                  {/* {day.transactions.length > 0 && (
                    <div className="flex gap-1">
                      {hasIncome && (
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      )}
                      {hasExpense && (
                        <div className="h-2 w-2 rounded-full bg-rose-500" />
                      )}
                      {hasScheduled && (
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                      )}
                    </div>
                  )} */}
                </div>
                {day.transactions.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {/* {day.transactions.slice(0, 2).map((transaction) => (
                      <div 
                        key={transaction.id}
                        className={`truncate rounded px-1 py-0.5 text-xs ${
                          transaction.type === "income"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : transaction.type === "scheduled"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        }`}
                      >
                        {transaction.title}
                      </div>
                    ))} */}
                    {day.transactions.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="truncate rounded bg-blue-100 px-1 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        {event.title}
                      </div>
                    ))}
                    {day.transactions.length > 2 && (
                      <div className="text-xs text-muted-foreground">+{day.transactions.length - 2} más</div>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
      
      {/*Modals*/}
      <DialogShowEvent
        isModalEventOpen={isModalEventOpen}
        setIsModalEventOpen={setIsModalEventOpen}
      />
    </div>
  )
}
