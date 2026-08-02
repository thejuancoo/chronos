import { useState } from 'react'

export default function Calendar() {
  const transactionsCalendar = {
    "2026-8-5": [
      { id: "1", title: "Supermercado", amount: -120.5, type: "expense", category: "Alimentación", time: "10:30" },
    ]
  }

  const actualDate = new Date()
  const month = actualDate.getMonth()
  const year = actualDate.getFullYear()
  const today = actualDate.getDay()

  const [selectedDay, setSelectedDay] = useState(null)
  const [currentDate, setCurrentDay] = useState(new Date(year, month, today))
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const getDaysInMonth = date => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeak = firstDay.getDay()

    const days = []

    //Dias del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for(let i = startingDayOfWeak - 1; i >= 0; i--){
      const date = prevMonthLastDay - i
      const key = `${year}-${month}-${date}`
      days.push({
        date,
        month: month - 1,
        transactions: transactionsCalendar[key] || [],
        isCurrentMonth: false,
        isToday: false
      })
    }

    //Día del mes actual
    const today = new Date()
    for(let i = 1; i <= daysInMonth; i++){
      const key = `${year}-${month + 1}-${i}`
      const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year
      days.push({
        date: i,
        month,
        transactions: transactionsCalendar[key] || [],
        isCurrentMonth: true,
        isToday
      })
    }

    //Dias del mes siguiente
    const remainingDays = 42 - days.length
    for(let i = 1; i <= remainingDays; i++){
      const key = `${year}-${month + 2}-${i}`
      days.push({
        date: i,
        month: month + 1,
        transactions: transactionsCalendar[key] || [],
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
            const hasIncome = day.transactions.some((t) => t.type === "income")
            const hasExpense = day.transactions.some((t) => t.type === "expense")
            const hasScheduled = day.transactions.some((t) => t.type === "scheduled")

            return (
              <button
                key={index}
                onClick={() => setSelectedDay(day)}
                className={`min-h-[100px] border rounded-md border-gray-200 p-2 hover:shadow-md text-left transition-all
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
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
