import { GENRES } from '../../constants/genres';   // Adjust import path
import { COUNTRIES } from '../../constants/countries'; // Adjust import path

export function HistoryItem({ item }) {
    const { filters } = item;

    const genreObj = GENRES.find(g => g.id === filters.genre);
    const genreString = genreObj ? genreObj.genre : '';
    const countryObj = COUNTRIES.find(c => c.id === filters.country);
    const countryString = countryObj ? countryObj.country : '';
    const typeString = filters.type !== 'ALL' || '';
    const yearFromString = filters.yearFrom || '';
    const yearToString = filters.yearTo || '';

    const filterParts = [typeString, countryString, genreString, yearFromString, yearToString].filter(Boolean);
    if (filterParts.length === 0) {
        filterParts.push('Нет фильтров');
    }

    return (
        <div>
            <p><strong>Фильтры:</strong> {filterParts.join(' ')}</p>
        </div>
    );
}
