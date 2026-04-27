import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [MatButtonModule, MatChipsModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './hero.html',
    styleUrl: './hero.scss',
})
export class HeroComponent {}
