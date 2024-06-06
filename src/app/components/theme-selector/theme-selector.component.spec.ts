import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ThemeSelectorComponent } from './theme-selector.component';
import { ThemeService, CCITheme } from '../../services/theme.service';
import { MatMenuModule } from '@angular/material/menu';

describe('ThemeSelectorComponent', () => {
  let component: ThemeSelectorComponent;
  let fixture: ComponentFixture<ThemeSelectorComponent>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ThemeService', ['setTheme']);

    await TestBed.configureTestingModule({
      declarations: [ ThemeSelectorComponent ],
      imports: [ MatMenuModule ],
      providers: [ { provide: ThemeService, useValue: spy } ]
    })
    .compileComponents();

    mockThemeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    mockThemeService.themes$ = of([{title: 'theme1', path: 'theme-path', svgIcon: 'icon.svg'} as CCITheme]);
    mockThemeService.currentThemeClass = 'theme1';
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change theme', () => {
    component.changeTheme('theme-class-2');
    expect(mockThemeService.setTheme).toHaveBeenCalledWith('theme-class-2');
  });

  it('should return boolen from isCurrentTheme reflecting if the current theme is ', () => {
    expect(component.isCurrentTheme('theme1')).toBeTrue();
    expect(component.isCurrentTheme('theme-class-2')).toBeFalse();
  });
});
