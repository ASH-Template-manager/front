import {Component, Input, OnInit} from '@angular/core';
import {Template} from '../../_models/template';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  @Input() template: Template;

  constructor() { }

  ngOnInit(): void {
  }

  openLink(link) {
    window.open(link, '_blank');
  }

}
