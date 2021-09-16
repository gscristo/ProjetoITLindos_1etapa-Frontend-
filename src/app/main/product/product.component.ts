import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedSortableDirective, SortEvent } from 'src/app/shared/directives/advanced-sortable.directive';
import { LoaderService } from "src/app/core/services/loader.service";
import { ToastService } from "src/app/shared/ui/toast/toast.service";
import Swal from 'sweetalert2';
import { productModel } from './product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/shared/custom-validators/custom-validators';
import { productService } from 'src/app/core/services/product/product.service';
import { PaginationRequest } from 'src/app/core/services/models/pagination-request';
import { PaginationResult } from 'src/app/core/services/models/pagination-result';
// acima todos os imports de bibliotecas, classes e componentes.


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class productComponent implements OnInit {

  // aqui são criadas e tipadas as variaveis que serão utilizadas no typescript
  breadCrumbItems: Array<{}>;

  productAdd: productModel = new productModel();
  productDataPagination: PaginationResult<productModel>;
  productForm: FormGroup;

  paginationRequest: PaginationRequest = {
    pageIndex: 1,
    pageSize: 10,
    direction: 'asc',
    sort: 'Name',
  }

  @ViewChildren('content') modal : NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private productService: productService
    ) { }

  // refere-se a função que roda ao iniciar a página
  ngOnInit(): void {
    
    this.breadCrumbItems = [
      { label: "Cadastro" },
      { label: "Produto", active: true },
    ];

    
    this.loadProduct(this.paginationRequest);

    // aqui é onde é feita a validação dos campos obrigatórios com required
    this.productForm = this.formBuilder.group({
      productId: null,
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null,],
      unit: [null,[Validators.required]],
      value: [null, [Validators.required]],
    });

  }
  // função responsável por carregar o cadastro ja existente
  loadProduct(paginationRequest: PaginationRequest) {
    this.productService.getAll(paginationRequest)
      .subscribe(resp => {
        this.productDataPagination = resp.content;
      })
  }
  teste(){
    console.log(this.productForm.value)
  }

  // função que salva um produto novo ou altera um ja existente.
  saveProduct() {
    this.modalService.dismissAll();
    const id = this.getForm("productId").value;

      if (!id) {
        this.productService.post(this.productForm.value)
          .subscribe(c => {
            this.toastService.show(`Produto ${c.content.Name} Cadastrado com sucesso`, { classname: 'bg-success', delay: 4000})
          }, ()=>{}, ()=>{
            this.loadProduct(this.paginationRequest);
          })
      } else {
        this.productService.put(this.productForm.value)
        .subscribe(c => {
          this.toastService.show(`Produto ${c.content.Name} Alterado com sucesso`, { classname: 'bg-success', delay: 4000})
        },()=>{}, ()=>{
          this.loadProduct(this.paginationRequest);
        })
      }
      this.productForm.reset();
  }

  // função que deleta um produto existente.
  deleteAccount(product: productModel) {
    Swal.fire({
      title: product.Name,
      text: 'Deseja realmente excluir esse item?',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger mx-3'
      },
    }).then(result => {

      if (result.value) {
        this.productService.delete(product.productId)
          .subscribe(v=>{
            this.toastService.show(`Product ${product.Name} excluído com sucesso`, { classname: 'bg-success', delay: 4000})
          }, ()=>{}, ()=>{
            this.loadProduct(this.paginationRequest);
          })
      }
    });

  }
  updateAccountForm(product: productModel) {
    this.productForm.patchValue(product)
  }

  // função que invoca a tabela de cadastro
  openModal(content, product: productModel) {
    this.modal = this.modalService.open(content);
    this.updateAccountForm(product);
    this.modal.dismissed.subscribe(v => {
      if(v == 0 || v == 1 || v == 'Cross click')
      this.productForm.reset();
    });
  }
  getForm(control) {
    return this.productForm.get(control);
  }
  get form() {
    return this.productForm.controls;
  }

}

