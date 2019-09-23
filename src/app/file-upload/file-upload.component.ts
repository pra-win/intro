import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './../services/file-upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFile: File;
  form: FormGroup;
  uploadResponse: any;

  constructor(
    private uploadService: FileUploadService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(event);
      this.form.get('file').setValue(this.selectedFile);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    let uploadURL = environment.apiURLs.fileUpload;

    this.uploadService.uploadFile(formData, uploadURL).subscribe(
      (res) => {
        this.uploadResponse = res;
          const formData = new FormData();
          formData.append('filePath', res.filePath);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

}
