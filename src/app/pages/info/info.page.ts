import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    private formBuilder: FormBuilder
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
      name: ['', Validators.required],
      subject: ['', Validators.required],
    })
  }

}
