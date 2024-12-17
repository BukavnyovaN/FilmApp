import { Button } from 'antd';

export const CustomButton = ({ title, icon = null, type, onClickHandler }) => (
    <Button
        type={type}
        icon={icon}
        onClick={onClickHandler}
    >
        {title}
    </Button>
);