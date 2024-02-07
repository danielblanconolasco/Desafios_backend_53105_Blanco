import fs from "fs/promises"

let products = []

class ProductManager {
    static id = 1
    static path = `json/products.json`

    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title,
            this.description = description,
            this.price = price,
            this.thumbnail = thumbnail,
            this.code = code,
            this.stock = stock
    }

    async addProduct() {
        try {
            const existingProducts = await this.getProducts()
            const existingProduct = existingProducts.find(product => product.code === this.code)

            if (existingProduct) {
                return console.log(`Product with the same code ${this.code} already exists, please try again`)
            } else {
                products.push({
                    id: ProductManager.id,
                    title: this.title,
                    description: this.description,
                    price: this.price,
                    thumbnail: this.thumbnail,
                    code: this.code,
                    stock: this.stock,
                })

                ProductManager.id++

                await fs.writeFile(ProductManager.path, JSON.stringify(products, null, 2))
                console.log(`Product added successfully`)
            }
        } catch (error) {
            console.error(`Error adding product:`, error)
            console.log(`Product not added, please try again`)
        }
    }

    async writeFile() {
        try {
            await fs.writeFile(ProductManager.path, JSON.stringify(products, null, 2))
            console.log(`File written successfully`)
        } catch (error) {
            console.log(`There was an error writing the file`, error)
        }
    }
    async getProducts() {
        try {
            await fs.access(ProductManager.path)
            const data = await fs.readFile(ProductManager.path)
            const products = JSON.parse(data)
            return products
        } catch (error) {
            await fs.writeFile(ProductManager.path, '[]', 'utf-8')
            return []
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.readFile(ProductManager.path)
            const products = JSON.parse(data)
            const product = products.find(product => product.id === id)
            if (product) {
                console.log(`Product ${id} is:\n`, product)
            } else {
                console.log(`Product ID ${id} not found`)
            }
        } catch (error) {
            console.log(`There was an error getting the product by ID ${id}`, error)
        }

    }

    async updateProductById(id, newProduct) {
        try {
            const data = await fs.readFile(ProductManager.path)
            const products = JSON.parse(data)
            const product = products.find(product => product.id === id)
            product.title = newProduct.title
            product.description = newProduct.description
            product.price = newProduct.price
            product.thumbnail = newProduct.thumbnail
            product.code = newProduct.code
            product.stock = newProduct.stock
            await fs.writeFile(ProductManager.path, JSON.stringify(products, null, 2))
            console.log(`Product ${id} updated successfully`)

        } catch (error) {
            console.log(`Product with ID ${id} not found. Update failed.`, error);
        }
    }
    async deleteProductById(id) {
        try {
           const data = await fs.readFile(ProductManager.path)
           const products = JSON.parse(data)
            const product = products.find(product => product.id === id)
            const index = products.indexOf(product)
            products.splice(index, 1)
            await fs.writeFile(ProductManager.path, JSON.stringify(products, null, 2))
            console.log(`Product ${id} erased successfully`)

        } catch (error) {
            console.log(`Product ID ${id} not found`, error)
        }
    }
}

// Creation of 8 items
await new ProductManager(`Keyboard`, `A nice mechanical keyboard`, 120, `./assets/img/keyboard1.jpg`, `keyboard-1`, 10).addProduct()

await new ProductManager(`Mouse`, `A nice mouse`, 90, `./assets/img/mouse1.jpg`, `mouse-1`, 10).addProduct()

await new ProductManager(`Monitor`, `A nice monitor`, 350, `./assets/img/monitor1.jpg`, `monitor-1`, 10).addProduct()

await new ProductManager(`Headphones`, `A nice headphone`, 200, `./assets/img/headphones1.jpg`, `headphones-1`, 10).addProduct()

await new ProductManager(`Desktop`, `A nice desktop`, 1000, `./assets/img/desktop1.jpg`, `desktop-1`, 10).addProduct()

await new ProductManager(`Laptop`, `A nice laptop`, 1500, `./assets/img/laptop1.jpg`, `laptop-1`, 10).addProduct()

await new ProductManager(`Tablet`, `A nice tablet`, 800, `./assets/img/tablet1.jpg`, `tablet-1`, 10).addProduct()

await new ProductManager(`Printer`, `A nice printer`, 500, `./assets/img/printer1.jpg`, `printer-1`, 10).addProduct()

// Test product for console error
await new ProductManager(`Printer 2`, `A nice printer`, 500, `./assets/img/printer2.jpg`, `printer-1`, 10).addProduct()

// Test getProducts
async function testGetProducts() {
    try {
        const productManager = new ProductManager()
        const products = await productManager.getProducts()
        console.log(products)
    } catch (error) {
        console.error(`Error testing getProducts:`, error)
    }
}
// testGetProducts()

// Test getProductsById without error
await new ProductManager().getProductById(1)

// Test getProductsById with error
await new ProductManager().getProductById(10)

// Test update product by ID
await new ProductManager().updateProductById(1, { title: `A new Keyboard`, description: `A new mechanical keyboard`, price: 150, thumbnail: `./assets/img/keyboard2.jpg`, code: `keyboard-2`, stock: 10 })

// Test getProductsById with updated product
await new ProductManager().getProductById(1)

// Test erase product by ID
await new ProductManager().deleteProductById(2)

// Test getProducts without the erased product
testGetProducts()

await new ProductManager().getProductById(2)