import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, List, Button } from 'antd';
import { getCorrectNavigate } from '../../utils/helpers/getCorrectNavigate'; // Adjust the import path as needed
import { getUsersFromLocalStorage } from '../../redux/utils/localStorage';
import { HistoryItem } from '../../components/history-item/history-item';

export function History() {
    const { isAuthenticated, username } = useSelector((state) => state.auth);
    const [historyItems, setHistoryItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const usersData = getUsersFromLocalStorage();
        if (usersData) {
            const userData = usersData[username];
            if (userData && Array.isArray(userData.history)) {
                setHistoryItems(userData.history);
            } else {
                setHistoryItems([]);
            }
        } else {
            setHistoryItems([]);
        }
    }, [isAuthenticated, username]);

    const handleHistoryClick = (item) => {
        const { currentPageNum, dropdownValue, filters, keyword } = item;
        const url = getCorrectNavigate(currentPageNum, dropdownValue, filters, keyword);
        console.log(url);
        navigate(url);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>История поиска</h1>
            {historyItems.length === 0 ? (
                <p>История пуста</p>
            ) : (
                <List
                    dataSource={historyItems}
                    renderItem={(item, index) => (
                        <List.Item>
                            <Card
                                title={`Поиск #${index + 1}`}
                                style={{ width: '100%' }}
                                extra={
                                    <Button type="link" onClick={() => handleHistoryClick(item)}>
                                        Открыть
                                    </Button>
                                }
                            >
                                <p><strong>Ключевое слово:</strong> {item.keyword || 'Не указано'}</p>
                                <p><strong>Сортировка:</strong> {item.dropdownValue}</p>
                                <p><strong>Страница:</strong> {item.currentPageNum}</p>
                                <HistoryItem item={item} />
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
}
