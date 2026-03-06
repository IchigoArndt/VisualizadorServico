import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IisPool } from '../pools-iis/iis-pool.model';

@Injectable({ providedIn: 'root' })
export class IisService {
  private readonly apiUrl = 'https://localhost:7108';

  constructor(private readonly http: HttpClient) {}

  getAllApplicationPools(): Observable<IisPool[]> {
    return this.http.get<IisPool[]>(`${this.apiUrl}/api/v1/IIS/GetAllAplication`);
  }

  startPool(poolName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/v1/IIS/StartPool/${poolName}`, {});
  }

  stopPool(poolName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/v1/IIS/StopPool/${poolName}`, {});
  }

  recyclePool(poolName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/v1/IIS/RecyclePool/${poolName}`, {});
  }


}
