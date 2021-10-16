const calculatedPage = (currentPage,perPage) => +currentPage === 1 ? 0 * perPage : +currentPage * perPage


module.exports = {
    calculatedPage
}