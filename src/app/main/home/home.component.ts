import { Component, OnInit } from '@angular/core';
import { PaginationRequest } from 'src/app/core/services/models/pagination-request';
import { PaginationResult } from 'src/app/core/services/models/pagination-result';
import { productService } from 'src/app/core/services/product/product.service';
import { CustomerService } from 'src/app/core/services/customer/customer.service';
import { productModel } from '../product/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // criação e tipagem das variaveis que serão utilizadas
  breadCrumbItems: Array<{}>;

  totalProductDataPagination: number;
  totalCustomerDataPagination: number;
  paginationRequest: PaginationRequest={
    pageSize: 0,
    pageIndex: 0,
  } ;

  constructor(
    private productService: productService,
    private customerService: CustomerService,
    ) { }

  
  // função que roda ao iniciar a pagina automaticamente
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Consulta" },
      { label: "Geral", active: true },
    ];
    this.loadProduct(this.paginationRequest);
    this.loadCustomer(this.paginationRequest);
  }
  
  // função que carrega a quantidade de produtods cadastrados
  loadProduct(paginationRequest: PaginationRequest) {
    this.productService.getAll(paginationRequest)
      .subscribe(resp => {
        this.totalProductDataPagination = resp.content.totalRecords;
      })
  }
  // função que carrega a quantidade de clientes cadastrados
  loadCustomer(paginationRequest: PaginationRequest) {
    this.customerService.getAll(paginationRequest)
      .subscribe(resp => {
        this.totalCustomerDataPagination = resp.content.totalRecords;
      })
  }

}
