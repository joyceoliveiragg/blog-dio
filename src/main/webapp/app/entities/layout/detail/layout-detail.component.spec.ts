import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LayoutDetailComponent } from './layout-detail.component';

describe('Layout Management Detail Component', () => {
  let comp: LayoutDetailComponent;
  let fixture: ComponentFixture<LayoutDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./layout-detail.component').then(m => m.LayoutDetailComponent),
              resolve: { layout: () => of({ id: 14892 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LayoutDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load layout on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LayoutDetailComponent);

      // THEN
      expect(instance.layout()).toEqual(expect.objectContaining({ id: 14892 }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
