import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollPositionService {
   private positions = new Map<string, number>();

  savePosition(url: string, position: number) {
    this.positions.set(url, position);
  }

  getPosition(url: string): number {
    return this.positions.get(url) ?? 0;
  }

  removePosition(url: string) {
    this.positions.delete(url);
  }
}
