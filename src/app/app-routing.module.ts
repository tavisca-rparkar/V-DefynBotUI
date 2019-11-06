import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { LauncherComponent } from './components/launcher/launcher.component';


const appRoutes: Routes = [
  { path: 'launcher', component: LauncherComponent},
  { path: 'chatbot', component: ChatbotComponent},
  { path: '', redirectTo: 'launcher', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
