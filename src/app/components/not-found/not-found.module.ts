import { NgModule } from '@angular/core';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }
