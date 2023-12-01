document
    .querySelectorAll('.messeges .msg .body.file a')
    .forEach((a) => a.classList.add(eval(a.getAttribute('data-function'))))
