import { getMainData, renderCards } from './dataFunctions.js'
import { filterNameProduct } from './filterFunctions.js'
import { getItemsLocalStorage, addItem, removeItem } from './generalFunctions.js'

let   nameProducts  = []
const dataList      = document.getElementById('listid')
const parentElement = document.getElementById('root')
const inputSearch   = document.getElementById('search')
const imgDefault    = 'https://www.detallesmasbonitaqueninguna.com/server/Portal_0015715/img/products/no_image_xxl.jpg'
const iconPrincipal = document.getElementById('iconprincipal')
const lateral       = document.getElementById('lateral')
let   listItems     = document.getElementById('listItems')
let   total         = document.getElementById('total')
let   makeSale      = document.getElementById('btn')
let   closearrow    = document.getElementById('closearrow')
let   spinner       = document.getElementById('spinner')

window.addEventListener('load', async () => {

    const data = await getMainData('http://localhost:3000/')
    console.log(data)

    if ( typeof data === 'string' ) {
        alert(data)
        return
    }

    let hash = {}
    let filterData = data.filter(o => hash[o.nameProduct] ? false : hash[o.nameProduct] = true)
    
    spinner.classList.add('hide')
    nameProducts = renderCards(filterData, nameProducts, dataList, parentElement, imgDefault)
    
    getItemsLocalStorage(listItems, total)
    
})

filterNameProduct(inputSearch, nameProducts)

iconPrincipal.addEventListener('click', () => {
    lateral.classList.toggle('show')
})

closearrow.addEventListener('click', () => {
    lateral.classList.toggle('show')
})

addItem(parentElement, lateral, listItems, total)

removeItem(listItems, total)

makeSale.addEventListener('click', () => {

    let elements = document.getElementsByTagName('li')
    
    if ( elements.length === 0 ) {
        alert('Estimado cliente, favor agregar productos a su carro.')
        return
    }

    let message  = confirm('¿Esta seguro de su compra?')
    
    if ( message === true ) {
        alert(`Su compra de un monto de $ ${total.value} ha sido realizada con exito, vuelva pronto.`)
        for (let index = elements.length - 1; index >= 0; index--) {
            listItems.removeChild(elements[index])
        }
        localStorage.clear()
        total.value = '0'
    } else {
        alert('Su compra ha sido cancelada.')
    }

})