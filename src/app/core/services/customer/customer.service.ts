import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from 'src/app/main/customer/customer.model';
import { environment } from 'src/environments/environment';
import { PaginationRequest } from '../models/pagination-request';
import { ResponseModel } from '../models/response-model';
import { ResponsePagination } from '../models/response-pagination';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly url = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getAll(paginationRequest: PaginationRequest): Observable<ResponsePagination<CustomerModel>> {

    return this.http.post<ResponsePagination<CustomerModel>>(`${this.url}/api/Person/GetAll`, paginationRequest)

  }
  get(id: string): Observable<ResponseModel<CustomerModel>>{
    return this.http.get<ResponseModel<CustomerModel>>(`${this.url}/api/Person/${id}`)

  }
  post(customer: CustomerModel): Observable<ResponseModel<CustomerModel>>{
     return this.http.post<ResponseModel<CustomerModel>>(`${this.url}/api/Person`, customer)

  }
  put(customer: CustomerModel): Observable<ResponseModel<CustomerModel>>{
    return this.http.put<ResponseModel<CustomerModel>>(`${this.url}/api/Person`, customer)

  }
  delete(id: string): Observable<ResponseModel<CustomerModel>>{
    return this.http.delete<ResponseModel<CustomerModel>>(`${this.url}/api/Person/${id}`)

  }
}
