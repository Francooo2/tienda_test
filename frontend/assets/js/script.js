import { getMainData, renderCards } from './dataFunctions.js'
import { filterNameProduct, filterCategoryProduct } from './filterFunctions.js'
import { sale, getItemsLocalStorage, addItem, removeItem } from './generalFunctions.js'

let   nameProducts     = []
let   categoryProducts = []
const dataList         = document.getElementById('listid')
const parentElement    = document.getElementById('root')
const inputSearch      = document.getElementById('search')
const imgDefault       = 'https://www.detallesmasbonitaqueninguna.com/server/Portal_0015715/img/products/no_image_xxl.jpg'
const iconPrincipal    = document.getElementById('iconprincipal')
const lateral          = document.getElementById('lateral')
let   listItems        = document.getElementById('listItems')
let   total            = document.getElementById('total')
let   makeSale         = document.getElementById('btn')
let   closearrow       = document.getElementById('closearrow')
let   spinner          = document.getElementById('spinner')
let   select           = document.getElementById('category')

window.addEventListener('load', async () => {

    const data = await getMainData('http://localhost:3000/')

    if ( typeof data === 'string' ) {
        alert(data)
        return
    }

    let hash = {}
    let filterData = data.filter(o => hash[o.nameProduct] ? false : hash[o.nameProduct] = true)
    
    spinner.classList.add('hide')
    nameProducts = renderCards(filterData, nameProducts, dataList, parentElement, imgDefault, select, categoryProducts)
    
    getItemsLocalStorage(listItems, total)
    
})

filterNameProduct(inputSearch, nameProducts)

filterCategoryProduct(select)

iconPrincipal.addEventListener('click', () => {
    lateral.classList.toggle('show')
})

closearrow.addEventListener('click', () => {
    lateral.classList.toggle('show')
})

addItem(parentElement, lateral, listItems, total)

removeItem(listItems, total)

sale(makeSale, listItems, total)