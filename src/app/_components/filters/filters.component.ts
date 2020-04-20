import { Component, OnInit } from '@angular/core';
import {TemplateService} from '../../_services/template.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  tags = {};

  constructor(
    private templateService: TemplateService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.templateService.tags.forEach(t => {
      if (!this.tags[t]) {
        this.tags[t] = {
          count: 0,
          selected: false
        };
      }
      this.templateService.templates.map(template => template.tags.includes(t) ? this.tags[t].count += 1 : null);
    });
    this.templateService.selectedTagsBS.getValue().map(t => {
      this.tags[t].selected = true;
    });
    console.log('this tags', this.tags);
  }

  get keys() {
    return Object.keys(this.tags).sort(((a, b) => {
      return this.tags[b].count - this.tags[a].count;
    }));
  }

  select(event, tag) {
    this.tags[tag].selected = event.checked;
    const selected = this.templateService.selectedTagsBS.getValue();
    event.checked ? selected.push(tag) : selected.splice(selected.indexOf(tag), 1);
    this.templateService.selectedTagsBS.next(selected);
  }

  clearFilters() {
    const tags = this.tags;
    Object.keys(tags).forEach(k => {
      this.select({checked: false}, k);
    });
    this.templateService.selectedTagsBS.next([]);
    this.tags = {...tags};
    this.snackBar.open('Filters reset', 'DISMISS', {
      duration: 2500
    });
  }

}
