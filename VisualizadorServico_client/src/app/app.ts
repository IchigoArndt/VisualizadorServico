import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <i class="pi pi-server header-icon"></i>
        <div>
          <h1>Visualizador de Serviço IIS</h1>
          <p>Monitoramento de Application Pools</p>
        </div>
      </header>
      <main class="app-content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {}
