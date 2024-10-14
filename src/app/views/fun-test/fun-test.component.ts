import {Component, OnInit} from '@angular/core';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {routes} from '../../app.routes';
import {RouterLink, RouterOutlet, Routes} from '@angular/router';

@Component({
  selector: 'm-fun-test',
  standalone: true,
  imports: [NzFlexModule, NzButtonModule, RouterLink, RouterOutlet],
  template: `
    <div class="btn-wrapper" nz-flex [nzGap]="'middle'" [nzWrap]="'wrap'">
      @for (_ of array; track _) {
        <a [routerLink]="[_.path]" style="width: 100px" nz-button nzType="primary">{{ _.path }}</a>
      }
    </div>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class FunTestComponent implements OnInit{
  private routes: Routes = routes;
  array: Routes = [];

  constructor() {}

  ngOnInit(): void {
    this.array = this.routes[0].children!.find(route => route.path === 'fun')!.children!;
  }

}
