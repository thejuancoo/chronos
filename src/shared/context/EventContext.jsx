import { useState, useContext, createContext, useEffect } from "react";
import { 
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
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

    useEffect(() => {
        fetchEvents()
    }, [])

    const addEvent = async (eventData) => {
        try {
            setError(null);

            const data = await createEvent(eventData);

            const newEvent = {
                id_event: data.id_event,
                title_event: data.title_event,
                description_event: data.description_event,
                time_event: data.time_event,
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

    const editEvent = async (id, eventData) => {
        try {
            //TODO: Actualizar el estado
            const data = await updateEvent(id, eventData)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const dropEvent = async (id) => {
        try {
            //TODO: Actualizar el estado
            const data = await deleteEvent(id)
            console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <EventContext.Provider
            value={{
                events,
                setEvents,
                loading,
                setLoading,
                fetchEvents,
                addEvent,
                editEvent,
                dropEvent
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