import { Component, Input } from '@angular/core';

@Component({
    selector: 'social-button',
    templateUrl: 'social-button.component.html'
})
export class SocialButtonComponent {
    @Input() url: string;
    @Input() type: string;

    openLink() {
        var target = this.type === 'email' ? '_self' : '_blank';
        window.open(this.url, target);
    }
}
