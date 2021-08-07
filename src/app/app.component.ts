import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';

import { LocationService } from './services/location.service';
import { MenuService } from './services/menu.service';
import { UserService } from './services/user.service';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public menuItems: Observable<any>;
  public logged: boolean = false;
  public user;

  subscriptions: Subscription[] = [];

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private menuService: MenuService,
    private platform: Platform,
    private location: Location,
  ) {}

  ngOnInit() {
    this.userData();
    this.locationService.requestPermissions();
    this.menuItems = this.menuService.getMenuItems();
  }

  ngAfterViewInit() {
    const userInfo = this.userService.updateUserInfo
    .subscribe(user => {
      console.log('user: ', user);
      
      this.user = user;
      this.logged = (user) ? true : false;
    });

    this.platform.backButton
    .subscribe(() => {
      this.location.back();
    })

    this.subscriptions.push(userInfo);
  }

  async userData() {
    this.user = await this.userService.getUser();
    this.logged = !!this.user;
  }

  logout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    // this.subscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }
}
