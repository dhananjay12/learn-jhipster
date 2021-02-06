import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { GatewayqweSharedModule } from 'app/shared/shared.module';
import { GatewayqweCoreModule } from 'app/core/core.module';
import { GatewayqweAppRoutingModule } from './app-routing.module';
import { GatewayqweHomeModule } from './home/home.module';
import { GatewayqweEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    GatewayqweSharedModule,
    GatewayqweCoreModule,
    GatewayqweHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GatewayqweEntityModule,
    GatewayqweAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class GatewayqweAppModule {}
