import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface SkillGroup {
    category: string;
    dotColor: string;
    skills: string[];
}

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [MatCardModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './skills.html',
    styleUrl: './skills.scss',
})
export class SkillsComponent {
    readonly skillGroups = signal<SkillGroup[]>([
        {
            category: 'Frontend',
            dotColor: '#059669',
            skills: [
                'Angular',
                'TypeScript',
                'RxJS',
                'SCSS',
                'Tailwind CSS',
                'HTML5',
                'Angular Material',
            ],
        },
        {
            category: 'Backend & Tools',
            dotColor: '#4d4d4d',
            skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'Git', 'Docker', 'Jest'],
        },
        {
            category: 'Design & UX',
            dotColor: '#de1d8d',
            skills: [
                'Figma',
                'Design Systems',
                'Accessibility (WCAG)',
                'Responsive Design',
                'Component Libraries',
            ],
        },
    ]);
}
