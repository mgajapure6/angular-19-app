import { Injectable } from '@angular/core';

/**
 * Interface for part data in the management report
 */
interface Part {
  partcode: string;
  partDescription: string;
  lagCustomer: number;
  mat: number;
  lagMat: number;
  dailyDemand: number;
  rangeLag: number;
  rangeLagMat: number;
  int: number;
  rangeLagMatInt: number;
  lagSupplier: number;
  factoryCodeSupplier: string;
  siv: string;
}

/**
 * Interface for factory group data
 */
interface Factory {
  factoryName: string;
  parts: Part[];
}

/**
 * ManagementReportService provides dummy data for the management report
 */
@Injectable({
  providedIn: 'root'
})
export class ManagementReportService {
  /**
   * Generates dummy data for 10 factories, each with 10 parts
   */
  getReportData(): Factory[] {
    const factories: Factory[] = [];
    for (let i = 1; i <= 10; i++) {
      const parts: Part[] = [];
      for (let j = 1; j <= 10; j++) {
        parts.push({
          partcode: `P${i}00${j}`,
          partDescription: `Component ${j} for Factory ${i}`,
          lagCustomer: Math.floor(Math.random() * 100),
          mat: Math.floor(Math.random() * 50),
          lagMat: Math.floor(Math.random() * 150),
          dailyDemand: Math.floor(Math.random() * 200),
          rangeLag: Math.floor(Math.random() * 100),
          rangeLagMat: Math.floor(Math.random() * 200),
          int: Math.floor(Math.random() * 50),
          rangeLagMatInt: Math.floor(Math.random() * 300),
          lagSupplier: Math.floor(Math.random() * 100),
          factoryCodeSupplier: `FC${i}S${j}`,
          siv: `SIV${j} (00:30 GMT)`
        });
      }
      factories.push({
        factoryName: `Factory ${i}`,
        parts
      });
    }
    return factories;
  }
}