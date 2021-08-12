import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactoService } from 'src/app/services/contacto.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  type;
  title;
  contactForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private contactoService: ContactoService,
    private generalService: GeneralService,
    private router: Router

  ) {
    this.activatedRoute.params
    .subscribe(params => {
      if (params.type) this.type = params.type;
      this.updateTitle();
    });

    this.createForm();
  }

  ngOnInit() {
  }

  updateTitle() {
    switch (this.type) {
      case 'mision':
        this.title = 'Misión';
        break;
      case 'vision':
        this.title = 'Visión';
        break;
      case 'contacto':
      this.title = 'Contacto';
      break;
    }
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }
  async onSubmit() {
    const result: any = await this.contactoService.crear(this.contactForm.value);
    if (result.success) {
      this.generalService.mostrarMensaje('Mensaje enviado.');
      this.router.navigate(['/contacto'])
    } else {
      this.generalService.mostrarMensaje('El mensaje no pudo ser enviado.');
    }

    this.generalService.hideLoading();
  }

}
