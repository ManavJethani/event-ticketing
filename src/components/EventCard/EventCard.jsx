import React from 'react'
import './EventCard.css'

const EventCard = ({ event, handleEvent, buttonProps = {}, primaryText, secondaryText, hideInitials = false, cardProps = {} }) => {
    const { event_name, event_category, id, start_time, end_time, } = event

    return <div className='card-wrapper' style={cardProps.style}>
        {!hideInitials && <div className='initials'>
            <div className='initial-text'>
                {event_category[0]}
            </div>
        </div>}
        {!hideInitials && <div className="divider"></div>}
        <div className='detail-section'>
            <div className='card-details'>
                <div className='primary-text'>
                    {primaryText}
                </div>
                <div className='secondary-text'>
                    {secondaryText}
                </div>
            </div>
            <div className='action-btn-container'>
                <button style={buttonProps.style} className='action-btn-style' onClick={() => handleEvent(event)}>
                    {buttonProps.name}
                </button>
            </div>
        </div>
    </div>
}

export default EventCard