import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DataStorageService } from '../../../admin/website/data-storage.service';
import { WebsiteService, About } from '../../../admin/website/website.service';

@Component({
  selector: 'app-clienteditabout',
  templateUrl: './editabout.component.html',
  styleUrls: ['./editabout.component.css']
})
export class EditaboutComponent implements OnInit {

  aboutForm: FormGroup;
  Id: number;
  header = '';
  backgroundImageUrl = '';
  paragraphs = new FormArray([]);
  websiteId: number;
  isActive: boolean;
  constructor(private websiteService: WebsiteService,
    private dataStorageService: DataStorageService) {
    this.paragraphs.push(
      new FormGroup({
        'text': new FormControl(''),
        'id': new FormControl('0')
      })
    );
    this.aboutForm = new FormGroup({
      'header': new FormControl(this.header),
      'backgroundImageUrl': new FormControl(this.backgroundImageUrl),
      'paragraphs': this.paragraphs,
      'isActive': new FormControl(this.isActive)
    });
  }

  ngOnInit() {
    this.websiteService.websiteChanged.subscribe((data: any) => {
      this.Id = data.about.id;
      this.header = data.about.header;
      this.backgroundImageUrl = data.about.backgroundImageUrl;
      this.websiteId = data.about.websiteId;
      this.isActive = data.about.isActive;
      if (data.about.paragraphs) {
        this.paragraphs = new FormArray([]);
        for (const para of data.about.paragraphs) {
          this.paragraphs.push(
            new FormGroup({
              'text': new FormControl(para.text),
              'id': new FormControl(para.id)
            })
          );
        }
      }
      this.aboutForm.patchValue({
        header: this.header,
        backgroundImageUrl: this.backgroundImageUrl,
        isActive: this.isActive
      });
      this.aboutForm.setControl('paragraphs', this.paragraphs);
    });
  }
  onUpdateWebsiteAbout() {
    const newAbout = new About(
      this.Id,
      this.aboutForm.value['header'],
      this.aboutForm.value['backgroundImageUrl'],
      this.websiteId,
      this.aboutForm.value['paragraphs'],
      this.aboutForm.value['isActive']
    );
    this.dataStorageService.updateAbout(newAbout).subscribe((data) => {
      if (data === true) {
        alert('data   saved');
      } else {
        alert('data update fail.');
      }
    });
  }
}
