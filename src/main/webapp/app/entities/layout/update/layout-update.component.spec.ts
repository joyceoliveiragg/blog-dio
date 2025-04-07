import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { LayoutService } from '../service/layout.service';
import { ILayout } from '../layout.model';
import { LayoutFormService } from './layout-form.service';

import { LayoutUpdateComponent } from './layout-update.component';

describe('Layout Management Update Component', () => {
  let comp: LayoutUpdateComponent;
  let fixture: ComponentFixture<LayoutUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let layoutFormService: LayoutFormService;
  let layoutService: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayoutUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(LayoutUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LayoutUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    layoutFormService = TestBed.inject(LayoutFormService);
    layoutService = TestBed.inject(LayoutService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const layout: ILayout = { id: 22001 };

      activatedRoute.data = of({ layout });
      comp.ngOnInit();

      expect(comp.layout).toEqual(layout);
    });
  });

  describe('save', () => {
    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILayout>>();
      const layout = { id: 14892 };
      jest.spyOn(layoutFormService, 'getLayout').mockReturnValue({ id: null });
      jest.spyOn(layoutService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ layout: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: layout }));
      saveSubject.complete();

      // THEN
      expect(layoutFormService.getLayout).toHaveBeenCalled();
      expect(layoutService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });
  });
});
