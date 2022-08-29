import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ProductView } from '../models/ProductView';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from 'server/database/models/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }
  public createProduct(product:ProductView):Observable<ProductView>{
    let serverURL : string =`http://127.0.0.1:5000/api/v1/products/`;
    return this.httpClient.post<ProductView>(serverURL,product).pipe(catchError
      (this.handleError)
      );
  }
  public updateProduct(productId:string,product:ProductView):Observable<ProductView>{
    let serverURL:string =`http://127.0.0.1:5000/api/v1/products/${productId}`;
    return this.httpClient.put<ProductView>(serverURL,product).pipe(catchError
      (this.handleError)
      );
  }
  public getAllProducts():Observable<ProductView[]>{
    let serverURL:string =`http://127.0.0.1:5000/api/v1/products/`;
    return this.httpClient.get<ProductView[]>(serverURL).pipe(catchError
      (this.handleError)
      );
  }
  public getProduct(productId:string):Observable<ProductView>{
    let serverURL:string =`http://127.0.0.1:5000/api/v1/products/${productId}`;
    return this.httpClient.get<ProductView>(serverURL).pipe(catchError
      (this.handleError)
      );
  }
  public deleteProduct(productId:string):Observable<ProductView>{
    let serverURL:string =`http://127.0.0.1:5000/api/v1/products/${productId}`;
    return this.httpClient.delete<ProductView>(serverURL).pipe(catchError
      (this.handleError)
      );
  }
  private handleError(error:HttpErrorResponse){
    let errorMessage : string = '';
    if(error.status ===0){
      // A client-side or network error occured .Handle it accordingly
      errorMessage = `An error occured :${error.error}`
    }
    else{
      //The backend returned an unsuccessful response code.
      //The response body may contain clues as to what wnet wrong.
      errorMessage=`Backend returned Code ${error.status},body was:${error.error}`;
    }
    //Return an observable with a user-facing error message.
    errorMessage +='\n Something bad happened ; please try again later';
    return throwError(errorMessage);
  }
}
