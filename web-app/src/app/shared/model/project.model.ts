import { Moment } from 'moment';

export interface IProject {
    id?: string;
    name?: string;
    description?: string;
    active?: boolean;
    startDate?: Moment;
    createdDate?: Moment;
    updatedDate?: Moment;
    endDate?: Moment;
    createdBy?: string;
    updatedBy?: string;
}

export class Project implements IProject {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public active?: boolean,
        public startDate?: Moment,
        public createdDate?: Moment,
        public updatedDate?: Moment,
        public endDate?: Moment,
        public createdBy?: string,
        public updatedBy?: string
    ) {
        this.active = this.active || false;
    }
}
