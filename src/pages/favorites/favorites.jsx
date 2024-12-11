import React, { useState } from 'react';
import { MovieCard } from '../../components/movie-card/movie-card';
import './favorite.css'
import { getFavorites, toggleFavorites } from '../../redux/utils/localStorage';

export function Favorites() {

    const [favorites, setFavorites] = useState(getFavorites())

    const updateFavorites = (movie) => {
        toggleFavorites(movie)
        setFavorites(getFavorites())
    };

    return (
        <div className='favorite-page_wrapper'>
            <div className='favorite-page_movies-container'>
                {favorites.map(movie => (
                    <MovieCard
                        isFavorite={true}
                        updateFavorites={updateFavorites}
                        key={movie.id}
                        id={movie.id}
                        nameRu={movie.nameRu}
                        nameEn={movie.nameEn}
                        year={movie.year}
                        posterUrl={movie.posterUrl}
                        rating={movie.rating}
                        genres={movie.genres}
                    />
                ))}
            </div>
        </div>
    );
}