import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILayout } from '../layout.model';
import { LayoutService } from '../service/layout.service';

@Component({
  templateUrl: './layout-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LayoutDeleteDialogComponent {
  layout?: ILayout;

  protected layoutService = inject(LayoutService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.layoutService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
