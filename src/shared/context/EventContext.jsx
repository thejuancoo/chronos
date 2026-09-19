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
            setError("Ocurrio un error al mostrar los eventos")
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
                date_event: data.date_event,
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
            setError("Hubo un error al crear un evento")
        } finally {
            setLoading(false)
        }
    }

    const editEvent = async (id, eventData) => {
        try {
            setError(null)
            setLoading(true)
            //TODO: Actualizar el estado
            await updateEvent(id, eventData)
            //console.log(eventData)
            //const date = eventData.date_event
            /*setEvents((prevEvents) => ({
                ...prevEvents,
                [date]: prevEvents[date].map((event) => {
                        console.log(event)
                        event.event_id === id ? {...event, ...eventData} : event
                    }
                )
            }))
            console.log(data)
            */

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const dropEvent = async (id, event) => {
        try {
            //TODO: Unicamente pasar la fecha
            setError(null)
            setLoading(true)
            await deleteEvent(id)
            const date = event.date_event
            
            setEvents((prevEvents) => ({
                ...prevEvents,
                [date]: prevEvents[date].filter(
                    event => event.id_event !== id
                )
            }))
            
        } catch (error) {
            setError("No se pudo eliminar el evento. Intenta nuevamente.")
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