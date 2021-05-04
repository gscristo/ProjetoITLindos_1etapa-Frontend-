import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedSortableDirective, SortEvent } from 'src/app/shared/directives/advanced-sortable.directive';
import { LoaderService } from "src/app/core/services/loader.service";
import { ToastService } from "src/app/shared/ui/toast/toast.service";
import Swal from 'sweetalert2';
import { CustomerModel } from './customer.model';
import { DATA } from './mock.customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/shared/custom-validators/custom-validators';
import { CustomerService } from 'src/app/core/services/customer/customer.service';
import { PaginationRequest } from 'src/app/core/services/models/pagination-request';
import { PaginationResult } from 'src/app/core/services/models/pagination-result';

@Component({
  selector: 'app-cutomer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  customerAdd: CustomerModel = new CustomerModel();
  customerDataPagination: PaginationResult<CustomerModel>;
  customerForm: FormGroup;

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
    private customerService: CustomerService
    ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Cadastros" },
      { label: "Clientes", active: true },
    ];

    this.loadCustomers(this.paginationRequest);

    this.customerForm = this.formBuilder.group({
      personId: null,
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      socialNumber: [null, [Validators.required]],
      fone: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      street: [null, [Validators.required]],
      number: [null, [Validators.required]],
      neighborhood: [null],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
    });

  }
  loadCustomers(paginationRequest: PaginationRequest) {
    this.customerService.getAll(paginationRequest)
      .subscribe(resp => {
        this.customerDataPagination = resp.content;
      })
  }
  teste(){
    console.log(this.customerForm.value)
  }
  savePerson() {
    this.modalService.dismissAll();
    const id = this.getForm("personId").value;

      if (!id) {
        this.customerService.post(this.customerForm.value)
          .subscribe(c => {
            this.toastService.show(`Cliente ${c.content.name} Cadastrada com sucesso`, { classname: 'bg-success', delay: 4000})
          }, ()=>{}, ()=>{
            this.loadCustomers(this.paginationRequest);
          })
      } else {
        this.customerService.put(this.customerForm.value)
        .subscribe(c => {
          this.toastService.show(`Cliente ${c.content.name} Alterado com sucesso`, { classname: 'bg-success', delay: 4000})
        },()=>{}, ()=>{
          this.loadCustomers(this.paginationRequest);
        })
      }
      this.customerForm.reset();
  }
  deleteAccount(customer: CustomerModel) {
    Swal.fire({
      title: customer.name,
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
        this.customerService.delete(customer.personId)
          .subscribe(v=>{
            this.toastService.show(`Cliente ${customer.name} excluído com sucesso`, { classname: 'bg-success', delay: 4000})
          }, ()=>{}, ()=>{
            this.loadCustomers(this.paginationRequest);
          })
      }
    });

  }
  updateAccountForm(customer: CustomerModel) {
    this.customerForm.patchValue(customer)
  }
  openModal(content, customer: CustomerModel) {
    this.modal = this.modalService.open(content);
    this.updateAccountForm(customer);
    this.modal.dismissed.subscribe(v => {
      if(v == 0 || v == 1 || v == 'Cross click')
      this.customerForm.reset();
    });
  }
  getForm(control) {
    return this.customerForm.get(control);
  }
  get form() {
    return this.customerForm.controls;
  }

}
