import { Component, OnInit } from '@angular/core';
import { ProductView } from 'src/app/models/ProductView';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {


  public products:ProductView[] = [] as ProductView[];
  public errorMessage :string | undefined;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data)=>{
      this.products = data;
    },(error)=>{
      this.errorMessage=error;
    });
  }
  public getProductId(productId:string){
    return productId.substr(productId.length-5);
  }

  public clickDeleteProduct(productId:string | undefined){
    if(productId){
    this.productService.deleteProduct(productId).subscribe((data)=>{
      this.productService.getAllProducts().subscribe((data)=>{
        this.products = data;
      },(error)=>{
        this.errorMessage=error;
      });
    },(error)=>{
      this.errorMessage=error;
    })
  }
  }

}
