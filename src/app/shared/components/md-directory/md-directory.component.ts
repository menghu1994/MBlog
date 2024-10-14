import {Component, computed, input} from '@angular/core';
import {NzTreeModule} from 'ng-zorro-antd/tree';
import {NzIconModule} from 'ng-zorro-antd/icon';

@Component({
  selector: 'm-md-directory',
  standalone: true,
  imports: [NzTreeModule, NzIconModule],
  template: `
    <nz-tree [nzData]="compDir()" nzShowIcon></nz-tree>
  `,
  styles: ``
})
export class MdDirectoryComponent {
  directory = input.required<any[]>();

  compDir = computed(() => {
    return this.nodes
  });
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      icon: 'smile',
      children: [
        { title: 'leaf', key: '1001', icon: 'meh', isLeaf: true, children: [
            { title: 'leaf1', key: '1005', icon: 'meh', isLeaf: false }
          ] },
        { title: 'leaf', key: '1002', icon: 'frown', isLeaf: true }
      ]
    }
  ];

  turnTree(dirs: any[]): any[] {
    return dirs.reduce((acc, cur) => {
      const curDir = acc.find((d: any) => d.depth === cur.depth);
      if (curDir) {

      } else {

      }
    }, [])
  }
}
