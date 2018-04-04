import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, FormControlName, FormGroupName } from '@angular/forms';
import { WebsiteService, Home } from '../../../admin/website/website.service';
import { DataStorageService } from '../../../admin/website/data-storage.service';

@Component({
  selector: 'app-clientedithome',
  templateUrl: './edithome.component.html',
  styleUrls: ['./edithome.component.css']
})
export class EdithomeComponent implements OnInit {

  homeForm: FormGroup;
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
    this.homeForm = new FormGroup({
      'header': new FormControl(this.header),
      'backgroundImageUrl': new FormControl(this.backgroundImageUrl),
      'paragraphs': this.paragraphs,
      'isActive': new FormControl(this.isActive)
    });
  }
  ngOnInit() {
    this.websiteService.websiteChanged.subscribe((data: any) => {
      this.Id = data.home.id;
      this.header = data.home.header;
      this.backgroundImageUrl = data.home.backgroundImageUrl;
      this.websiteId = data.home.websiteId;
      this.isActive = data.home.isActive;
      if (data.home.paragraphs) {
        this.paragraphs = new FormArray([]);
        for (const para of data.home.paragraphs) {
          this.paragraphs.push(
            new FormGroup({
              'text': new FormControl(para.text),
              'id': new FormControl(para.id)
            })
          );
        }
      }
      this.homeForm.patchValue({
        header: this.header,
        backgroundImageUrl: this.backgroundImageUrl,
        isActive: this.isActive
      });
      this.homeForm.setControl('paragraphs', this.paragraphs);
    });
  }

  onUpdateWebsiteHome() {
    const newHome = new Home(
      this.Id,
      this.homeForm.value['header'],
      this.homeForm.value['backgroundImageUrl'],
      this.websiteId,
      this.homeForm.value['paragraphs'],
      this.homeForm.value['isActive']
    );
    this.dataStorageService.updateHome(newHome).subscribe((data) => {
      if (data === true) {
        alert('data   saved');
      } else {
        alert('data update fail.');
      }
    });
  }
}
