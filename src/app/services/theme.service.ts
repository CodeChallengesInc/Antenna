import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';




export interface CCITheme {
  title: string;
  path: string;
  svgIcon: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themes$: Observable<CCITheme[]>;

  private readonly themeKey = 'cci-theme';

  themeChanged = new EventEmitter<string>();
  currentThemeClass = 'light-indigo-pink';

  constructor() {

    const theme = localStorage.getItem(this.themeKey);
    if (theme) {
      this.setTheme(theme);
    } else {
      this.setTheme(this.currentThemeClass);
    }

    this.themes$ = of([
      {
        path: 'light-deeppurple-amber',
        title: 'Deep Purple & Amber',
        svgIcon: 'deep_purple_amber',
      },
      {
        path: 'light-indigo-pink',
        title: 'Indigo & Pink',
        svgIcon: 'indigo_pink',
      },
      {
        path: 'dark-pink-bluegrey',
        title: 'Pink & Blue-grey',
        svgIcon: 'pink_blue_grey',
      },
      {
        path: 'dark-purple-green',
        title: 'Purple & Green',
        svgIcon: 'purple_green',
      },
    ]);
  }

  isDarkTheme(): boolean {
    return this.currentThemeClass.indexOf('dark') >= 0;
  }

  /**
   * Set the theme of the application
   * @param theme The class name of the theme to change to
   */
  setTheme(theme: string) {
    // Note that the class MUST be set on the 'body' element.
    // If we were to just set the class on the obmdb-root element, the global overlay
    // would be left out of the look and we'd have to set that class separately
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains(this.currentThemeClass)) {
      body.classList.remove(this.currentThemeClass);
    }
    body.classList.add(theme);
    localStorage.setItem(this.themeKey, theme);
    this.currentThemeClass = theme;
    this.themeChanged.emit();
  }
}
