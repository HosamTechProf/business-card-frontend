import { Directive, Input, ElementRef } from '@angular/core';
import * as QRCode from 'qrcode';

/**
 * Generated class for the QrCodeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[qr-code]' // Attribute selector
})
export class QrCodeDirective {
	@Input('qrValue') value: string;
	options= {
	  errorCorrectionLevel:'Q',
	  margin:1,
	  scale:20,
	  color: {
	    dark:'#FFFFFF',
	    light:'#DA3C27'
	  }
	};
  constructor(public element: ElementRef) {}
	ngOnInit() {
	  let canvas = document.createElement('canvas');
	  QRCode.toDataURL(canvas, this.value, this.options, (err, url) => {
	    this.element.nativeElement.src = canvas.toDataURL('image/png');
	    let context = canvas.getContext('2d');
	    let size = canvas.width / 2.5;
	    let pos = (canvas.width - size) / 2;
	    let img = new Image();
	    img.onload = () => {
	      context.drawImage(img, pos, pos, size, size);
	      this.element.nativeElement.src = canvas.toDataURL('image/png');
	    }
	    img.src = 'assets/imgs/icon.png';
	  });
	}
}
