import { Component, DOCUMENT, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, TooltipModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <i class="pi pi-server header-icon"></i>
        <div class="header-title">
          <h1>Visualizador de Serviço IIS</h1>
          <p>Monitoramento de Application Pools</p>
        </div>
        <button
          pButton
          [icon]="isDark() ? 'pi pi-sun' : 'pi pi-moon'"
          [pTooltip]="isDark() ? 'Modo claro' : 'Modo escuro'"
          tooltipPosition="bottom"
          tooltipStyleClass="nowrap-tooltip"
          class="theme-toggle-btn"
          (click)="toggleDarkMode()"
        ></button>
      </header>
      <main class="app-content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {
  private readonly doc = inject(DOCUMENT);
  readonly isDark = signal(false);

  constructor() {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      this.isDark.set(true);
    }

    effect(() => {
      if (this.isDark()) {
        this.doc.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        this.doc.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    });
  }

  toggleDarkMode(): void {
    this.isDark.update(v => !v);
  }
}
