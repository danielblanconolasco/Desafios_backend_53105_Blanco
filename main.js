let products = []
const fs = require('fs').promises

class ProductManager {
    static id = 1
    static path = "./json/products.json"

    constructor(title, description, price, thumbnail, code, stock, path){
        this.title = title,
        this.description = description,
        this.price = price,
        this. thumbnail = thumbnail,
        this.code = code,
        this.stock = stock        
    }

    addProduct () {
        const existingProduct = products.find(product => product.code === this.code)
        if (existingProduct) {
            return console.log('Product with the same code already exists, please try again')
        }
        else {
            products.push({
                id: ProductManager.id,
                title: this.title,
                description: this.description,
                price: this.price,
                thumbnail: this.thumbnail,
                code: this.code,
                stock: this.stock
            })
            ProductManager.id++
        }
    }

    static getProducts () {
        return products
    }

    static getProductById(id) {
        const product = products.find(product => product.id === id)
        if (!product) {
            console.log(`Product not found`)
            return `Search again`
        }
        else{
            return product
        }
    }
}

// Test getProducts
console.log(ProductManager.getProducts())

// Creation of 8 items
new ProductManager('Keyboard', 'A nice mechanical keyboard', 120, './assets/img/keyboard1.jpg', 'keyboard-1', 10).addProduct()

new ProductManager ('Mouse', 'A nice mouse', 90, './assets/img/mouse1.jpg', 'mouse-1', 10).addProduct()

new ProductManager ('Monitor', 'A nice monitor', 350, './assets/img/monitor1.jpg', 'monitor-1', 10).addProduct()

new ProductManager ('Headphones', 'A nice headphone', 200, './assets/img/headphones1.jpg', 'headphones-1', 10).addProduct()

new ProductManager (`Desktop`, `A nice desktop`, 1000, `./assets/img/desktop1.jpg`, `desktop-1`, 10).addProduct()

new ProductManager (`Laptop`, `A nice laptop`, 1500, `./assets/img/laptop1.jpg`, `laptop-1`, 10).addProduct()

new ProductManager (`Tablet`, `A nice tablet`, 800, `./assets/img/tablet1.jpg`, `tablet-1`, 10).addProduct()

new ProductManager (`Printer`, `A nice printer`, 500, `./assets/img/printer1.jpg`, `printer-1`, 10).addProduct()

// Test product for console error
new ProductManager (`Printer 2`, `A nice printer`, 500, `./assets/img/printer2.jpg`, `printer-1`, 10).addProduct()

// Test getProducts
console.log(ProductManager.getProducts())

// Test getProductsById without error
console.log(ProductManager.getProductById(1))

// Test getProductsById with error
console.log(ProductManager.getProductById(10))