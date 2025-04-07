import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ILayout, NewLayout } from '../layout.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILayout for edit and NewLayoutFormGroupInput for create.
 */
type LayoutFormGroupInput = ILayout | PartialWithRequiredKeyOf<NewLayout>;

type LayoutFormDefaults = Pick<NewLayout, 'id'>;

type LayoutFormGroupContent = {
  id: FormControl<ILayout['id'] | NewLayout['id']>;
};

export type LayoutFormGroup = FormGroup<LayoutFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LayoutFormService {
  createLayoutFormGroup(layout: LayoutFormGroupInput = { id: null }): LayoutFormGroup {
    const layoutRawValue = {
      ...this.getFormDefaults(),
      ...layout,
    };
    return new FormGroup<LayoutFormGroupContent>({
      id: new FormControl(
        { value: layoutRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
    });
  }

  getLayout(form: LayoutFormGroup): NewLayout {
    return form.getRawValue() as NewLayout;
  }

  resetForm(form: LayoutFormGroup, layout: LayoutFormGroupInput): void {
    const layoutRawValue = { ...this.getFormDefaults(), ...layout };
    form.reset(
      {
        ...layoutRawValue,
        id: { value: layoutRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LayoutFormDefaults {
    return {
      id: null,
    };
  }
}
