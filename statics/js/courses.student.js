const translate_courses_student = {
    en: ['Module Lessons', 'Professor', 'has not added any lessons!'],
    fr: ['Leçons du module', 'Professeur', "n'a ajouté aucune leçon!"],
    ar: ['دروس المادة', 'الأستاذ', 'لم يضف أي درس!'],
}

document.getElementById('module').addEventListener('change', function () {
    const module = modules[this.value]

    // Lessons

    let lessons = ''

    module.lessons.forEach((lesson) => {
        let files = ''
        lesson.date = new Date(lesson.date)
        lesson.files.forEach((file) => {
            files += `<div class="file"><a class="${fileExtension(
                file
            )}" href="/lessons/${file}" target="_blank"><bdi>${file.slice(
                file.indexOf('-') + 1,
                file.length
            )}</bdi></a></div>`
        })

        lessons += `
            <div class="course">
                <div class="date"><bdi>${lesson.date.getDate()}-${
            lesson.date.getMonth() + 1
        }-${lesson.date.getFullYear()}</bdi></div>
                ${lesson.desc ? '<p>' + lesson.desc + '</p>' : ''}
                ${files}
            </div>
        `
    })

    // Content

    this.nextElementSibling.innerHTML += `
        <div class="body">
            <h3>${translate_courses_student[lang][0]}</h3>
            ${
                module.lessons.length > 0
                    ? lessons
                    : `<div>${translate_courses_student[lang][1]} <b><bdi>${module.teacher.name}</bdi></b> ${translate_courses_student[lang][2]}</div>`
            }
        </div>
    `
})
