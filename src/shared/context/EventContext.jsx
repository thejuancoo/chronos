import { useState, useContext, createContext, useEffect } from "react";
import { 
    getAllEvents,
    createEvent,
    deleteEvent
} from "../../service/eventService";

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

    const addEvent = async (eventData) => {
        try {
            setError(null);

            const data = await createEvent(eventData);

            const newEvent = {
                id: data.id_event,
                title: data.title_event,
                description: data.description_event,
                time: data.time_event,
            };

            setEvents((currentEvents) => {
                const date = data.date_event;

                return {
                    ...currentEvents,
                    [date]: [
                        ...(currentEvents[date] || []),
                        newEvent,
                    ],
                };
            });

            return data;
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const dropEvent = async (id) => {
        try {
            const data = await deleteEvent(id)
            console.log(data)
        } catch (error) {
            console.log(error)
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
                fetchEvents,
                addEvent
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