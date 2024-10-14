import {Component, effect, ElementRef, input, viewChild, ViewEncapsulation} from '@angular/core';
import {marked, MarkedExtension} from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.min.css';
import {MdDirectoryComponent} from '../md-directory/md-directory.component';

@Component({
  selector: 'm-md-reader',
  standalone: true,
  imports: [MdDirectoryComponent],
  template: `
    <div class="flex flex-row">
      <div class="grow p-2" #mdContent></div>
      <m-md-directory class="basis-32" [directory]="dirList"></m-md-directory>
    </div>
  `,
  styleUrl: './md-reader.component.scss'
})
export class MdReaderComponent {
  file = input<string>('');
  content = viewChild<ElementRef>('mdContent');
  dirList: any[] = [];
  extensionOption: MarkedExtension = {
    breaks: true
  }

  constructor() {
    effect(() => {
      fetch(this.file())
        .then(resp => resp.text())
        .then(text => {
            // if(this.content()?.nativeElement) {
            //   this.content()!.nativeElement.innerHTML = marked.use({
            //     breaks: true
            //   }).parse(text);
            // }
          this.renderFile(text);
          // this.generateTOC()
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

  generateTOC(): void {
    // const tocHtml = this.tocList.map(item => {
    //   // 根据标题级别生成缩进
    //   const indent = '&nbsp;'.repeat((item.level - 1) * 4);
    //   return `${indent}<a href="#${item.slug}">${item.text}</a><br>`;
    // }).join('');
    // if(this.directory()?.nativeElement) {
    //   this.directory()!.nativeElement.innerHTML = tocHtml
    // }
  }

}
