import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from '../about/about';
import { ContactComponent } from '../contact/contact';
import { HeroComponent } from '../hero/hero';
import { ProjectsComponent } from '../projects/projects';
import { SkillsComponent } from '../skills/skills';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroComponent, AboutComponent, ProjectsComponent, SkillsComponent, ContactComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class HomeComponent {}
