import React, { useMemo, useRef } from 'react'
import EventCard from './EventCard/EventCard';
import { convertTimeToTwelveHour } from '../utils';

const SelectedEvents = ({ selected = [], toggleEventSelection }) => {

    const groupBy = useRef('event_category')

    const groupedEvents = useMemo(() => {
        return selected.reduce((acc, event) => {
            const groupKey = groupBy.current
            if (!acc[event[groupKey]]) {
                acc[event[groupKey]] = [];
            }
            acc[event[groupKey]].push(event);
            return acc;
        }, {})
    }, [selected]);

    const renderPrimaryText = (event) => {
        return <>{event.event_name}</>
    }

    const renderSecondaryText = (event) => {
        return <>{'(' + event.event_category + ')'} <br></br>
            {convertTimeToTwelveHour(event.start_time)} - {convertTimeToTwelveHour(event.end_time)}</>
    }

    console.log('selected events rendering')

    return <div>
        <h2 className='category-style'>Selected Events</h2>
        {groupedEvents && Object.keys(groupedEvents).map(category => (
            <div key={category} className="event-list">
                <h2 className='category-style'>{category}</h2>
                <div className="event-grid">
                    {groupedEvents[category].map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            handleEvent={toggleEventSelection}
                            buttonProps={{
                                name: 'Remove',
                                style: {
                                    background: '#e94546',
                                }
                            }}
                            primaryText={renderPrimaryText(event)}
                            secondaryText={renderSecondaryText(event)}
                            hideInitials={false}
                        />
                    ))}
                </div>
            </div>
        ))}
    </div>
}

export default React.memo(SelectedEvents)