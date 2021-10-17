const calculatedPage = (currentPage,perPage) => +currentPage === 1 ? 0 * perPage : (+currentPage - 1) * perPage
const makePagination = (total_page, page, per_page) => {
    return {
        total_page: Math.ceil(total_page / per_page),
        page: +page,
        per_page: +per_page,
    }
}


module.exports = {
    calculatedPage,
    makePagination
}