export function getDateNowXXYY (){
        const date = new Date()
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "numeric" })
}