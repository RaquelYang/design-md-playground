import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, MatButtonModule, MatIconModule, MatToolbarModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class HeaderComponent {
    readonly menuOpen = signal(false);

    toggleMenu(): void {
        this.menuOpen.update(v => !v);
    }

    closeMenu(): void {
        this.menuOpen.set(false);
    }
}
