import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setKeyword, resetKeyword } from "../../redux/actions/searchActions";
import { UndoOutlined, SendOutlined } from "@ant-design/icons";
import { Form, Input, Button } from 'antd';

export const SearchForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { keyword } = useSelector((state) => state.keyword);

    const handleSearchSubmit = useCallback((values) => {
        const trimmedInput = values.search?.trim();
        if (trimmedInput) {
            dispatch(setKeyword(trimmedInput))
        }
    }, [dispatch]);

    const handleSearchReset = useCallback(() => {
        form.resetFields();
        dispatch(resetKeyword());
    }, [form, dispatch]);

    return (
        <Form
            form={form}
            layout="inline"
            onFinish={handleSearchSubmit}
            style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
        >
            <Form.Item
                name="search"
                style={{ flex: 1 }}
            >
                <Input
                    placeholder="Введите ключевое слово, которое встречается в названии фильма"
                    defaultValue={keyword}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                    Найти
                </Button>
            </Form.Item>

            <Form.Item>
                <Button
                    type="default"
                    htmlType="button"
                    onClick={handleSearchReset}
                    icon={<UndoOutlined />}
                >
                    Сбросить
                </Button>
            </Form.Item>
        </Form>
    );
};
