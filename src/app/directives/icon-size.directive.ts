import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appIconSize]'
})
export class IconSizeDirective {
  @Input()
  @HostBinding('style.font-size')
  @HostBinding('style.height')
  @HostBinding('style.width')
  appIconSize = '24px';
}
