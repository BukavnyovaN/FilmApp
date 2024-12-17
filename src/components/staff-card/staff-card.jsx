import { Card } from 'antd';
import './staff-card.css';

export const StaffCard = ({ id, nameRu, nameEn, posterUrl, professionText }) => {
    return (
        <Card
            style={{ width: 165 }}
            cover={<img alt={nameRu || nameEn} src={posterUrl} style={{ maxHeight: '210px' }} />}
            key={id}
        >
            <div className='staff-card_info'>
                <div className='staff-card_profession'>
                    {nameRu || nameEn}
                </div>
            </div>
        </Card>
    )
};