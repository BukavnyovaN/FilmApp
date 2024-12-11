import { Card } from 'antd';
import './movie-card.css';
import { HeartFilled, HeartOutlined, StarFilled } from "@ant-design/icons";
import { CustomButton } from "../custom-button/custom-button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";

export const MovieCard = ({ id, nameRu, nameEn, year, posterUrl, rating, genres,
    isFavorite, updateFavorites }) => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(PATHS.SINGLE_DETAIL + id);
    };

    const handleButtonClick = (event, movieData) => {
        event.stopPropagation();
        updateFavorites(movieData);
    }

    return (
        <Card
            hoverable
            size={'small'}
            style={{ width: 260 }}
            cover={<img alt={nameRu || nameEn} src={posterUrl} style={{ maxHeight: '350px' }} />}
            key={id}
            title={nameRu || nameEn}
            onClick={() => { handleCardClick(id) }}
            extra={<div>{year}</div>}
        >
            <div className='movie-card_info'>
                <div className='movie-card_stats'>
                    <div>
                        {
                            rating &&
                            <>
                                <StarFilled style={{ color: '#ffa500', fontSize: '20px' }} />
                                {rating}
                            </>
                        }

                    </div>
                    <div>
                        {isAuthenticated &&
                            <CustomButton
                                type="default"
                                icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                                title={''}
                                onClickHandler={(event) => { handleButtonClick(event, { id, nameRu, nameEn, year, posterUrl, rating, genres }) }}
                            />
                        }
                    </div>
                </div>
                <div className='movie-card_genres'>
                    {genres.map((genre, index) => (
                        <div key={index + genre.genre}>&#8226; {genre.genre}</div>
                    ))}
                </div>

            </div>
        </Card>
    )
};