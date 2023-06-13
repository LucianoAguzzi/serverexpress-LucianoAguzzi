import {promises as fs} from 'fs';

class productManager{
    constructor(){
        this.path="./products.txt";
        this.products=[]
    }
    static id=0

    addProduct= async(title, price, stock, barcode, thumbnail, description,)=>{
        productManager.id++;
        let newProduct= {
            title,
            price, 
            stock, 
            barcode,
            thumbnail,
            description,
            id: productManager.id
        }
        this.products.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(this.products))
    }
    readProducts = async () => {
        let answer= await fs.readFile(this.path, "utf-8")
        return(JSON.parse(answer));    
    }
    getProduct = async () => {
        let answerTwo = await this.readProducts();
        return console.log(answerTwo);
    }
    getProductById = async (id) => {
        let answerThree = await this.readProducts();
        if(!answerThree.find(product=>product.id === id)){
            console.log("product not found")
        } else {
            console.log(answerThree.find(product=>product.id === id));
        }
    }
    deleteProductById = async (id) => {
        let answerThree = await this.readProducts();
        let productFilter = answerThree.filter(products=> products.id != id);
        await fs.writeFile(this.path,JSON.stringify(productFilter));
        console.log("product deleted successfully");
    };

   updateProducts = async ({id, ...producto}) => {
    await this.deleteProductById(id);
    let productOld = await this.readProducts();
    let productsModified = [{...producto, id}, ...productOld];
    await fs.writeFile(this.path,JSON.stringify(productsModified));
}
}

const productos = new productManager

productos.addProduct ({
title:"Cap",
id:2,
title: "cap trucker",
 price:50,
 stock: 3,
 thumbnail: "https://www.sansabacap.com/wp-content/uploads/2018/08/112FP_final.jpg",
 barcode:12315465,
 description:"A trucker cap",

})
productos.updateProducts ({
    id: 1,
    title: "Cap",
    price: 80,
    stock: 3,
    barcode: "https://www.sansabacap.com/wp-content/uploads/2018/08/112FP_final.jpg",
    thumbnail: 12315465,
    description: "A trucker cap"
});
productos.getProductById(1)
