import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Template} from '../_models/template';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  templates: Template[] = [];
  tags: string[] = [];
  templatesLoading = true;
  selectedTagsBS = new BehaviorSubject([]);

  constructor(
    private firestore: AngularFirestore,
  ) {
  }

  async list() {
    if (this.templates.length > 0) {
      this.templatesLoading = false;
      return this.templates;
    }
    return new Promise<Template[]>(resolve => {
      this.templatesLoading = true;
      this.firestore.collection('templates').snapshotChanges().subscribe(data => {
        this.templates = data.map(d => {
          this.tags = [...this.tags, ...d.payload.doc.data()['tags'].filter(t => !this.tags.includes(t))];
          return {
            children: d.payload.doc.data()['children'],
            id: d.payload.doc.data()['id'],
            img: d.payload.doc.data()['img'],
            kind: d.payload.doc.data()['kind'],
            mimeType: d.payload.doc.data()['mimeType'],
            refLink: d.payload.doc.data()['refLink'],
            tags: d.payload.doc.data()['tags'],
            name: d.payload.doc.data()['name'],
          };
        });
        resolve();
        this.templatesLoading = false;
      });
    });
  }
}
