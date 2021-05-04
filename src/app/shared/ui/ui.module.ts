import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbCollapseModule, NgbDatepickerModule, NgbTimepickerModule, NgbDropdownModule, NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { LoaderComponent } from './loader/loader.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [PagetitleComponent, LoaderComponent, ToastComponent, ],
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbDropdownModule,
    NgbToastModule,
    NgbTooltipModule,
  ],
  exports: [PagetitleComponent, LoaderComponent, ToastComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UIModule { }
