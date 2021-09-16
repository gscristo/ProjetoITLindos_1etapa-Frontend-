import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main.routing.module';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from '../shared/ui/ui.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { productComponent } from './product/product.component';



@NgModule({
  declarations: [HomeComponent, CustomerComponent, productComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    UIModule,
    NgxMaskModule.forRoot(),
    NgbTooltipModule,
  ]
})
export class MainModule { }
