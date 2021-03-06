import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUserPageRoutingModule } from './admin-user-routing.module';

import { AdminUserPage } from './admin-user.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AdminUserPageRoutingModule
  ],
  declarations: [AdminUserPage]
})
export class AdminUserPageModule {}
