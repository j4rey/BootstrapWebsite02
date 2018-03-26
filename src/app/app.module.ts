import { ScrollService } from './scroll.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { GatewayComponent } from './gateway/gateway.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { WINDOW_PROVIDERS } from './window.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    AboutComponent,
    GatewayComponent,
    ContactusComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDYOEjEE9EF0T_pfULnX9RVuVhJTX1YJmo'
    })
  ],
  providers: [ScrollService, WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
