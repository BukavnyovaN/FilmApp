export const getCorrectNavigate = (currentPageNum, dropdownValue, filters, keyword) => {
    const { type, country, genre, yearFrom, yearTo } = filters;
    let navString = `/search?`;
    if (keyword) navString += `keyword=${encodeURIComponent(keyword)}`;
    if (type && type !== 'ALL') navString += `&type=${type}`;
    if (country) navString += `&country=${country}`;
    if (genre) navString += `&genre=${genre}`;
    if (yearFrom) navString += `&yearFrom=${yearFrom}`;
    if (yearTo) navString += `&yearTo=${yearTo}`;
    if (currentPageNum) navString += `&page=${currentPageNum}`;
    if (dropdownValue) navString += `&sortBy=${dropdownValue}`;
    return navString;
}