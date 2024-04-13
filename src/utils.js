export const debounce = function (cb, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

export const convertTimeToTwelveHour = function (datetimeString) {
    const datetime = new Date(datetimeString);
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes().toString().padStart(2, '0');

    // Convert hours to 12-hour format
    let hours12 = hours % 12 || 12;
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${hours12.toString().padStart(2, '0')}:${minutes} ${ampm}`
}

export const compareDates = function (startTime1, endTime1, startTime2,  endTime2) {
    console.log('check dates', startTime1, startTime2)
    const start1 = new Date(startTime1).getTime();
    const end1 = new Date(endTime1).getTime();
    const start2 = new Date(startTime2).getTime();
    const end2 = new Date(endTime2).getTime();
    return (start1 < end2 && end1 > start2);
}