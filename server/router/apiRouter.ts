import express from 'express';
import { request } from 'http';
import mongoose from 'mongoose';
import { Product } from '../database/models/Product';
import ProductTable from '../database/schemas/ProductSchema';
const apiRouter:express.Router = express.Router();


/*
Usage:Create a Product
URL:http://127.0.0.1:5000/api/v1/products
Method:POST
Fields:name,image,price,qty,info
Access:Public
*/
/*
//logic
apiRouter.post('/products',async(request:express.Request,response:express.Response)=>{

response.status(200).json({
    msg:'create a product'
})
});
*/
apiRouter.post('/products',async(request:express.Request,response:express.Response)=>{

  try{
    let product = {
        name:request.body.name,
        image:request.body.image,
        price:request.body.price,
        qty:request.body.qty,
        info:request.body.info
    };

    //check if the product is already exists
    let existingProduct = await ProductTable.findOne({name:product.name});
    if(existingProduct){
        response.status(401).json({
            msg:'Product is already exists'
        })
    }
    //create the product
    let newProduct = new ProductTable(product);
    product = await newProduct.save(); //insert into database
    response.status(200).json(product);

  }
  catch(error){
    console.log(error);
    response.status(500).json({
        error:error
    })
  }
    });
/*
Usage:Update a Product
URL:http://127.0.0.1:5000/api/v1/products/:productId
Method:PUT
Fields:name,image,price,qty,info
Access:Public
*/
apiRouter.put('/products/:productId',async(request:express.Request,response:express.Response)=>{

let {productId} = request.params;
//tested code
/*response.status(200).json({
msg:'Product Updated',
productId:productId
    })*/
//actual logic
try{
    let  updatedProduct = {
        name:request.body.name,
        image:request.body.image,
        price:request.body.price,
        qty:request.body.qty,
        info:request.body.info
    };
     //check if the product is exists
     let product : Product | null = await ProductTable.findById(productId)
     if(!product){
        return response.status(404).json({
            msg:'Product is not Exists !'
        });
     }
     //update product
     product = await ProductTable.findByIdAndUpdate(productId,
        {$set:
            {
          name:updatedProduct.name? updatedProduct.name:product.name ,
          image:updatedProduct.image? updatedProduct.image:product.image,
          price:updatedProduct.price? updatedProduct.price:product.price,
          qty:updatedProduct.qty? updatedProduct.qty:product.qty,
          info:updatedProduct.info? updatedProduct.info:product.info,
        }
    },{
        new :true});
        response.status(200).json(product);
}
catch(error){
    console.log(error);
    /*
    if(error.kind === 'ObjectId'){
        return response.status(404).json({
            msg:'Product is not exsists'
        })
    }*/
    response.status(500).json({
        error:error
    })

}

    });
/*
Usage:Get all Products
URL:http://127.0.0.1:5000/api/v1/products/
Method:GET
Fields:no-fields
Access:Public
*/    
apiRouter.get('/products',async(request:express.Request,response:express.Response)=>{
    //tested code
    /*
    response.status(200).json({
        msg:'Fetch all products'
    })
    */
   //Actual logic
   try{

   let products : Product [] = await ProductTable.find();
   response.status(200).json(products)
}
catch(error){
    console.log(error);
    response.status(500).json({
        error:error
    })
}
    });

/*
Usage:Get single Product
URL:http://127.0.0.1:5000/api/v1/products/:productId
Method:GET
Fields:no-fields
Access:Public
*/   
apiRouter.get('/products/:productId',async(request:express.Request,response:express.Response)=>{

    let {productId} = request.params;
    try{
        let product:Product | null = await ProductTable.findById(productId);
        if(!product){
            return response.status(404).json({
                msg : 'Product is not found !'
            });
        }
    
    response.status(200).json(product)
    }
    catch(error){
        console.log(error);
    response.status(500).json({
        error:error
    })

    }
        });
/*
Usage:Delete Product
URL:http://127.0.0.1:5000/api/v1/products/:productId
Method:GET
Fields:no-fields
Access:Public
*/ 
apiRouter.delete('/products/:productId',async(request:express.Request,response:express.Response)=>{
    let {productId} = request.params;
    try{
        let product:Product | null = await ProductTable.findById(productId);
        if(!product){
            return response.status(404).json({
                msg : 'Product is not found !'
            });
        }
        //delete the product
        product = await ProductTable.findByIdAndRemove(productId);
        response.status(200).json(product);

    }
    catch(error){
        console.log(error);
    response.status(500).json({
        error:error
    })
    }
    //Tested Code
    /*response.status(200).json({
    msg:'product deleted',
    productId:productId
    })*/
    });
    
export default apiRouter;