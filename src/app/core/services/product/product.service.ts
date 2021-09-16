// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { productModel as productModel } from 'src/app/main/product/product.model';
// import { environment } from 'src/environments/environment';
// import { PaginationRequest } from '../models/pagination-request';
// import { ResponseModel } from '../models/response-model';
// import { ResponsePagination } from '../models/response-pagination';

// @Injectable({
//   providedIn: 'root'
// })
// export class productService {

//   readonly url = environment.apiUrl;
//   constructor(private http: HttpClient) { }


//   getAll(paginationRequest: PaginationRequest): Observable<ResponsePagination<productModel>> {

//     return this.http.post<ResponsePagination<productModel>>(`${this.url}/api/Product/GetAll`, paginationRequest)

//   }
//   get(id: string): Observable<ResponseModel<productModel>>{
//     return this.http.get<ResponseModel<productModel>>(`${this.url}/api/Product/${id}`)

//   }
//   post(product: productModel): Observable<ResponseModel<productModel>>{
//      return this.http.post<ResponseModel<productModel>>(`${this.url}/api/Product`, product)

//   }
//   put(product: productModel): Observable<ResponseModel<productModel>>{
//     return this.http.put<ResponseModel<productModel>>(`${this.url}/api/Product`, product)

//   }
//   delete(id: string): Observable<ResponseModel<productModel>>{
//     return this.http.delete<ResponseModel<productModel>>(`${this.url}/api/Product/${id}`)

//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productModel } from 'src/app/main/product/product.model';
import { environment } from 'src/environments/environment';
import { PaginationRequest } from '../models/pagination-request';
import { ResponseModel } from '../models/response-model';
import { ResponsePagination } from '../models/response-pagination';

@Injectable({
  providedIn: 'root'
})
export class productService {

  readonly url = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getAll(PaginationRequest: PaginationRequest): Observable<ResponsePagination<productModel>> {

    return this.http.post<ResponsePagination<productModel>>(`${this.url}/api/Product/GetAll`, PaginationRequest)

  }
  get(id: string): Observable<ResponseModel<productModel>>{
    return this.http.get<ResponseModel<productModel>>(`${this.url}/api/Product/${id}`)

  }
  post(product: productModel): Observable<ResponseModel<productModel>>{
     return this.http.post<ResponseModel<productModel>>(`${this.url}/api/Product`, product)

  }
  put(product: productModel): Observable<ResponseModel<productModel>>{
    return this.http.put<ResponseModel<productModel>>(`${this.url}/api/Product`, product)

  }
  delete(id: string): Observable<ResponseModel<productModel>>{
    return this.http.delete<ResponseModel<productModel>>(`${this.url}/api/Product/${id}`)

  }
}