import { Routes } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {QrCodeComponent} from './shared/components/qr-code/qr-code.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'qrcode',
        component: QrCodeComponent
      }
    ]
  }
];
