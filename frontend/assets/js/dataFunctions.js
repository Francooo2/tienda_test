export const getMainData = async (url) => {

    try {
        const response = await fetch(url)
        const products = await response.json()
        return products
    } catch (error) {
        return 'Datos no disponibles'
    }

}

export const renderCards = (elements, nameArray, list, parent, imgDefault) => {

    for (const product of elements) {
        
        if ( product.url_image ) {
            parent.innerHTML += `<article class="card">
                <img class="card__img" src=${product.url_image} alt="Producto a la venta">
                <p class="card__text">${product.nameProduct}</p>
                <div class="card__footer">
                    <p>$${product.price}</p>
                    <i class="fas fa-cart-plus"></i>   
                </div>
            </article>`
        } else {
            parent.innerHTML += `<article class="card">
                <img class="card__img" src=${imgDefault} alt="Producto a la venta">
                <p class="card__text">${product.nameProduct}</p>
                <div class="card__footer">
                    <p>$${product.price}</p>
                    <i class="fas fa-cart-plus"></i>   
                </div>
            </article>`
        }

        let opt           = document.createElement('option')
        opt.value = product.nameProduct
        list.appendChild(opt)

        nameArray.push(product.nameProduct)
    }

    return nameArray

}