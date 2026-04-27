import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contact.html',
    styleUrl: './contact.scss',
})
export class ContactComponent {
    private readonly fb = inject(FormBuilder);
    private readonly snackBar = inject(MatSnackBar);

    readonly isSubmitting = signal(false);

    readonly form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        message: ['', [Validators.required, Validators.minLength(10)]],
    });

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSubmitting.set(true);
        setTimeout(() => {
            this.isSubmitting.set(false);
            this.form.reset();
            this.snackBar.open('訊息已送出！我會盡快回覆。', '關閉', { duration: 4000 });
        }, 1000);
    }
}
