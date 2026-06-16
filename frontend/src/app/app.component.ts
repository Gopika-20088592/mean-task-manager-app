import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-wrapper">
      <header class="app-header">
        <div class="header-inner">
          <div class="logo">
            <span class="logo-icon">✓</span>
            <div>
              <h1>MEAN Task Manager</h1>
              <p>MongoDB · Express · Angular · Node.js</p>
            </div>
          </div>
          <div class="stack-badges">
            <span class="badge mongo">MongoDB</span>
            <span class="badge express">Express</span>
            <span class="badge angular">Angular</span>
            <span class="badge node">Node.js</span>
          </div>
        </div>
      </header>
      <main class="app-main">
        <app-task-form (taskAdded)="taskList.loadTasks()"></app-task-form>
        <app-task-list #taskList></app-task-list>
      </main>
    </div>
  `,
  styles: [`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .app-wrapper { min-height: 100vh; background: #f5f5f5; }
    .app-header { background: #1a1a2e; padding: 1rem 2rem; }
    .header-inner { max-width: 800px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
    .logo { display: flex; align-items: center; gap: 12px; }
    .logo-icon { width: 40px; height: 40px; background: #4ade80; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold; color: #14532d; flex-shrink: 0; }
    .logo h1 { color: white; font-size: 20px; font-weight: 600; }
    .logo p { color: #94a3b8; font-size: 12px; margin-top: 2px; }
    .stack-badges { display: flex; gap: 6px; flex-wrap: wrap; }
    .badge { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
    .mongo { background: #e8f5e9; color: #2e7d32; }
    .express { background: #fff3e0; color: #e65100; }
    .angular { background: #fce4ec; color: #880e4f; }
    .node { background: #e3f2fd; color: #0d47a1; }
    .app-main { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; display: flex; flex-direction: column; gap: 1.5rem; }
  `]
})
export class AppComponent {}
