import { getMainData } from './data.js'

const dataList      = document.getElementById('listid')
const parentElement = document.getElementById('root')
const imgDefault    = 'https://www.detallesmasbonitaqueninguna.com/server/Portal_0015715/img/products/no_image_xxl.jpg'

window.addEventListener('load', async () => {

    const data = await getMainData()

    for (const product of data) {
        if ( product.url_image ) {
            parentElement.innerHTML += `<div class="card">
                <img src=${product.url_image} alt="Producto a la venta">
                <p class="text">${product.name}</p>
                <div>
                    
                </div>
            </div>`
        } else {
            parentElement.innerHTML += `<div class="card">
                <img src=${imgDefault} alt="Producto a la venta">
                <p class="text">${product.name}</p>
            </div>`
        }

        let opt           = document.createElement('option')
            opt.value     = product.name
            opt.innerHTML = product.name
        dataList.appendChild(opt)
    }

})
