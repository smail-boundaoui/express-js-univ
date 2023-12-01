fetch(window.location.origin + '/about', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
})
    .then((res) => res.json())
    .then((data) => {
        const socket = io()
        socket.on('connect', () => socket.emit('joinReq', data.groupId))
        socket.on('receive', (message) => handleNotification())
    })

function handleNotification() {
    const li = document.querySelector('nav .links .notification')
    const span = li.children[1]
    if (li.classList.contains('ntfOn')) {
        if (parseInt(span.innerHTML) >= 8) span.innerHTML = '+9'
        else span.innerHTML = parseInt(span.innerHTML) + 1
    } else {
        span.innerHTML = '1'
        li.classList.add('ntfOn')
    }
}
