import { Layout, Button } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { Link, Outlet } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';
import React from 'react';

export function MainLayout() {
    const dispatch = useDispatch();
    const { isAuthenticated, username } = useSelector(state => state.auth);

    return (
        <Layout>
            <Layout>
                <Header style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}>
                    <Link to={PATHS.ROOT}>Главная</Link>
                    {isAuthenticated ? (
                        <>
                            <span style={{ color: 'red' }}>Hello, {username}</span>
                            <Link to={PATHS.FAVORITES}>Избранное</Link>
                            <Link to={PATHS.HISTORY}>История</Link>
                            <Button style={{ color: 'red' }} type="text" onClick={() => dispatch(logoutUser())}>Выход</Button>
                        </>
                    ) : (
                        <>
                            <Link to={PATHS.SIGNIN}>Вход</Link>
                            <Link to={PATHS.SIGNUP}>Регистрация</Link>
                        </>
                    )}

                </Header>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

/*
                    <Link to={PATHS.SIGNIN}>Вход</Link>
                    <Link to={PATHS.SIGNUP}>Регистрация</Link>
                    <Link to={PATHS.FAVORITES}>Избранное</Link>
                    <Link to={PATHS.HISTORY}>История</Link>
                    */