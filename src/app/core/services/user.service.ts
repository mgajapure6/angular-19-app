import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * UserService manages user authentication state using RxJS and localStorage.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * BehaviorSubject to track user state
   */
  private userSubject: BehaviorSubject<{ username: string; isLoggedIn: boolean }>;
  /**
   * Observable for user state
   */
  public user$: Observable<{ username: string; isLoggedIn: boolean }>;

  /**
   * Dummy users for authentication (username: password)
   */
  private dummyUsers: { username: string; password: string }[] = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' }
  ];

  /**
   * LocalStorage key for user state
   */
  private readonly STORAGE_KEY = 'auth_user';

  constructor() {
    // Initialize state from localStorage or default
    const savedUser = localStorage.getItem(this.STORAGE_KEY);
    const initialState = savedUser
      ? JSON.parse(savedUser)
      : { username: 'Guest', isLoggedIn: false };
    this.userSubject = new BehaviorSubject(initialState);
    this.user$ = this.userSubject.asObservable();
  }

  /**
   * Returns the current user state
   */
  getUser(): { username: string; isLoggedIn: boolean } {
    return this.userSubject.value;
  }

  /**
   * Authenticates a user against dummy users
   * @param username The username to authenticate
   * @param password The password to authenticate
   * @returns boolean indicating if authentication was successful
   */
  authenticate(username: string, password: string): boolean {
    const user = this.dummyUsers.find(
      u => u.username === username && u.password === password
    );
    if (user) {
      const newState = { username, isLoggedIn: true };
      this.userSubject.next(newState);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newState));
      console.log('User authenticated:', username); // Debug log
      return true;
    }
    console.log('Authentication failed for:', username); // Debug log
    return false;
  }

  /**
   * Logs in a user (used for testing or manual login)
   * @param username The username to set
   */
  login(username: string) {
    const newState = { username, isLoggedIn: true };
    this.userSubject.next(newState);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newState));
    console.log('User logged in:', username); // Debug log
  }

  /**
   * Logs out the user and clears state
   */
  logout() {
    const newState = { username: 'Guest', isLoggedIn: false };
    this.userSubject.next(newState);
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('User logged out'); // Debug log
  }
}