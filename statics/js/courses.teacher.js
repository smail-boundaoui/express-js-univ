const translate_courses_teacher = {
    en: ['Module Lessons', 'Add a Lesson', 'Description... (Optional)', 'Add'],
    fr: ['Leçons du module', 'Ajouter une leçon', 'Description... (facultatif)', 'Ajouter'],
    ar: ['دروس المادة', 'اضافة درس', 'الوصف... (اختياري)', 'اضافة'],
}

document.getElementById('module').addEventListener('change', function () {
    const module = modules[this.value]

    // Lessons

    let lessons = ''

    for (let i = 0; i < module.lessons.length; i++) {
        const lesson = module.lessons[i]

        lesson.date = new Date(lesson.date)

        let files = ''

        lesson.files.forEach((file) => {
            files += `<div class="file"><a class="${fileExtension(
                file
            )}" href="/lessons/${file}" target="_blank"><bdi>
            ${file.slice(file.indexOf('-') + 1, file.length)}</bdi></a></div>`
        })

        lessons += `
            <div class="course">
                <div class="date"><bdi>${lesson.date.getDate()}-${
            lesson.date.getMonth() + 1
        }-${lesson.date.getFullYear()}</bdi></div>
                ${lesson.desc ? '<p>' + lesson.desc + '</p>' : ''}
                ${files}
                <button class="delete" data-index="${i}" title="Remove" 
                    onclick="deleteLesson(this,'${module._id}')"
                ></button>
            </div>    
        `
    }

    // Content

    this.nextElementSibling.innerHTML += `
        <div class="body">
            <h3>${translate_courses_teacher[lang][0]}</h3>
            <div class="add-course">
                <div class="title">${translate_courses_teacher[lang][1]}</div>
                <form action="/courses/upload" method="POST" enctype="multipart/form-data">
                <textarea name="desc" placeholder="${translate_courses_teacher[lang][2]}"></textarea>
                    <input type="hidden" name="moduleId" value="${module._id}">    
                    <input type="hidden" name="branchIndex" value="${this.value}">    
                    <input type="file" name="files" onchange="lessonInput(this)" multiple/><button type="submit" disabled>${translate_courses_teacher[lang][3]}</button>
                </form>
            </div>
            ${lessons}
        </div>
    `
})

// Add Lesson

function lessonInput(input) {
    if (input.value) input.nextElementSibling.disabled = false
    else input.nextElementSibling.disabled = true
}

// Delete Lesson

async function deleteLesson(btn, moduleId) {
    btn.disabled = true
    await fetch(window.location.origin + '/courses', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `lessonIndex=${btn.getAttribute('data-index')}&moduleId=${moduleId}`,
    })
    const dltBtns = Array.from(document.querySelectorAll('.courses .body .course button'))
    dltBtns.splice(dltBtns.indexOf(btn), 1)
    for (let i = 0; i < dltBtns.length; i++) dltBtns[i].setAttribute('data-index', i)
    btn.parentElement.remove()
}
