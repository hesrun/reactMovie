export default function dateFormat(date) {
    const newDate = new Date(date);
    const formatted = newDate.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        day: 'numeric',
        year: 'numeric',
    });
    return formatted;
}
