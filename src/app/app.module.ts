import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { AntGridComponent } from './components/ant-grid/ant-grid.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { CodeEditorModule } from '@ngstack/code-editor';


import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { RulesDialogComponent } from './components/rules-dialog/rules-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateAntDialogComponent } from './components/create-ant-dialog/create-ant-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditAntsComponent } from './views/edit-ants/edit-ants.component';
import { EditAntComponent } from './components/edit-ant/edit-ant.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { HomeComponent } from './views/home/home.component';
import {MatRippleModule} from '@angular/material/core';
import { IconSizeDirective } from './directives/icon-size.directive';
import { GameComponent } from './views/game/game.component';
import { RestrictedValuesDirective } from './directives/restricted-values.directive';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { TestAntDialogComponent } from './components/test-ant-dialog/test-ant-dialog.component';
import { ViewCodeDialogComponent } from './components/view-code-dialog/view-code-dialog.component';
import { AntErrorDialogComponent } from './components/ant-error-dialog/ant-error-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { GameTypeSelectorComponent } from './components/game-type-selector/game-type-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    AntGridComponent,
    LeaderboardComponent,
    RulesDialogComponent,
    CreateAntDialogComponent,
    EditAntsComponent,
    EditAntComponent,
    ConfirmDeleteDialogComponent,
    IconSizeDirective,
    RestrictedValuesDirective,
    ThemeSelectorComponent,
    GameTypeSelectorComponent,
    TestAntDialogComponent,
    ViewCodeDialogComponent,
    AntErrorDialogComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule,
    MatRippleModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSnackBarModule,
    CodeEditorModule.forRoot(),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [
    RulesDialogComponent,
    CreateAntDialogComponent,
    ViewCodeDialogComponent,
    AntErrorDialogComponent,
  ]
})
export class AppModule { }
