import React from 'react';
import { Select, DatePicker, Button, Form, Drawer } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { UndoOutlined } from "@ant-design/icons";
import moment from "moment";
import { COUNTRIES } from "../../constants/countries";
import { GENRES } from "../../constants/genres";
import { openFilterDrawer, removeFilters, setFilters } from "../../redux/actions/filterActions";
import { CustomButton } from "../custom-button/custom-button";
import './filter-form.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

export const FilterForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { filters, isFilterDrawerOpen, isFilterApplied } = useSelector((state) => state.filters);

    const handleFilterApply = (values) => {
        const { type, country, genre, yearRange } = values;
        const newFilters = {
            type,
            country,
            genre,
            yearFrom: yearRange ? yearRange[0].year() : null,
            yearTo: yearRange ? yearRange[1].year() : null,
        };
        dispatch(setFilters(newFilters));
        dispatch(openFilterDrawer(false));
    };

    const handleFilterRemove = () => {
        dispatch(removeFilters());
        dispatch(openFilterDrawer(false));
    };

    const handleCloseDrawer = () => {
        dispatch(openFilterDrawer(false));
    };

    return (
        <Drawer title="Фильтр" placement={'left'} onClose={handleCloseDrawer} open={isFilterDrawerOpen}>
            <Form form={form}
                layout={'vertical'}
                onFinish={handleFilterApply}
                initialValues={{
                    type: filters.type,
                    country: filters.country,
                    genre: filters.genre,
                    yearRange: filters.yearFrom && filters.yearTo ?
                        [moment().year(filters.yearFrom), moment().year(filters.yearTo)]
                        : null,
                }}
            >
                <Form.Item name="type" label="Тип фильма">
                    <Select style={{ width: 120 }}>
                        <Option value="ALL">Все</Option>
                        <Option value="FILM">Фильм</Option>
                        <Option value="TV_SHOW">ТВ Шоу</Option>
                        <Option value="TV_SERIES">ТВ Сериал</Option>
                        <Option value="MINI_SERIES">Мини-сериал</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="country" label="Страна">
                    <Select style={{ width: 150 }}>
                        {COUNTRIES.map(country => (
                            <Option
                                key={country.id + country.country}
                                value={country.id}
                            >
                                {country.country}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="genre" label="Жанр">
                    <Select style={{ width: 150 }}>
                        {GENRES.map(genre => (
                            <Option key={genre.id + genre.genre} value={genre.id}>{genre.genre}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="yearRange" label="Год выпуска">
                    <RangePicker picker="year" />
                </Form.Item>

                <Form.Item>
                    <div className={'filter-form_buttons-wrapper'}>
                        <Button type="primary" htmlType="submit">
                            Применить фильтры
                        </Button>
                        {
                            isFilterApplied &&
                            <CustomButton
                                type={'default'}
                                title={'Сбросить'}
                                onClickHandler={handleFilterRemove}
                                icon={<UndoOutlined />}
                            />
                        }
                    </div>
                </Form.Item>
            </Form>
        </Drawer>
    );
};
