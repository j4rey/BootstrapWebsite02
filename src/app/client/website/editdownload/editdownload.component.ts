import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { WebsiteService, Download } from '../../../admin/website/website.service';
import { DataStorageService } from '../../../admin/website/data-storage.service';

@Component({
  selector: 'app-clienteditdownload',
  templateUrl: './editdownload.component.html',
  styleUrls: ['./editdownload.component.css']
})
export class EditdownloadComponent implements OnInit {
  downloadForm: FormGroup;
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
      this.downloadForm = new FormGroup({
        'header': new FormControl(this.header),
        'backgroundImageUrl': new FormControl(this.backgroundImageUrl),
        'paragraphs': this.paragraphs,
        'isActive': new FormControl(this.isActive)
      });
    }

  ngOnInit() {
    this.websiteService.websiteChanged.subscribe((data: any) => {
      this.Id = data.download.id;
      this.header = data.download.header;
      this.backgroundImageUrl = data.download.backgroundImageUrl;
      this.websiteId = data.download.websiteId;
      this.isActive = data.download.isActive;
      if (data.download.paragraphs) {
        this.paragraphs = new FormArray([]);
        for (const para of data.download.paragraphs) {
          this.paragraphs.push(
            new FormGroup({
              'text': new FormControl(para.text),
              'id': new FormControl(para.id)
            })
          );
        }
      }
      this.downloadForm.patchValue({
        header: this.header,
        backgroundImageUrl: this.backgroundImageUrl,
        isActive: this.isActive
      });
      this.downloadForm.setControl('paragraphs', this.paragraphs);
    });
  }
  onUpdateWebsiteDownload() {
    const newDownload = new Download(
      this.Id,
      this.downloadForm.value['header'],
      this.downloadForm.value['backgroundImageUrl'],
      this.websiteId,
      this.downloadForm.value['paragraphs'],
      this.downloadForm.value['isActive']
    );
    this.dataStorageService.updateDownload(newDownload).subscribe((data) => {
      if (data === true) {
        alert('data   saved');
      } else {
        alert('data update fail.');
      }
    });
  }
}
