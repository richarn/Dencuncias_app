import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {

  @Input() titulo: string;
  constructor() { }

  ngOnInit() {}

}
