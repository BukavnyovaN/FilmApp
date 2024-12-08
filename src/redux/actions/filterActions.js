export const setFilters = (filters) => ({
    type: 'SET_FILTERS',
    payload: { filters : {...filters}, isFilterApplied: true },
});

export const removeFilters = () => ({
    type: 'REMOVE_FILTERS',
    payload: {
        filters : {
            type: 'ALL',
            country: null,
            genre: null,
            yearFrom: null,
            yearTo: null,
        },
        isFilterApplied: false,
    }
})

export const openFilterDrawer = (isDrawerOpen) => ({
    type: 'OPEN_FILTERS',
    payload: {
        isFilterDrawerOpen: isDrawerOpen,
    }
})