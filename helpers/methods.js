/**
 *  Метод который возвращает кол-во аниме , которую будут пропущены в методе skip
 * @param {Number} currentPage - Текущая страница 
 * @param {Number} perPage - Кол-во аниме за страницу 
 * @returns  Кол-во skip аниме
 */
const calculatedPage = (currentPage,perPage, totalPage) => {
    // const page = +totalPage >= +currentPage ? totalPage : currentPage

    if (+currentPage === 1) {
        return 0 * perPage
    }
    return (+currentPage - 1) * perPage
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
 * @param {String | Number} value - Значение которое будет искать 
 * @returns  Объект поиск по полю
 */
const findItemInDB = (searchField, value) => {
    return {[`${searchField}`]: {"$regex": value, "$options": "i"}}
}
/**
 *  Метод создаёт запрос и возвращает его
 * @param {field: String, value: String} search - Объект который принимает значение field - поле по которому будет поиск и value - значение поля 
 * @param {Number | String} from - Дата от которой будет поиск
 * @param {Number | String} to - Дата до которой будет поиск
 * @returns  Запрос для базы данных
 */
const makeQuery = (search, from, to) => {
    console.log(search)

    if (search?.field && search?.value && from && to) return {[search.field]: {"$regex": search.value, "$options": "i"}, createdAt: {"$gte": from, "$lt": to}}
    if (search?.field && search?.value && from) return {[search.field]: {"$regex": search.value, "$options": "i"}, createdAt: {"$gte": from}}
    if (search?.field && search?.value && to) return {[search.field]: {"$regex": search.value, "$options": "i"}, createdAt: {"$lt": to}}
    if (search?.field && search?.value) return {[search.field]: {"$regex": search.value, "$options": "i"}}
    if (from && to)  return {createdAt: {"$gte": from, "$lt": to}}
    if (from) return {createdAt: {"$gte": from}}
    if (to) return {createdAt: {"$gte": from}}
    return {}  
}
/**
 *  Метод возвращает регулярное выражение которое не чувствительностьно к регистру
 * @param {String}  String -  Строка которая будет вставлена в регулярное выражение
 * @returns  Регулярное выражение
 */
const makeReq = (string) => {
    return new RegExp(["^", string, "$"].join(""), "i");
}

module.exports = {
    calculatedPage,
    makePagination,
    findItemInDB,
    makeQuery,
    makeReq,
}