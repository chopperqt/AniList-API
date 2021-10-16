const calculatedPage = (currentPage,perPage) => +currentPage === 1 ? 0 * perPage : (+currentPage - 1) * perPage


module.exports = {
    calculatedPage
}