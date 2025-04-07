import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ILayout } from '../layout.model';

@Component({
  selector: 'jhi-layout-detail',
  templateUrl: './layout-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class LayoutDetailComponent {
  layout = input<ILayout | null>(null);

  previousState(): void {
    window.history.back();
  }
}
