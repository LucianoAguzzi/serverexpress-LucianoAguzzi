import express from 'express';
import ProductManager from './product.manager.js'

const app = express();
const productos = new ProductManager('./products.json')
const readProducts = productos.readProducts();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await readProducts)
    let productLimit = allProducts.slice(0, limit)
        res.send(await productLimit);
      }
    );
  ;

app.get('/products/:id', async(req,res)=>{
    let id = parseInt (req.params.id);
    let allProducts = await readProducts
    let productsById = allProducts.find(products => products.id === id)    
    res.send(productsById);
})
