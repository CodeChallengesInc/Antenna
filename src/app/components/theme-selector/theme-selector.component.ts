import { Component } from '@angular/core';
import { ThemeService, CCITheme } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cci-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent {

  readonly themes$: Observable<CCITheme[]>;

  constructor(private themeService: ThemeService) {
    this.themes$ = themeService.themes$;
  }

  changeTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }

  isCurrentTheme(theme: string): boolean {
    return this.themeService.currentThemeClass === theme;
  }
}
