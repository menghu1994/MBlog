import {Component, effect, ElementRef, input, viewChild, ViewEncapsulation} from '@angular/core';
import {marked, MarkedExtension} from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.min.css';
import {NzTreeComponent, NzTreeModule} from 'ng-zorro-antd/tree';
import {NzIconModule} from 'ng-zorro-antd/icon';

@Component({
  selector: 'm-md-reader',
  standalone: true,
  imports: [NzTreeComponent, NzIconModule],
  template: `
    <div class="flex flex-row">
      <nz-tree [nzData]="treeData"></nz-tree>
<!--      <div class="grow p-2" #mdContent></div>-->
    </div>
  `,
  styleUrl: './md-reader.component.scss'
})
export class MdReaderComponent {
  file = input<string>('');
  content = viewChild<ElementRef>('mdContent');
  dirList: any[] = [];
  treeData: any[] = [];
  extensionOption: MarkedExtension = {
    breaks: true
  }

  constructor() {
    effect(() => {
      fetch(this.file())
        .then(resp => resp.text())
        .then(text => {
          this.renderFile(text);
          this.treeData = this.generateTocTree(this.dirList);
        })
    })
  }

  renderFile(text: string): void {
    this.dirList = [];
    const renderer = new marked.Renderer();

    renderer.heading = ({ tokens , depth }): string => {
      const text = renderer.parser.parseInline(tokens);
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      this.dirList.push({text, depth, anchor: escapedText})

      return `
            <h${depth}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${depth}>
        `;
    }

    renderer.code = ({text, lang, escaped}):string =>  {
      const validLang = lang && hljs.getLanguage(lang);
      const highlighted = validLang
        ? hljs.highlight(text, { language: lang }).value
        : hljs.highlightAuto(text).value;
      return `<pre><code class="hljs ${lang}">${highlighted}</code></pre>`;
    }

    if(this.content()?.nativeElement) {
      this.content()!.nativeElement.innerHTML = marked.use(this.extensionOption).parse(text, { renderer });
    }
  }

  generateTocTree(headings: any[]): any[] {
    const root: any[] = [];
    const stack: any[] = [{ depth: 0, children: root }];

    headings.forEach(heading => {
      const { depth, text, anchor } = heading;
      const newItem = { title: text,key: anchor,expanded: true,icon: 'smile', children: [] };

      while (stack[stack.length - 1].depth >= depth) {
        stack.pop();
      }

      stack[stack.length - 1].children.push(newItem);
      stack.push({ depth, children: newItem.children });
    });

    return root;
  }

}
