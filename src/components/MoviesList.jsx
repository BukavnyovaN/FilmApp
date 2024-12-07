import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchMovies } from "../redux/actions/movieActions";

export const MoviesList = () => {
    const dispatch = useDispatch();
    const { movies, loading, error, currentPage, totalPages } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(fetchMovies(currentPage + 1));
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            dispatch(fetchMovies(currentPage - 1));
        }
    };

    if (loading) {
        return <p>Загрузка...</p>
    }

    if (error) {
        return <p>Ошибка:{error}</p>
    }

    return (
        <>
            <h2>Список фильмов</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.kinopoiskId}>
                        <h3>{movie.nameRu || movie.nameOriginal}</h3>
                        <p>Год: {movie.year}</p>
                        <img src={movie.posterUrlPreview} alt={movie.nameRu} />
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Предыдущая страница
                </button>
                <span>
                    Страница {currentPage} из {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Следующая страница
                </button>
            </div>
        </>
    );

};