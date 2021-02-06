import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaynewSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [GatewaynewSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class GatewaynewHomeModule {}
