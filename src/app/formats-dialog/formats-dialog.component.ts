import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { BarcodeFormat } from '@zxing/library';
import { formatNames, formatsAvailable } from '../barcode-format';

@Component({
  selector: 'app-formats-dialog',
  templateUrl: './formats-dialog.component.html',
  styleUrls: ['./formats-dialog.component.scss']
})
export class FormatsDialogComponent {

  formatsAvailable = formatsAvailable;
  formatsEnabled: BarcodeFormat[];

  readonly formatNames = formatNames;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any,
    private readonly _dialogRef: MatDialogRef<FormatsDialogComponent>,
  ) {
    this.formatsEnabled = data.formatsEnabled || [];
  }


  // This method is to close the dialog
  close() {
    this._dialogRef.close(this.formatsEnabled);
  }

  // Checks if barcode format is enabled.
  isEnabled(format: BarcodeFormat) {
    return this.formatsEnabled.find(x => x === format);
  }

  // This is to display the selected enabled barcode formats.
  onSelectionChange(event: MatSelectionListChange) {
    this.formatsEnabled = event.source.selectedOptions.selected.map(selected => selected.value);
  }

}
