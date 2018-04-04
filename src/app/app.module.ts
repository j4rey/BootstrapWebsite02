import { ScrollService } from './scroll.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AgmCoreModule } from '@agm/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { GatewayComponent } from './gateway/gateway.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { WINDOW_PROVIDERS } from './window.service';
import { WebsiteCreateComponent } from './admin/website/create/create.component';
import { MainComponent } from './main/main.component';
import { WebsiteService } from './admin/website/website.service';
import { HttpModule } from '@angular/http';
import { DataStorageService } from './admin/website/data-storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { WebsiteListComponent } from './admin/website/list/list.component';
import { EditwebsiteComponent } from './client/website/editwebsite/editwebsite.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { EdithomeComponent } from './client/website/edithome/edithome.component';
import { EditaboutComponent } from './client/website/editabout/editabout.component';
import { EditdownloadComponent } from './client/website/editdownload/editdownload.component';
import { EditcontactusComponent } from './client/website/editcontactus/editcontactus.component';
import { ClientEditService } from './client/clientedit.service';
import { SafeHtmlPipe } from './safeHtml.pipe';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  {path: 'admin', component: AdminHomeComponent },
  {path: 'client', component: ClientHomeComponent },
  {path: 'error', component: ErrorComponent },
  {path: '', component: AppComponent, pathMatch: 'full'},
  {path: '**', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    AboutComponent,
    GatewayComponent,
    ContactusComponent,
    FooterComponent,
    WebsiteCreateComponent,
    MainComponent,
    AdminHomeComponent,
    WebsiteListComponent,
    EditwebsiteComponent,
    ClientHomeComponent,
    EdithomeComponent,
    EditaboutComponent,
    EditdownloadComponent,
    EditcontactusComponent,

    SafeHtmlPipe,

    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDYOEjEE9EF0T_pfULnX9RVuVhJTX1YJmo'
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ScrollService, WINDOW_PROVIDERS, WebsiteService, DataStorageService, ClientEditService],
  bootstrap: [MainComponent]
})
export class AppModule { }
