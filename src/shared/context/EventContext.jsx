import { useState, useContext, createContext, useEffect } from "react";
import { getAllEvents } from "../../service/eventService";

const EventContext = createContext()

export const EventProvider = ({children}) => {
    const [events, setEvents] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchEvents = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getAllEvents()
            setEvents(data)
        } catch (error) {
            console.log(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <EventContext.Provider
            value={{
                events,
                setEvents,
                loading,
                setLoading,
                fetchEvents
            }}
        >
            {children}
        </EventContext.Provider>
    )
}

export const useEvents = () => {
    const context = useContext(EventContext)

    return context
}