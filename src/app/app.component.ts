import {Component} from '@angular/core';
import {TemplateService} from './_services/template.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomNavComponent} from './_components/bottom-nav/bottom-nav.component';
import {ResponsiveService} from './_services/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private templateService: TemplateService,
    private bottomSheet: MatBottomSheet,
    private responsiveService: ResponsiveService
  ) {
  }

  get templatesLoading() {
    return this.templateService.templatesLoading;
  }

  openFilters() {
    this.bottomSheet.open(BottomNavComponent);
  }

  get isMobile() {
    return this.responsiveService.isMobile;
  }
}
