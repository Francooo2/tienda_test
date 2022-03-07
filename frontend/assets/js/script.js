import { getMainData, renderCards } from './dataFunctions.js'
import { filterNameProduct } from './filterFunctions.js'

let   nameProducts  = []
const dataList      = document.getElementById('listid')
const parentElement = document.getElementById('root')
const inputSearch   = document.getElementById('search')
const imgDefault    = 'https://www.detallesmasbonitaqueninguna.com/server/Portal_0015715/img/products/no_image_xxl.jpg'
const iconPrincipal = document.getElementById('iconprincipal')
const lateral       = document.getElementById('lateral')
let   listItems     = document.getElementById('listItems')
let   total         = document.getElementById('total')

window.addEventListener('load', async () => {

    const data = await getMainData('http://localhost:3000/')
    console.log(data)

    let hash = {}
    let filterData = data.filter(o => hash[o.nameProduct] ? false : hash[o.nameProduct] = true)
    
    nameProducts = renderCards(filterData, nameProducts, dataList, parentElement, imgDefault)
    
    for (let i = 1; i <= localStorage.length; i++) {
    
        let position    = localStorage[i].indexOf('$')
        let product     = localStorage[i].substring(0, position - 1)
        let parcial     = localStorage[i].substring(position + 1, localStorage[i].length)
            total.value = parseInt(total.value) + parseInt(parcial)
        
        listItems.innerHTML += `<li id="${i}" >
            <p class="lateral__product">${product}</p>
            <input type="text" value="${parcial}" class="lateral__input" readonly>
            <i class="fa fa-window-close lateral__close"</i>
        </li>`
     }
})

filterNameProduct(inputSearch, nameProducts)

iconPrincipal.addEventListener('click', () => {
    lateral.classList.toggle('show')
})

parentElement.addEventListener('click', (e) => {
    if ( e.target.classList[2] === 'card__plus' ) {
        lateral.classList.add('show')
        
        let id          = document.getElementsByTagName('li').length + 1
        let product     = e.target.parentNode.parentNode.children[2].textContent
        let parcial     = parseInt(e.target.parentNode.children[0].textContent.substring(1, e.target.parentNode.children[0].textContent.length)) * parseInt(e.target.parentNode.children[1].value)
            total.value = parseInt(total.value) + parcial
        

        listItems.innerHTML += `<li id="${id}" >
            <p class="lateral__product">${product}</p>
            <input type="text" value="${parcial}" class="lateral__input" readonly>
            <i class="fa fa-window-close lateral__close"</i>
        </li>`

        localStorage.setItem(`${localStorage.length + 1}`, `${product}$${parcial}`)
    }
})

lateral.addEventListener('click', (e) => {
    if ( e.target.classList[2] === 'lateral__close' ) {
            total.value = parseInt(total.value) - parseInt(e.target.parentNode.children[1].value)
        let child       = e.target.parentNode
        let id          = e.target.parentNode.id
        listItems.removeChild(child)
        localStorage.removeItem(id)
    }
})

