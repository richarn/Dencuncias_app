import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo:  string;
  
  user;
  contacto;
  constructor(
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {
    //this.inicializarFormulario;
   }

   async ngOnInit() {

    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();

    this.userService.updateUserInfo
    .subscribe(user => {
      this.user = user;
    })
  }


    
  redirectTo(contacto) {
    this.router.navigate(['/info/contacto']);
  }

  back() {
    this.location.back();
  }

  // inicializarFormulario() {
  //   this.formulario = this.formBuilder.group({
  //     id: ['', Validators.required],
  //     // completar campos
  //   })
  // }

  // cargarFormulario() {
  //   this.formulario = this.formBuilder.group({
  //     id: [this.user.id, Validators.required],
  //     // completar campos
  //   })

  //   console.log(this.formulario);
    
  

  // }
} 
