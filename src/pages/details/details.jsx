import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoints";
import { API_KEY } from "../../redux/actions/movieActions";
import { Loader } from "../../components/loader/loader";
import { Descriptions, Flex, Image, Rate, Tag, Tooltip } from "antd";
import { CustomButton } from "../../components/custom-button/custom-button";
import { HeartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import './details.css';
import { getRandomColor } from "../../utils/helpers/getRandomColor";
import { StaffCard } from "../../components/staff-card/staff-card";

export function Details() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [movieStaff, setMovieStaff] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const [movieDetailsResponse, movieStaffResponse] = await Promise.all([
                    axios.get(ENDPOINTS.BASE_URL + ENDPOINTS.FILMS + ENDPOINTS.ROOT + id, {
                        headers: {
                            'X-API-KEY': API_KEY,
                        },
                    }),
                    axios.get(ENDPOINTS.STAFF + id, {
                        headers: {
                            'X-API-KEY': API_KEY,
                        },
                    }),
                ]);

                const limitedStaff = movieStaffResponse.data.filter((staff) => staff.professionText === 'Актеры').slice(0, 5);
                setMovieDetails(movieDetailsResponse.data);
                setMovieStaff(limitedStaff);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <Loader />;
    }
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div className='details-page_container'>
            <div className='details-page_header'>
                <h1>{movieDetails.nameRu || movieDetails.nameEn || movieDetails.nameOriginal}, {movieDetails.year}</h1>
                {isAuthenticated &&
                    <CustomButton
                        type="default"
                        icon={<HeartOutlined />}
                        title={''}
                        onClickHandler={() => {
                            console.log(id)
                        }}
                    />
                }
            </div>
            <div className='details-page_body'>
                <Image
                    width={260}
                    src={movieDetails.posterUrl}
                    preview={false}
                    alt={movieDetails.nameOriginal}
                />
                <div className='details-page_info'>
                    <Descriptions bordered={true} colon={false} layout={'horizontal'} column={1}>
                        {
                            movieDetails.ratingKinopoisk &&
                            <Descriptions.Item label="Рейтинг Кинопоиск" labelStyle={{ width: '20%' }}>
                                <Tooltip title={movieDetails.ratingKinopoisk}>
                                    <Rate disabled
                                        defaultValue={movieDetails.ratingKinopoisk}
                                        allowHalf={true}
                                        count={10}
                                    />
                                </Tooltip>
                            </Descriptions.Item>
                        }
                        {
                            movieDetails.ratingImdb &&
                            <Descriptions.Item label="Рейтинг IMDb" labelStyle={{ width: '20%' }}>
                                <Tooltip title={movieDetails.ratingImdb}>
                                    <Rate disabled
                                        defaultValue={movieDetails.ratingImdb}
                                        allowHalf={true}
                                        count={10}
                                    />
                                </Tooltip>
                            </Descriptions.Item>
                        }
                        {
                            movieDetails.countries.length &&
                            <Descriptions.Item label="Страны" labelStyle={{ width: '20%' }}>
                                {movieDetails.countries.map(country => (
                                    <div key={country.country}>{country.country}</div>
                                ))}
                            </Descriptions.Item>
                        }
                        {
                            movieDetails.genres.length &&
                            <Descriptions.Item label="Жанры" labelStyle={{ width: '20%' }}>
                                <Flex gap="4px 0" wrap>
                                    {movieDetails.genres.map(genre => (
                                        <Tag color={getRandomColor()} key={genre.genre}>{genre.genre}</Tag>
                                    ))}
                                </Flex>
                            </Descriptions.Item>
                        }
                        {
                            movieDetails.description &&
                            <Descriptions.Item label="Описание" labelStyle={{ width: '20%' }}>
                                {movieDetails.description}
                            </Descriptions.Item>
                        }
                    </Descriptions>
                    {
                        Array.isArray(movieStaff) &&
                        !!movieStaff.length &&
                        <>
                            <h3 className='details-page_staff-title'>Актёры</h3>
                            <div className='details-page_staff'>
                                {movieStaff.map((actor) =>
                                    <StaffCard id={actor.id}
                                        nameEn={actor.nameEn}
                                        nameRu={actor.nameRu}
                                        posterUrl={actor.posterUrl}
                                        professionText={actor.professionText}
                                    />
                                )}
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}
