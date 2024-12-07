/*
import React from 'react';

export function SignUp() {
    return (
        <div>
            <h1>This is our sign up page</h1>
        </div>
    );
}
*/

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Input, Button, Alert } from 'antd';
import { registerUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
    password: Yup.string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters'),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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

    // Если успешно, то переход на главную страницу
    useEffect(() => {
        if (status === 'succeeded' && isAuthenticated) {
            navigate('/');
        }
    }, [status, isAuthenticated, navigate]);

    return (
        <div style={{ maxWidth: 300, margin: 'auto' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Item
                    label="Username"
                    validateStatus={errors.username ? 'error' : ''}
                    help={errors.username?.message}
                >
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input {...field} placeholder="Enter username" />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input.Password {...field} placeholder="Enter password" />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    validateStatus={errors.confirmPassword ? 'error' : ''}
                    help={errors.confirmPassword?.message}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input.Password {...field} placeholder="Confirm password" />
                        )}
                    />
                </Form.Item>

                {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

                <Button type="primary" htmlType="submit" loading={status === 'loading'}>
                    Register
                </Button>
            </form>
        </div>
    );
};

//export default SignUp;
