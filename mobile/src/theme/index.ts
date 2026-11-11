
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";

export type Theme = {
    mode: "light" | "dark";
    colors: typeof lightTheme.colors;
};

export { lightTheme, darkTheme };

export const getTheme = (mode: "light" | "dark"): Theme => {
    return mode === "dark" ? darkTheme : lightTheme;
};
