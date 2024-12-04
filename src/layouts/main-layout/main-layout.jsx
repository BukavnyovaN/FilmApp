import {Layout} from "antd";
import {Content, Header} from "antd/lib/layout/layout";
import {Link, Outlet} from "react-router-dom";
import {PATHS} from "../../constants/paths";

export function MainLayout () {
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
                    <Link to={PATHS.SIGNIN}>Вход</Link>
                    <Link to={PATHS.SIGNUP}>Регистрация</Link>
                    <Link to={PATHS.FAVORITES}>Избранное</Link>
                    <Link to={PATHS.HISTORY}>История</Link>
                </Header>
                <Content>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};