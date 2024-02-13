import express from 'express'
import ProductManager from '../main.js'
const productManager = new ProductManager()


const PORT = 8080

const app = express()



app.get (`/`, (req,res) => {
    res.send(`Express Server for challenge 3`)
})

app.listen (PORT, () => {
    console.log(`Listenning on port ${PORT} at http://localhost:8080`)
})

// Get all products
app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit)
    let products;

    if (limit) {
      products = await productManager.getProducts()
      const slicedProducts = products.slice(0, limit)
      res.json(slicedProducts)
    } else {
      products = await productManager.getProducts()
      res.json(products)
    }
  } catch (error) {
    console.log('Error getting products on getProducts', error)
  }
})
  
// Get product by ID
app.get('/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id)
  
    try {
      const product = await productManager.getProductById(productId)
      if (product) {
        res.send(product)
      } else {
        res.send(`Error: Product with ID ${productId} not found`)
      }
    } catch (error) {
      console.log(`Error getting product by ID ${productId}:`, error)
    }
  }
)