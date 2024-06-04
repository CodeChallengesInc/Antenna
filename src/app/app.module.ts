import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatGridListModule } from '@angular/material/grid-list';
import { AntGridComponent } from './components/ant-grid/ant-grid.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { CodeEditorModule } from '@ngstack/code-editor';


import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { RulesDialogComponent } from './components/rules-dialog/rules-dialog.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { CreateAntDialogComponent } from './components/create-ant-dialog/create-ant-dialog.component';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { EditAntsComponent } from './views/edit-ants/edit-ants.component';
import { EditAntComponent } from './components/edit-ant/edit-ant.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { HomeComponent } from './views/home/home.component';
import {MatRippleModule} from '@angular/material/core';
import { IconSizeDirective } from './directives/icon-size.directive';
import { GameComponent } from './views/game/game.component';
import { RestrictedValuesDirective } from './directives/restricted-values.directive';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { TestAntDialogComponent } from './components/test-ant-dialog/test-ant-dialog.component';
import { ViewCodeDialogComponent } from './components/view-code-dialog/view-code-dialog.component';
import { AntErrorDialogComponent } from './components/ant-error-dialog/ant-error-dialog.component';
import { LoginComponent } from './components/login/login.component';

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
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
