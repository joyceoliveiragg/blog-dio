import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILayout, NewLayout } from '../layout.model';

export type EntityResponseType = HttpResponse<ILayout>;
export type EntityArrayResponseType = HttpResponse<ILayout[]>;

@Injectable({ providedIn: 'root' })
export class LayoutService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/layouts');

  create(layout: NewLayout): Observable<EntityResponseType> {
    return this.http.post<ILayout>(this.resourceUrl, layout, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILayout>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILayout[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLayoutIdentifier(layout: Pick<ILayout, 'id'>): number {
    return layout.id;
  }

  compareLayout(o1: Pick<ILayout, 'id'> | null, o2: Pick<ILayout, 'id'> | null): boolean {
    return o1 && o2 ? this.getLayoutIdentifier(o1) === this.getLayoutIdentifier(o2) : o1 === o2;
  }

  addLayoutToCollectionIfMissing<Type extends Pick<ILayout, 'id'>>(
    layoutCollection: Type[],
    ...layoutsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const layouts: Type[] = layoutsToCheck.filter(isPresent);
    if (layouts.length > 0) {
      const layoutCollectionIdentifiers = layoutCollection.map(layoutItem => this.getLayoutIdentifier(layoutItem));
      const layoutsToAdd = layouts.filter(layoutItem => {
        const layoutIdentifier = this.getLayoutIdentifier(layoutItem);
        if (layoutCollectionIdentifiers.includes(layoutIdentifier)) {
          return false;
        }
        layoutCollectionIdentifiers.push(layoutIdentifier);
        return true;
      });
      return [...layoutsToAdd, ...layoutCollection];
    }
    return layoutCollection;
  }
}
