import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { IisPool, PoolStatus } from './iis-pool.model';

@Component({
  selector: 'app-pools-iis',
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TooltipModule,
    SkeletonModule,
  ],
  templateUrl: './pools-iis.html',
  styleUrl: './pools-iis.scss'
})
export class PoolsIis implements OnInit {
  pools = signal<IisPool[]>([]);
  loading = signal<boolean>(true);

  readonly mockPools: IisPool[] = [
    { name: 'DefaultAppPool', status: 'Started', managedRuntimeVersion: 'v4.0', managedPipelineMode: 'Integrated', autoStart: true, workerProcesses: 1 },
    { name: 'Classic .NET AppPool', status: 'Stopped', managedRuntimeVersion: 'v2.0', managedPipelineMode: 'Classic', autoStart: false, workerProcesses: 0 },
    { name: 'API_Pool', status: 'Started', managedRuntimeVersion: 'v4.0', managedPipelineMode: 'Integrated', autoStart: true, workerProcesses: 2 },
    { name: '.NET v4.5', status: 'Started', managedRuntimeVersion: 'v4.0', managedPipelineMode: 'Integrated', autoStart: true, workerProcesses: 1 },
    { name: 'LegacyApp_Pool', status: 'Stopping', managedRuntimeVersion: 'v2.0', managedPipelineMode: 'Classic', autoStart: false, workerProcesses: 0 },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.pools.set(this.mockPools);
      this.loading.set(false);
    }, 1000);
  }

  getStatusSeverity(status: PoolStatus): 'success' | 'danger' | 'warn' | 'secondary' {
    const map: Record<PoolStatus, 'success' | 'danger' | 'warn' | 'secondary'> = {
      Started: 'success',
      Stopped: 'danger',
      Starting: 'warn',
      Stopping: 'warn',
      Unknown: 'secondary',
    };
    return map[status] ?? 'secondary';
  }

  getStatusIcon(status: PoolStatus): string {
    const map: Record<PoolStatus, string> = {
      Started: 'pi pi-check-circle',
      Stopped: 'pi pi-times-circle',
      Starting: 'pi pi-spin pi-spinner',
      Stopping: 'pi pi-spin pi-spinner',
      Unknown: 'pi pi-question-circle',
    };
    return map[status] ?? 'pi pi-question-circle';
  }

  refreshPools(): void {
    this.loading.set(true);
    this.pools.set([]);
    setTimeout(() => {
      this.pools.set(this.mockPools);
      this.loading.set(false);
    }, 1200);
  }

  get totalStarted(): number {
    return this.pools().filter(p => p.status === 'Started').length;
  }

  get totalStopped(): number {
    return this.pools().filter(p => p.status === 'Stopped').length;
  }
}
