import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CMSharedModule } from '../shared';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';


@NgModule({
    imports: [CMSharedModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CMHomeModule {}
