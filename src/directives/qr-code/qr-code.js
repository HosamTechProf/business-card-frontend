var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef } from '@angular/core';
import * as QRCode from 'qrcode';
/**
 * Generated class for the QrCodeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
var QrCodeDirective = /** @class */ (function () {
    function QrCodeDirective(element) {
        this.element = element;
        this.options = {
            errorCorrectionLevel: 'Q',
            margin: 1,
            scale: 20,
            color: {
                dark: '#FFFFFF',
                light: '#DA3C27'
            }
        };
    }
    QrCodeDirective.prototype.ngOnInit = function () {
        var _this = this;
        var canvas = document.createElement('canvas');
        QRCode.toDataURL(canvas, this.value, this.options, function (err, url) {
            _this.element.nativeElement.src = canvas.toDataURL('image/png');
            var context = canvas.getContext('2d');
            var size = canvas.width / 2.5;
            var pos = (canvas.width - size) / 2;
            var img = new Image();
            img.onload = function () {
                context.drawImage(img, pos, pos, size, size);
                _this.element.nativeElement.src = canvas.toDataURL('image/png');
            };
            img.src = 'assets/imgs/icon.png';
        });
    };
    __decorate([
        Input('qrValue'),
        __metadata("design:type", String)
    ], QrCodeDirective.prototype, "value", void 0);
    QrCodeDirective = __decorate([
        Directive({
            selector: '[qr-code]' // Attribute selector
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], QrCodeDirective);
    return QrCodeDirective;
}());
export { QrCodeDirective };
//# sourceMappingURL=qr-code.js.map