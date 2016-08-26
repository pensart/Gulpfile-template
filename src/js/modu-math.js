export default function(a,b) {
    return a / b;
};

// you can export a named function
export function testAdd(a,b) {
    return a + b;
};

// or a variable
export const testSubtract = (a,b) => {
    return a - b;
};
