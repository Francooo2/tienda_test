import { getMainData, renderCards } from './dataFunctions.js'
import { filterNameProduct } from './filterFunctions.js'

let   nameProducts  = []
const dataList      = document.getElementById('listid')
const parentElement = document.getElementById('root')
const inputSearch   = document.getElementById('search')
const imgDefault    = 'https://www.detallesmasbonitaqueninguna.com/server/Portal_0015715/img/products/no_image_xxl.jpg'

window.addEventListener('load', async () => {

    const data = await getMainData('http://localhost:3000/')
    console.log(data)

    let hash = {}
    let filterData = data.filter(o => hash[o.nameProduct] ? false : hash[o.nameProduct] = true)
    
    nameProducts = renderCards(filterData, nameProducts, dataList, parentElement, imgDefault)
    
})

filterNameProduct(inputSearch, nameProducts)
