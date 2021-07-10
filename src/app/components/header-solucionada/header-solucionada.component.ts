import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-solucionada',
  templateUrl: './header-solucionada.component.html',
  styleUrls: ['./header-solucionada.component.scss'],
})
export class HeaderSolucionadaComponent implements OnInit {

  @Input() titulo: string; 
  user;
  constructor(private userService: UserService) { }

  async ngOnInit() {

    this.user = await this.userService.getUser();
    console.log(this.user.id);
    
  }

}
