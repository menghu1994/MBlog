import { Routes } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'qrcode',
        loadComponent: () => import('./shared/components/qr-code/qr-code.component').then(c => c.QrCodeComponent)
      },
      {
        path: 'fun',
        loadComponent: () => import('./views/fun-test/fun-test.component').then(c => c.FunTestComponent),
        children: [
          {
            path: 'web-animation',
            loadComponent: () => import('./views/fun-test/web-animation/web-animation.component').then(c => c.WebAnimationComponent)
          },
          {
            path: 'ng-animation',
            loadComponent: () => import('./views/fun-test/ng-animation/ng-animation.component').then(c => c.NgAnimationComponent)
          }
        ]
      }
    ]
  }
];
