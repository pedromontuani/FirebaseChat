import { NgModule } from '@angular/core';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header';
import { MsgBoxComponent } from './msg-box/msg-box';
import { UserInfoComponent } from './user-info/user-info';
import { UserMenuComponent } from './user-menu/user-menu';
import { ProgressBarComponent } from './progress-bar/progress-bar';
@NgModule({
	declarations: [CustomLoggedHeaderComponent,
    MsgBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent],
	imports: [],
	exports: [CustomLoggedHeaderComponent,
    MsgBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent]
})
export class ComponentsModule {}
