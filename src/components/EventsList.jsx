import React, { useEffect, useMemo, useRef, useState } from 'react'
import SearchBar from './SearchBar'
import { EVENT_PAGE } from '../constants'
import EventCard from './EventCard/EventCard'
import jsonData from '../static.json'
import { convertTimeToTwelveHour, debounce } from '../utils'

const EventsList = ({ eventsData, toggleEventSelection }) => {
    const { data } = jsonData
    const [events, setEvents] = useState([])
    const groupBy = useRef('event_category')

    console.log('event list rendered')

    useEffect(() => {
        setEvents(eventsData)
    }, [eventsData])

    const handleSearch = (e) => {
        if (e.target.value) {
            const filteredEvents = data.filter(event =>
                event.event_name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setEvents(filteredEvents)
        } else {
            setEvents(data)
        }
    }

    const debouncedSearch = debounce(handleSearch, 500)

    const groupedEvents = useMemo(() => {
        return events.reduce((acc, event) => {
            const groupKey = groupBy.current
            if (!acc[event[groupKey]]) {
                acc[event[groupKey]] = [];
            }
            acc[event[groupKey]].push(event);
            return acc;
        }, {})
    }, [events]);

    const renderPrimaryText = (event) => {
        return <>{event.event_name}</>
    }

    const renderSecondaryText = (event) => {
        return <>{'(' + event.event_category + ')'} <br></br>
            {convertTimeToTwelveHour(event.start_time)} - {convertTimeToTwelveHour(event.end_time)}</>
    }

    return <div>
        <header className="header">
            <h2>
                {EVENT_PAGE.LEFT_SECTION_HEADING}
            </h2>
            <div>
                <SearchBar searchCallback={debouncedSearch} />
            </div>
        </header>
        {groupedEvents && Object.keys(groupedEvents).map(category => (
            <div key={category} className="event-list">
                <h2 className='category-style'>{category}</h2>
                <div className="event-grid">
                    {groupedEvents[category].map(event => (
                        <EventCard
                            buttonProps={{
                                name: 'Select',
                                style: {
                                    background: '#47891a',
                                }
                            }}
                            key={event.id}
                            event={event}
                            handleEvent={toggleEventSelection}
                            primaryText={renderPrimaryText(event)}
                            secondaryText={renderSecondaryText(event)}
                            hideInitials={false}
                            // cardProps={{
                            //     style: { background: 'white', color: 'black', border: '1px solid black' }
                            // }}
                        />
                    ))}
                </div>
            </div>
        ))}
    </div>
}

export default EventsList