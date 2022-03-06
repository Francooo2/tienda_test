export const getMainData = async () => {
    try {
        const response = await fetch('http://localhost:3000/')
        const products = await response.json()
        return products
    } catch (error) {
        return 'Datos no disponibles'
    } 
}