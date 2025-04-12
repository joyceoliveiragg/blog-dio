import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuTopoComponent } from './components/menu-topo/menu-topo.component';
import { MyTitleComponent } from './components/my-title/my-title.component';
import { BigCardComponent } from './components/big-card/big-card.component';
import { SubCardComponent } from './components/sub-card/sub-card.component';
import { HomeComponent } from './pages/home/home.component';
import { ContentComponent } from './pages/content/content.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuTopoComponent,
    MyTitleComponent,
    BigCardComponent,
    SubCardComponent,
    HomeComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
