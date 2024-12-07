import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Input, Button, Alert } from 'antd';
import { registerUser } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
    username: Yup.string()
        .required('Требуется имя пользователя')
        .min(3, 'Имя пользователя должно содержать не менее 3 символов'),
    password: Yup.string()
        .required('Требуется пароль')
        .min(5, 'Пароль должен содержать не менее 5 символов'),
    confirmPassword: Yup.string()
        .required('Требуется подтвердить пароль')
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

export const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, status, isAuthenticated } = useSelector((state) => state.auth);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(registerUser(data));
    };

    useEffect(() => {
        if (status === 'succeeded' && isAuthenticated) {
            navigate('/');
        }
    }, [status, isAuthenticated, navigate]);

    return (
        <div style={{ maxWidth: 300, margin: 'auto' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Item
                    label="Имя пользователя"
                    validateStatus={errors.username ? 'error' : ''}
                    help={errors.username?.message}
                >
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input {...field} placeholder="Введите имя пользователя" />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input.Password {...field} placeholder="Введите пароль" />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Подтвердите пароль"
                    validateStatus={errors.confirmPassword ? 'error' : ''}
                    help={errors.confirmPassword?.message}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input.Password {...field} placeholder="Повторный ввод пароля" />
                        )}
                    />
                </Form.Item>

                {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

                <Button type="primary" htmlType="submit" loading={status === 'loading'}>
                    Зарегистрироваться
                </Button>
            </form>
        </div>
    );
};
