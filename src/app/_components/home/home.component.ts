import {Component, OnInit} from '@angular/core';
import {TemplateService} from '../../_services/template.service';
import {Template} from '../../_models/template';
import {ResponsiveService} from '../../_services/responsive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filteredTemplates: Template[] = [];

  constructor(
    private templateService: TemplateService,
    private responsiveService: ResponsiveService
  ) {
  }

  async ngOnInit() {
    await this.templateService.list();
    this.filteredTemplates = this.templates;
    this.templateService.selectedTagsBS.subscribe(tags => {
      if (tags.length > 0) {
        this.filteredTemplates = this.filteredTemplates.filter(template => {
          return tags.some(t => template.tags.includes(t));
        });
      } else {
        this.filteredTemplates = this.templates;
      }
    });
  }

  get templates() {
    return this.templateService.templates;
  }

  get isMobile() {
    return this.responsiveService.isMobile;
  }

  search(text: string) {
    if (this.templateService.selectedTagsBS.getValue().length !== 0) {
      this.templateService.selectedTagsBS.next([]);
    }
    if (text.length === 0) {
      this.filteredTemplates = [...this.templates];
    } else {
      this.filteredTemplates = this.templates.filter(t => {
        return t.name.toLowerCase().includes(text) || t.tags.join(' ').toLowerCase().includes(text);
      });
    }
  }

}
