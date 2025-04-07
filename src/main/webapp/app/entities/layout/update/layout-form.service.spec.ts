import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../layout.test-samples';

import { LayoutFormService } from './layout-form.service';

describe('Layout Form Service', () => {
  let service: LayoutFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutFormService);
  });

  describe('Service methods', () => {
    describe('createLayoutFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLayoutFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
          }),
        );
      });

      it('passing ILayout should create a new form with FormGroup', () => {
        const formGroup = service.createLayoutFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
          }),
        );
      });
    });

    describe('getLayout', () => {
      it('should return NewLayout for default Layout initial value', () => {
        const formGroup = service.createLayoutFormGroup(sampleWithNewData);

        const layout = service.getLayout(formGroup) as any;

        expect(layout).toMatchObject(sampleWithNewData);
      });

      it('should return NewLayout for empty Layout initial value', () => {
        const formGroup = service.createLayoutFormGroup();

        const layout = service.getLayout(formGroup) as any;

        expect(layout).toMatchObject({});
      });

      it('should return ILayout', () => {
        const formGroup = service.createLayoutFormGroup(sampleWithRequiredData);

        const layout = service.getLayout(formGroup) as any;

        expect(layout).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILayout should not enable id FormControl', () => {
        const formGroup = service.createLayoutFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLayout should disable id FormControl', () => {
        const formGroup = service.createLayoutFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
