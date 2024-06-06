import { TestBed } from '@angular/core/testing';
import { ThemeService, CCITheme } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change theme', () => {
    const newTheme = 'dark-purple-green';
    service.setTheme(newTheme);
    expect(service.currentThemeClass).toBe(newTheme);
    expect(localStorage.getItem(service['themeKey'])).toBe(newTheme);
  });

  it('should emit event when theme is changed', (done) => {
    service.themeChanged.subscribe(() => {
      done();
    });
    service.setTheme('dark-purple-green');
  });

  it('should return whether the current theme is dark', () => {
    service.setTheme('light-indigo-pink');
    expect(service.isDarkTheme()).toBe(false);
    service.setTheme('dark-purple-green');
    expect(service.isDarkTheme()).toBe(true);
  });

  it('should provide a list of themes', (done) => {
    service.themes$.subscribe((themes: CCITheme[]) => {
      expect(themes.length).toBeGreaterThan(0);
      done();
    });
  });
});
