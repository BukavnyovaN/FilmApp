import { Layout, Button, Image} from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { Link, Outlet } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import React from 'react';
import logo from "../../assets/images/logo.png";


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
                    color: 'white',
                }}>
                    <Link to={PATHS.ROOT}style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Image
                            width={30}
                            src={logo}
                            preview={false}
                        />
                        <div>Главная</div>
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <span style={{ color: 'red' }}>Привет, {username}</span>
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
                <Content style={{margin: 45}}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};