const translate_courses = {
    en: [
        'Module Information',
        'Name : ',
        'Description : ',
        'Professor : ',
        'Professor Email : ',
        'Coeffession : ',
        'Credit : ',
        'Ressources : ',
    ],
    fr: [
        'Informations sur les modules',
        'Nom : ',
        'La Description : ',
        'Professeur : ',
        'Courriel du Professeur : ',
        'Coeffession : ',
        'Crédit : ',
        'Ressources : ',
    ],
    ar: [
        'معلومات المادة',
        'الاسم : ',
        'الوصف : ',
        'الاستاذ : ',
        'بريد الاستاذ : ',
        'المعامل : ',
        'الاعتماد : ',
        'المصادر : ',
    ],
}

document.getElementById('module').addEventListener('change', function () {
    const module = modules[this.value]

    // Ressources

    let ressources = ''

    for (const key in module.ressources)
        ressources += `<a href="/${module.ressources[key]}" target="_blank">${key}</a> ,`

    ressources = ressources.slice(0, ressources.length - 1)

    // Content

    this.nextElementSibling.innerHTML = `
    <div class="head">
        <h3>${translate_courses[lang][0]}</h3>
        <ul>
            <li><span>${translate_courses[lang][1]}</span> ${module.name}</li>
            <li>
                <span>${translate_courses[lang][2]}</span>
                <p>${module.description}</p>
            </li>
            <li><span>${translate_courses[lang][3]}</span> ${module.teacher.name}</li>
            <li>
                <span>${translate_courses[lang][4]}</span>
                <a href="" target="_blank">${module.teacher.email}</a>
            </li>
            <li><span>${translate_courses[lang][5]}</span> ${module.coeffession}</li>
            <li><span>${translate_courses[lang][6]}</span> ${module.credit}</li>
            <li>
                <span>${translate_courses[lang][7]}</span> 
                ${ressources}
            </li>
        </ul>
    </div>
    `
})
