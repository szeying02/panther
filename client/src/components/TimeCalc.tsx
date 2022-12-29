export default function TimeCalc(seconds : number) : string {
    const minute = Math.floor(seconds / 60);
    if (minute === 0) {
        return String(seconds) + " seconds";
    } 

    const hour = Math.floor(minute / 60);
    if (hour === 0) {
        return String(minute) + " minutes";
    }

    const day = Math.floor(hour / 24);
    if (day === 0) {
        return String(hour) + " hours";
    }

    const month = Math.floor(day / 30);
    if (month === 0) {
        return String(day) + " days";
    }

    const year = Math.floor(month / 12);
    if (year === 0) {
        return String(month) + " months";
    }

    return String(year) + " years";
}