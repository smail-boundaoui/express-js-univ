const fileExtension = function (fileName) {
    extension = fileName.slice(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase()
    switch (extension) {
        case 'pdf':
            return 'pdf'
        case 'doc':
        case 'docx':
            return 'word'
        case 'ppt':
            return 'ppt'
        case 'xlsx':
            return 'excel'
        case 'mp4':
        case 'mov':
        case 'wmv':
        case 'avi':
        case 'flv':
        case 'mkv':
        case 'swf':
            return 'video'
        case 'mp3':
        case 'mpeg-1':
        case 'wav':
        case 'aiff':
        case 'dsd':
        case 'mpeg-4':
        case 'alac':
            return 'audio'
        case 'rar':
        case '7z':
        case 'zip':
            return 'rar'
        case 'html':
        case 'css':
        case 'js':
        case 'java':
        case 'php':
        case 'c':
        case 'pug':
        case 'py':
        case 'php':
        case 'dart':
        case 'sass':
        case 'xml':
        case 'htm':
            return 'code'
        default:
            return 'none'
    }
}
