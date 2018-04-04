import { ContactUs } from './../../../admin/website/website.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DataStorageService } from '../../../admin/website/data-storage.service';
import { WebsiteService } from '../../../admin/website/website.service';

@Component({
  selector: 'app-clienteditcontactus',
  templateUrl: './editcontactus.component.html',
  styleUrls: ['./editcontactus.component.css']
})
export class EditcontactusComponent implements OnInit {
  contactusForm: FormGroup;
  Id: number;
  header = '';
  backgroundImageUrl = '';
  paragraphs = new FormArray([]);
  websiteId: number;
  isActive: boolean;
  socialPortals= new FormArray([]);
  constructor(private websiteService: WebsiteService,
    private dataStorageService: DataStorageService) {
      this.paragraphs.push(
        new FormGroup({
          'text': new FormControl(''),
          'id': new FormControl('0')
        })
      );
      this.socialPortals.push(
        new FormGroup({
          'Id' : new FormControl(''),
          'url': new FormControl(''),
          'SocialTypeId': new FormControl(''),
          'ContactUsId': new FormControl('')
        })
      );
      this.contactusForm = new FormGroup({
        'header': new FormControl(this.header),
        'backgroundImageUrl': new FormControl(this.backgroundImageUrl),
        'paragraphs': this.paragraphs,
        'isActive': new FormControl(this.isActive),
        'socialPortals': this.socialPortals
      });
    }

  ngOnInit() {
    this.websiteService.websiteChanged.subscribe((data: any) => {
      this.Id = data.contactus.id;
      this.header = data.contactus.header;
      this.backgroundImageUrl = data.contactus.backgroundImageUrl;
      this.websiteId = data.contactus.websiteId;
      this.isActive = data.contactus.isActive;
      if (data.contactus.paragraphs) {
        this.paragraphs = new FormArray([]);
        for (const para of data.contactus.paragraphs) {
          this.paragraphs.push(
            new FormGroup({
              'text': new FormControl(para.text),
              'id': new FormControl(para.id)
            })
          );
        }
      }
      console.log(data.contactus.socialPortals);
      if (data.contactus.socialPortals) {
        this.socialPortals = new FormArray([]);
        for (const para of data.contactus.socialPortals) {
          this.socialPortals.push(
            new FormGroup({
              'Id' : new FormControl(para.id),
              'url': new FormControl(para.url),
              'SocialTypeId': new FormControl(para.socialtype.id),
              'ContactUsId': new FormControl(para.contactUsId)
            })
          );
        }
      }
      this.contactusForm.patchValue({
        header: this.header,
        backgroundImageUrl: this.backgroundImageUrl,
        isActive: this.isActive
      });
      this.contactusForm.setControl('paragraphs', this.paragraphs);
      this.contactusForm.setControl('socialPortals', this.socialPortals);
    });
  }
  onUpdateWebsiteContactUs() {
    const newContactUs = new ContactUs(
      this.Id,
      this.contactusForm.value['header'],
      this.contactusForm.value['backgroundImageUrl'],
      this.websiteId,
      this.contactusForm.value['paragraphs'],
      this.contactusForm.value['isActive'],
      this.contactusForm.value['socialPortals'],
    );
    console.log(this.contactusForm);
    this.dataStorageService.updateContactUs(newContactUs).subscribe((data) => {
      if (data === true) {
        alert('data   saved');
      } else {
        alert('data update fail.');
      }
    });
  }
}
