import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { GatewaynewSharedModule } from 'app/shared/shared.module';
import { GatewaynewCoreModule } from 'app/core/core.module';
import { GatewaynewAppRoutingModule } from './app-routing.module';
import { GatewaynewHomeModule } from './home/home.module';
import { GatewaynewEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    GatewaynewSharedModule,
    GatewaynewCoreModule,
    GatewaynewHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GatewaynewEntityModule,
    GatewaynewAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class GatewaynewAppModule {}
