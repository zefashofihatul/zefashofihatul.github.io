const convertUTCDate = date => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} ${formatAMPM(date)}`
}

const formatAMPM = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours:hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + 'WIB';
    return strTime;
}

export const convertUTCDateToLocalDate = date => {
    let newDate = new Date(date.getTime());
    let hours = date.getHours();
    newDate.setHours(hours);
    const tgl = convertUTCDate(newDate);
    return tgl;   
}

