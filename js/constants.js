export const DIMENSIONS = {
    WIDTH: 500,
    HEIGHT: 300,
};
  
export const COLORS = {
    LIGHT_BLUE: "#3972D5",
    YELLOW: "#BAD80F",
    NATURAL: "#EFF2CD",
};

export const SETTINGS = {
    INCEREMENT: 100,
};

export const indexToLetterMap = new Map(
    Array.from({ length: 10 }, (_, i) => [i, String.fromCharCode(65 + i)])
);