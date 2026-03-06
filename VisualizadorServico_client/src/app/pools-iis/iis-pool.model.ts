export type PoolStatus = 'Started' | 'Stopped' | 'Starting' | 'Stopping' | 'Unknown';

export interface IisPool {
  name: string;
  status: PoolStatus;
  managedRuntimeVersion: string;
  managedPipelineMode: string;
  autoStart: boolean;
  workerProcesses: number;
}