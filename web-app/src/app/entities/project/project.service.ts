import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProject } from 'app/shared/model/project.model';

type EntityResponseType = HttpResponse<IProject>;
type EntityArrayResponseType = HttpResponse<IProject[]>;

@Injectable({ providedIn: 'root' })
export class ProjectService {
    public resourceUrl = SERVER_API_URL + 'api/projects';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/projects';

    constructor(private http: HttpClient) {}

    create(project: IProject): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(project);
        return this.http
            .post<IProject>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(project: IProject): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(project);
        return this.http
            .put<IProject>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IProject>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProject[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProject[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(project: IProject): IProject {
        const copy: IProject = Object.assign({}, project, {
            startDate: project.startDate != null && project.startDate.isValid() ? project.startDate.toJSON() : null,
            createdDate: project.createdDate != null && project.createdDate.isValid() ? project.createdDate.toJSON() : null,
            updatedDate: project.updatedDate != null && project.updatedDate.isValid() ? project.updatedDate.toJSON() : null,
            endDate: project.endDate != null && project.endDate.isValid() ? project.endDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
            res.body.updatedDate = res.body.updatedDate != null ? moment(res.body.updatedDate) : null;
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((project: IProject) => {
                project.startDate = project.startDate != null ? moment(project.startDate) : null;
                project.createdDate = project.createdDate != null ? moment(project.createdDate) : null;
                project.updatedDate = project.updatedDate != null ? moment(project.updatedDate) : null;
                project.endDate = project.endDate != null ? moment(project.endDate) : null;
            });
        }
        return res;
    }
}
