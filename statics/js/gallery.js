const popupImages = []
document.querySelectorAll('.gallery .images img').forEach((img) => popupImages.push(img.src))
let popupCounter = 0

document.querySelector('.gallery .popup .right').onclick = function () {
    this.nextElementSibling.src = popupImages[++popupCounter]
    document.querySelector('.gallery .popup .text span').textContent = popupCounter + 1
    if (popupCounter === popupImages.length - 1) {
        this.style.display = 'none'
        this.previousElementSibling.style.display = 'block'
    } else {
        this.style.display = 'block'
        this.previousElementSibling.style.display = 'block'
    }
}

document.querySelector('.gallery .popup .left').onclick = function () {
    this.nextElementSibling.nextElementSibling.src = popupImages[--popupCounter]
    document.querySelector('.gallery .popup .text span').textContent = popupCounter + 1
    if (popupCounter === 0) {
        this.style.display = 'none'
        this.nextElementSibling.style.display = 'block'
    } else {
        this.style.display = 'block'
        this.nextElementSibling.style.display = 'block'
    }
}

document.querySelector('.gallery .popup .close').onclick = function () {
    document.querySelector('.body-overlay').classList.remove('active')
    document.querySelector('.gallery .popup').classList.remove('active')
}

document.querySelector('.body-overlay').onclick = function () {
    this.classList.remove('active')
    document.querySelector('.gallery .popup').classList.remove('active')
}

document.querySelectorAll('.gallery .images img').forEach((el) => {
    el.addEventListener('click', (e) => {
        document.querySelector('.gallery .popup').style.top =
            'calc(50% + ' + window.pageYOffset + 'px)'
        document.querySelector('.body-overlay').classList.add('active')
        document.querySelector('.gallery .popup').classList.add('active')
        document.querySelector('.gallery .popup .image img').src = e.target.src
        popupCounter = parseInt(e.target.dataset.counter)
        document.querySelector('.gallery .popup .text span').textContent = popupCounter + 1
        switch (popupCounter) {
            case 0:
                document.querySelector('.gallery .popup .left').style.display = 'none'
                document.querySelector('.gallery .popup .right').style.display = 'block'
                break
            case popupImages.length - 1:
                document.querySelector('.gallery .popup .right').style.display = 'none'
                document.querySelector('.gallery .popup .left').style.display = 'block'
                break
            default:
                document.querySelector('.gallery .popup .right').style.display = 'block'
                document.querySelector('.gallery .popup .left').style.display = 'block'
                break
        }
    })
})
