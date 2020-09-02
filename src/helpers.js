//you can use it for FORMAT DATE

export function formatDate(date) {
    const dateFormat = new Intl.DateTimeFormat('UK', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    return dateFormat.format(new Date(date))
}