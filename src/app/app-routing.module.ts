import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAntsComponent } from './views/edit-ants/edit-ants.component';
import { EditAntComponent } from './components/edit-ant/edit-ant.component';
import { HomeComponent } from './views/home/home.component';
import { GameComponent } from './views/game/game.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      animationLevel: 0,
    },
  },
  {
    path: 'game/:gameId',
    component: GameComponent,
    data: {
      animationLevel: 1,
    },
  },
  {
    path: 'edit-ants',
    component: EditAntsComponent,
    data: {
      animationLevel: 1,
    },
    children: [
      {
        path: ':antName',
        component: EditAntComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
