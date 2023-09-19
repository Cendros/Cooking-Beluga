export const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
};