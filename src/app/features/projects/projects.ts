import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

interface Project {
    title: string;
    description: string;
    techs: string[];
    category: 'web' | 'ui' | 'oss';
    liveUrl: string;
    githubUrl: string;
}

type FilterTab = 'all' | 'web' | 'ui' | 'oss';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatTabsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './projects.html',
    styleUrl: './projects.scss',
})
export class ProjectsComponent {
    readonly activeFilter = signal<FilterTab>('all');

    readonly projects = signal<Project[]>([
        {
            title: 'Geist Design System',
            description:
                "A comprehensive Angular component library inspired by Vercel's Geist design system, featuring shadow-as-border and signal-based architecture.",
            techs: ['Angular', 'TypeScript', 'SCSS'],
            category: 'ui',
            liveUrl: '#',
            githubUrl: '#',
        },
        {
            title: 'Portfolio Builder',
            description:
                'A drag-and-drop portfolio builder for developers, with live preview, dark mode, and PDF export capabilities.',
            techs: ['Angular', 'RxJS', 'Node.js'],
            category: 'web',
            liveUrl: '#',
            githubUrl: '#',
        },
        {
            title: 'DevTask CLI',
            description:
                'A command-line task manager for developers with Git integration, smart tagging, and team collaboration features.',
            techs: ['TypeScript', 'Node.js', 'Git'],
            category: 'oss',
            liveUrl: '#',
            githubUrl: '#',
        },
        {
            title: 'Analytics Dashboard',
            description:
                'Real-time analytics dashboard with customizable widgets, CSV export, and role-based access control.',
            techs: ['Angular', 'TypeScript', 'REST APIs'],
            category: 'web',
            liveUrl: '#',
            githubUrl: '#',
        },
        {
            title: 'Icon Palette',
            description:
                'An open-source icon library with 400+ hand-crafted SVG icons, available as npm package and Figma plugin.',
            techs: ['SVG', 'Figma', 'npm'],
            category: 'oss',
            liveUrl: '#',
            githubUrl: '#',
        },
        {
            title: 'Micro-frontend Shell',
            description:
                'A scalable micro-frontend shell using Angular Module Federation with shared state and consistent design tokens.',
            techs: ['Angular', 'Webpack', 'TypeScript'],
            category: 'web',
            liveUrl: '#',
            githubUrl: '#',
        },
    ]);

    readonly filteredProjects = computed(() => {
        const filter = this.activeFilter();
        if (filter === 'all') return this.projects();
        return this.projects().filter(p => p.category === filter);
    });

    readonly tabs: { value: FilterTab; label: string }[] = [
        { value: 'all', label: 'All' },
        { value: 'web', label: 'Web Apps' },
        { value: 'ui', label: 'UI/UX' },
        { value: 'oss', label: 'Open Source' },
    ];

    setFilter(filter: FilterTab): void {
        this.activeFilter.set(filter);
    }
}
