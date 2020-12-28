export const generateId = () =>
    Date.now() + Number.parseInt(Math.random() + Math.random() * 10 ** 10).toString()
