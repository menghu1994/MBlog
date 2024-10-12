import {Component, ElementRef, OnInit, viewChild, ViewChild} from '@angular/core';
import QRCodeStyling from 'qr-code-styling';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [],
  template: `
    <div class="content" role="main">
      <div class="qrcode">
        <div #canvas></div>
        <svg class="qr-title" viewBox="0 0 400 400" width="400" height="400">
          <path id="textPath" fill="none" stroke="#D5B882" d="M82 232a150 150 0 1 0 300 0a150 150 0 1 0 -300 0z" />
          <text>
            <textPath href="#textPath">
              实际开发径应该设置在中不显示
            </textPath>
          </text>
        </svg>
      </div>
      <label>
        <input (keyup)="onKey($event)" [value]=data>
        <select (change)="onChange($event)" [value]=extension>
          <option value="svg">SVG</option>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        <button (click)="download()">Download</button>
      </label>
    </div>
  `,
  styles: `
    .qrcode {
      width: 464px;
      height: 464px;
      text-align: center;
      //border-radius: 50%;
      border: 40px solid transparent;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #D5B882;
      position: relative;
      .qr-title {
        position: absolute;
      }
    }
  `
})
export class QrCodeComponent implements OnInit{
  data = 'If you would like to use additional stiles, you can connect extensions.';
  extension = 'svg';
  qrCode: any = null;

  canvas = viewChild<ElementRef>('canvas');

  ngOnInit(): void {
    this.qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: 'svg',
      data: this.data,
      image: '/favicon.ico',
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 20,
        crossOrigin: 'anonymous',
      },
      dotsOptions: {
        color: '#000',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
        // },
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#D5B882',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
        // },
      },
      cornersSquareOptions: {
        color: '#000',
        type: 'extra-rounded',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
        // },
      },
      cornersDotOptions: {
        color: '#000',
        type: 'dot',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
        // },
      }
    });

    this.qrCode.append(this.canvas()!.nativeElement);
  }

  onKey(event: any): void {
    this.data = event.target.value;
    this.qrCode.update({
      data: this.data
    });
  }

  onChange(event: any): void {
    this.extension = event.target.value;
  }

  download(): void {
    this.qrCode.download({ extension: this.extension });
  }
}
