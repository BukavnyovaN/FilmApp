import React from 'react';
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";

export function Home() {
    return (
        <div>
            <h1>Домашняя страница</h1>
            <h2>Приветствуем вас на сайте FilmApp. Мы взаимодействуем с Kinopoisk Unofficial API, поэтому вы сможете найти фильм на любой вкус и цвет</h2>
            <div style={{ display: 'flex', justifyContent: 'center', lineHeight: "normal" }}>
                <Link to={PATHS.SEARCH}>
                    <h2>Перейти к поиску</h2>
                </Link>
            </div>
        </div>
    );
}
