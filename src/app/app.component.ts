import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormatsDialogComponent } from './formats-dialog/formats-dialog.component';
import { AppInfoDialogComponent } from './app-info-dialog/app-info-dialog.component';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'barcode-scanner';

  availableDevices: MediaDeviceInfo[];     // The MediaDevicesInfo interface contains information that describes a single media input or output device. 
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  torchEnabled = false;
  tryHarder = false;


  // List of enabled BarcodeFormates
  // formatsEnabled: BarcodeFormat[] = Object.keys(BarcodeFormat).map(key => BarcodeFormat[key]);
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.AZTEC,
    BarcodeFormat.CODABAR,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.ITF,
    BarcodeFormat.MAXICODE,
    BarcodeFormat.PDF_417,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.RSS_14,
    BarcodeFormat.RSS_EXPANDED,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.UPC_EAN_EXTENSION,
  ]


  torchAvailable$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly _dialog: MatDialog) { }


  // searching for camara and setting
  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  // This method selects camara if available
  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  // This method checks, if camara has been given a permission.
  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  // This method is to display (dialog), whether this device has a camara and permission. Actually it asks for permission
  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };
    this._dialog.open(AppInfoDialogComponent, { data });
  }

  // Checks if camara is compatable.
  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  // This methods toggles between camara and no camara. 
  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  // This methods display which formats are enabled. Also it opens FormatsDialgComponent (sibling, used as entry component.)
  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };
    this._dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  }


  // qrCode result as string:
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }


  // clearing qr code result
  clearResult(): void {
    this.qrResultString = null;
  }



  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
}
