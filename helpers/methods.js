/**
 *  Метод который возвращает кол-во аниме , которую будут пропущены в методе skip
 * @param {Number} currentPage - Текущая страница 
 * @param {Number} perPage - Кол-во аниме за страницу 
 * @returns  Кол-во skip аниме
 */
const calculatedPage = (currentPage,perPage, totalPage) => {
    const page = +totalPage >= +currentPage ? totalPage : currentPage

    if (+page === 1) {
        return 0 * perPage
    }
    return (+page - 1) * perPage
}
/**
 *  Метод который собирает правильную пагинацию и возвращает её 
 * @param {Number} currentPage - Текущая страница 
 * @param {Number} perPage - Кол-во аниме на стараницу
 * @returns  Объект с собранной пагинаций для отправки
 */
const makePagination = (total_page, page, per_page) => {
    return {
        total_page: Math.ceil(total_page / per_page),
        page: +page,
        per_page: +per_page,
    }
}
/**
 *  Метод который возвращает запрос на поиск  по указнному полю в базе данных
 * @param {String} searchField - Поле ко котрому будет происходить поиск 
 * @param {String} value - Значение которое будет искать 
 * @returns  Объект поиск по полю
 */
const findItemInDB = (searchField, value) => {
    return {[`${searchField}`]: {"$regex": value, "$options": "i"}}
}


module.exports = {
    calculatedPage,
    makePagination,
    findItemInDB,
}