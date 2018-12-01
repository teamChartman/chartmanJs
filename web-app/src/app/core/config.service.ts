import { Injectable } from '@angular/core';
import { JhiModuleConfig } from './config';

@Injectable({
    providedIn: 'root'
})
export class JhiConfigService {
    CONFIG_OPTIONS: JhiModuleConfig;

    constructor(moduleConfig?: JhiModuleConfig) {
        this.CONFIG_OPTIONS = {
            ...new JhiModuleConfig(),
            ...moduleConfig
        };
    }

    getConfig(): JhiModuleConfig {
        return this.CONFIG_OPTIONS;
    }
}
