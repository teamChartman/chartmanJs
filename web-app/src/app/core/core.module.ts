import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title, BrowserModule } from '@angular/platform-browser';
import locale from '@angular/common/locales/en';
import { JHI_PIPES, JHI_DIRECTIVES, JHI_COMPONENTS } from './jhi-components';

@NgModule({
    imports: [HttpClientModule,CommonModule],
    exports: [
        ...JHI_PIPES,
        ...JHI_DIRECTIVES,
        ...JHI_COMPONENTS,
        CommonModule                
    ],
    declarations: [
        ...JHI_PIPES,
        ...JHI_DIRECTIVES,
        ...JHI_COMPONENTS        
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
        DatePipe
    ]
})
export class DemoCoreModule {
    constructor() {
        registerLocaleData(locale);
    }
}
