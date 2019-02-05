import { Directive, HostBinding, HostListener, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

    ngOnInit() { }

    @HostBinding('class') clickClass = '';

    @HostListener('mouseover') mouseover(eventData: Event) {
        this.clickClass = 'open'
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.clickClass = ''
    }


}