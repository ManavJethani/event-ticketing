import React, { useState } from 'react'
import EventsList from '../components/EventsList'
import SelectedEvents from '../components/SelectedEvents'
import './Events.css'
import jsonData from '../static.json'
import { compareDates } from '../utils'
import { EVENT_PAGE } from '../constants'

const Events = () => {

    const { data } = jsonData
    const [eventsData, setEventsData] = useState(data)
    const [selectedEvent, setSelectedEvent] = useState([])


    // check if event timings are clashing
    const checkValidEventTime = (selectedEvent, start_time, end_time) => {
        let isConflicting = false
        for (let i = 0; i < selectedEvent.length; i++) {
            let end_time1 = selectedEvent[i].end_time
            let start_time1 = selectedEvent[i].start_time
            isConflicting = compareDates(start_time1, end_time1, start_time, end_time)
            if (isConflicting) {
                return isConflicting
            }
        }
        return isConflicting
    }

    // Function to toggle event selection
    const toggleEventSelection = event => {
        let eventIndex = selectedEvent.findIndex(eve => eve.id === event.id)
        if (eventIndex !== -1) {
            setSelectedEvent(selectedEvent.filter(eve => eve.id !== event.id));
            setEventsData([...eventsData, event])
        } else {
            if (selectedEvent.length < 3) {
                let isConflicting = checkValidEventTime(selectedEvent, event.start_time, event.end_time)
                if(isConflicting){
                    alert(EVENT_PAGE.CONFLICTMSG)
                } else {
                    setSelectedEvent([...selectedEvent, event]);
                    setEventsData(eventsData.filter(eve => eve.id !== event.id))
                }
                
            } else {
                alert(EVENT_PAGE.MAXTHREE)
            }
        }
    };

    return <div className='event-container'>
        <div className='left-section'>
            <EventsList eventsData={eventsData} toggleEventSelection={toggleEventSelection} />
        </div>
        <div className='right-section'>
            <SelectedEvents selected={selectedEvent} toggleEventSelection={toggleEventSelection}  />
        </div>
    </div>
}

export default Events