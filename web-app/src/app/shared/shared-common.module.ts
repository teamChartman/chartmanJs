import { NgModule } from '@angular/core';

import { CMSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';


@NgModule({
    imports: [CMSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [CMSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CMSharedCommonModule {}
