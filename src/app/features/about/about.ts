import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatChipsModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './about.html',
    styleUrl: './about.scss',
})
export class AboutComponent {
    readonly skills = signal([
        'Angular',
        'TypeScript',
        'RxJS',
        'SCSS',
        'Tailwind CSS',
        'Node.js',
        'Git',
        'Figma',
        'REST APIs',
        'Angular Material',
    ]);
}
