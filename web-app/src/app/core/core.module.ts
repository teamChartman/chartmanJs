import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import locale from '@angular/common/locales/en';

@NgModule({
    imports: [HttpClientModule,CommonModule],
    exports: [
        CommonModule                
    ],
    declarations: [],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
        DatePipe
    ]
})
export class CMCoreModule {

    
    constructor() {
        registerLocaleData(locale);
    }
}
