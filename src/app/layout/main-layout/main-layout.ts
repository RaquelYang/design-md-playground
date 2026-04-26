import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer';
import { HeaderComponent } from '../header/header';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './main-layout.html',
    styleUrl: './main-layout.scss',
})
export class MainLayoutComponent {}
