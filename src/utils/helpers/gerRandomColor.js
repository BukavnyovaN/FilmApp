import {TAG_COLORS} from "../../constants/tag_colors";

export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * TAG_COLORS.length);
    return TAG_COLORS[randomIndex];
};