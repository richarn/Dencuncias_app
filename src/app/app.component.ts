import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LocationService } from './services/location.service';
import { MenuService } from './services/menu.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public menuItems: Observable<any>;
  public user;
  public logged: boolean = false;

  constructor(
    private locationService: LocationService,
    public userService: UserService,
    private menuService: MenuService,
  ) {}

  ngOnInit() {
    this.userData();
    this.locationService.requestPermissions();
    this.menuItems = this.menuService.getMenuItems();
  }

  async userData() {
    this.user = await this.userService.getUser();
    this.logged = !!this.user && this.user.id;
    
    this.userService.updateUserInfo
    .subscribe(user => {
      this.user = user;
      this.logged = (user && user.id) ? true : false;
    },
    err => {
      console.log('Error: ', err);
      this.logged = false;
    });
  }
}
