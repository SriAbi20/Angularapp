import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductView } from 'src/app/models/ProductView';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
 
  public productId:string | null='';
  public selectedProduct:ProductView = {} as ProductView;
  public errorMessage : string | undefined;
  constructor(private activatedRoute : ActivatedRoute,
              private productService:ProductService,
               private router :Router) { }

              public isEmptyFields : boolean | undefined;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap)=>{
      this.productId = param.get('productId');
    });
    if(this.productId){
    this.productService.getProduct(this.productId).subscribe((data)=>{
           this.selectedProduct = data;
    },(error)=>{
      this.errorMessage = error;
    })
  }
  }
  public submitUpdateProduct(){


    if(this.selectedProduct.name!==''&&this.selectedProduct.image!==''&&this.selectedProduct.price!==''&&this.selectedProduct.qty!==''&&this.selectedProduct.info!==''){
      if(this.productId){
      this.productService.updateProduct(this.productId,this.selectedProduct).subscribe((data)=>{
       this.router.navigate(['/products/admin']).then();
      })
     }
     else{
       this.isEmptyFields = true;
     }
    }
   }
  }


