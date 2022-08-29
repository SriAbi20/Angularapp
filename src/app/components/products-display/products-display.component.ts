import { Component, OnInit } from '@angular/core';
import { ProductView } from 'src/app/models/ProductView';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit {
  

  public products:ProductView[] = [] as ProductView[];
  public errorMessage : string | undefined;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data)=>{
      this.products = data;
    },(error)=>{
      this.errorMessage = error;
    });
  }

}
