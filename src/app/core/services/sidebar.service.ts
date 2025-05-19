import { Injectable, signal } from '@angular/core';

/**
 * SidebarService manages the collapse state of the sidebar using a signal.
 */
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  /**
   * Signal to track the sidebar's collapse state
   */
  private isCollapsed = signal<boolean>(false);

  /**
   * Returns the current collapse state
   */
  getIsCollapsed() {
    return this.isCollapsed;
  }

  /**
   * Toggles the collapse state and logs for debugging
   */
  toggleCollapse() {
    this.isCollapsed.set(!this.isCollapsed());
    console.log('Sidebar collapse state:', this.isCollapsed()); // Debug log
  }
}