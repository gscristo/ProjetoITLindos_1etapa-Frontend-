import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from '../core/services/customer/customer.service';
import { productService } from '../core/services/product/product.service';
import { productComponent } from './product/product.component';


const routes: Routes = [
    { path: '', redirectTo: 'home'},
    { path: 'home', component: HomeComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'product', component: productComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
