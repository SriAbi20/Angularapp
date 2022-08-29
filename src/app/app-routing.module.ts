import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { ProductsDisplayComponent } from './components/products-display/products-display.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'products/list', component:ProductsDisplayComponent},
  {path:'products/admin', component:ProductsAdminComponent},
  {path:'products/add', component:AddProductComponent},
  {path:'products/:productId', component:EditProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
