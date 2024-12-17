import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Pagination, Space } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined, FilterOutlined } from "@ant-design/icons";
import { fetchMovies } from "../../redux/actions/movieActions";
import { MovieCard } from "../../components/movie-card/movie-card";
import { Loader } from "../../components/loader/loader";
import { FilterForm } from "../../components/filter-form/filter-form";
import { SearchForm } from '../../components/search-form/search-form';
import { CustomButton } from "../../components/custom-button/custom-button";
import { openFilterDrawer } from "../../redux/actions/filterActions";
import { SORTING_VALUES } from "../../constants/sorting_values";
import { getFavorites, toggleFavorites } from '../../redux/utils/localStorage';
import './search.css';
import { useNavigate } from 'react-router-dom';
import { getCorrectNavigate } from '../../utils/helpers/getCorrectNavigate';

export const Search = () => {
    const [currentPageNum, setCurrentPageNum] = useState(1);
    const [dropdownValue, setDropdownValue] = useState(SORTING_VALUES[0]?.value);
    const { filters } = useSelector((state) => state.filters);
    const { keyword } = useSelector((state) => state.keyword);
    const { movies, loading, error, totalItems } = useSelector((state) => state.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchMovies(currentPageNum, dropdownValue, filters, keyword));
        navigate(getCorrectNavigate(currentPageNum, dropdownValue, filters, keyword));
    }, [dispatch, navigate, currentPageNum, dropdownValue, filters, keyword]);

    const [favorites, setFavorites] = useState(getFavorites())

    const updateFavorites = (movie) => {
        toggleFavorites(movie)
        setFavorites(getFavorites())
    }

    const onPageChange = (page) => {
        setCurrentPageNum(page);
    };

    const onSortChange = (sortByValue) => {
        setDropdownValue(sortByValue);
    };

    const handleOpenDrawer = () => {
        dispatch(openFilterDrawer(true));
    };

    const menuItems = SORTING_VALUES.map((item) => ({
        key: item.key,
        label: item.label,
        onClick: () => onSortChange(item.value),
    }));

    if (loading) return <Loader />;
    if (error) return <p>Ошибка:{error}</p>;

    return (
        <div className='main-page_wrapper'>
            <SearchForm />
            <FilterForm />
            <div className='main-page_filter-controls'>
                <CustomButton
                    title={''}
                    icon={<FilterOutlined />}
                    type={'primary'}
                    onClickHandler={handleOpenDrawer}
                />
                <Dropdown menu={{ items: menuItems }} className={'main-page_dropdown'}>
                    <Space>
                        {SORTING_VALUES.find((item) => item.value === dropdownValue)?.label || "Сортировать по..."}
                        <ArrowUpOutlined />
                        <ArrowDownOutlined />
                    </Space>
                </Dropdown>
            </div>
            <div className='main-page_movies-container'>
                {(movies.length > 0) ? movies.map((movie) => (
                    <MovieCard
                        updateFavorites={updateFavorites}
                        isFavorite={Boolean(favorites.find((favoriteMovie) => favoriteMovie.id === movie.kinopoiskId))}
                        key={movie.kinopoiskId}
                        id={movie.kinopoiskId}
                        nameRu={movie.nameRu}
                        nameEn={movie.nameOriginal}
                        year={movie.year}
                        posterUrl={movie.posterUrl}
                        rating={movie.ratingKinopoisk}
                        genres={movie.genres}
                    />
                )) : <p>Результаты не найдены.</p>}
            </div>
            <div className='main-page_pagination'>
                <Pagination
                    current={currentPageNum}
                    onChange={onPageChange}
                    total={totalItems}
                    showSizeChanger={false}
                    pageSize={20}
                    align={'center'}
                />
            </div>
        </div>
    );
};
