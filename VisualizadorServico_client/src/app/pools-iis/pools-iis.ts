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
import { IisService } from '../services/iis.service';

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

  constructor(private readonly iisService: IisService) {}

  ngOnInit(): void {
    this.loadPools();
  }

  private loadPools(): void {
    this.loading.set(true);
    this.iisService.getAllApplicationPools().subscribe({
      next: (data) => {
        this.pools.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.pools.set([]);
        this.loading.set(false);
      }
    });
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
    this.loadPools();
  }

  get totalStarted(): number {
    return this.pools().filter(p => p.status === 'Started').length;
  }

  get totalStopped(): number {
    return this.pools().filter(p => p.status === 'Stopped').length;
  }

  startPool(poolName: string): void { 
    this.iisService.startPool(poolName).subscribe({
      next: () => {
        this.loadPools();
      },
      error: () => {
        this.loadPools();
      }
    });
  }
  stopPool(poolName: string): void {
    this.iisService.stopPool(poolName).subscribe({
      next: () => {
        this.loadPools();
      },
      error: () => {
        this.loadPools();
      }
    });
  }
  recyclePool(poolName: string): void {
    this.iisService.recyclePool(poolName).subscribe({
      next: () => {
        this.loadPools();
      },
      error: () => {
        this.loadPools();
      }
    });
  }
}
