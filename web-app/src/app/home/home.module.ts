import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoSharedModule } from '../shared';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';


@NgModule({
    imports: [DemoSharedModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHomeModule {}
