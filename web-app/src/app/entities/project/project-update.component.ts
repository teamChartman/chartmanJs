import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from './project.service';

@Component({
    selector: 'jhi-project-update',
    templateUrl: './project-update.component.html'
})
export class ProjectUpdateComponent implements OnInit {
    project: IProject;
    isSaving: boolean;
    startDate: string;
    createdDate: string;
    updatedDate: string;
    endDate: string;

    constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ project }) => {
            this.project = project;
            this.startDate = this.project.startDate != null ? this.project.startDate.format(DATE_TIME_FORMAT) : null;
            this.createdDate = this.project.createdDate != null ? this.project.createdDate.format(DATE_TIME_FORMAT) : null;
            this.updatedDate = this.project.updatedDate != null ? this.project.updatedDate.format(DATE_TIME_FORMAT) : null;
            this.endDate = this.project.endDate != null ? this.project.endDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.project.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        this.project.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.project.updatedDate = this.updatedDate != null ? moment(this.updatedDate, DATE_TIME_FORMAT) : null;
        this.project.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        if (this.project.id !== undefined) {
            this.subscribeToSaveResponse(this.projectService.update(this.project));
        } else {
            this.subscribeToSaveResponse(this.projectService.create(this.project));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProject>>) {
        result.subscribe((res: HttpResponse<IProject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
