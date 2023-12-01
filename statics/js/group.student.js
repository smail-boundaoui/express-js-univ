const socket = io()

const msgsContainer = document.querySelector('.messeges')

socket.on('connect', () => socket.emit('joinReq', groupId))

const handleEnterKey = (event, input) =>
    event.key === 'Enter' ? input.nextElementSibling.click() : null

async function sendMsg(element, msgType) {
    const message = {
        sender: [userId, username],
        msg: [msgType, null],
        date: undefined,
    }

    if (msgType == 'text') {
        const textInput = element.previousElementSibling
        if (textInput.value) {
            message.msg[1] = textInput.value
            emitSend(groupId, message)
            textInput.value = null
        } else return
    } else if ((msgType == 'file' || msgType == 'image') && element.files.length > 0) {
        const data = new FormData()
        data.append('file', element.files[0])
        element.value = null
        const req = new XMLHttpRequest()
        req.open('POST', window.location.origin + '/group/upload')
        req.send(data)
        req.onload = async function (e) {
            if (req.status == 200) {
                const { filename } = await JSON.parse(req.response)
                if (filename) {
                    message.msg[1] = filename
                    emitSend(groupId, message)
                }
            }
        }
    }
}

const emitSend = (groupId, message) => socket.emit('send', groupId, message)

socket.on('receive', (message) => {
    message.date = new Date(message.date)
    msgsContainer.innerHTML += displayMsg(message)
    scrollDown(msgsContainer)
})

function displayMsg(message) {
    let body

    if (message.msg[0] == 'text') {
        body = `<div class="body">${message.msg[1]}</div>`
    } else if (message.msg[0] == 'file') {
        body = `
            <div class="body file">
                <a href="/groups/${message.msg[1]}" target="_blank" class="${fileExtension(
            message.msg[1]
        )}">${message.msg[1].slice(message.msg[1].indexOf('-') + 1, message.msg[1].length)}</a>
            </div>
        `
    } else if (message.msg[0] == 'image') {
        body = `
            <div class="body image">
                <a href="/groups/${message.msg[1]}" target="_blank">
                    <img src="/groups/${message.msg[1]}" alt="image"/>
                </a>
            </div>
        `
    } else return null

    return `
        <div class="msg ${message.sender[0] == userId ? 'me' : 'out'}">
            <div class="head">
                <span class="name">${message.sender[1]}</span> <span class="date">
                ${message.date.getDate()}-${
        message.date.getMonth() + 1
    }-${message.date.getFullYear()} | ${message.date.getHours()}:${message.date.getMinutes()}
                </span>
            </div>
            ${body}
        </div>
    `
}

const scrollDown = (element) => (element.scrollTop = element.scrollHeight)

scrollDown(msgsContainer)
