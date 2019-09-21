import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './../services/file-upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    console.log(this.selectedFile);
    formData.append('file', this.selectedFile, this.selectedFile.name);
  
    // this.http.post("api/testApi/fileUploadTest.php", formData, {
    //   headers: {
    //     'Accept': 'application/json'
    //   }
    // }).subscribe( event => {
    //   console.log(event);
    // });

    // const formData = new FormData();
    //     formData.append('excel', this.selectedFile);

    //     const params = new HttpParams();

    //     const options = {
    //         params,
    //         reportProgress: true,
    //         headers: {}
    //     };

        // const req = new HttpRequest('POST', 'api/testApi/fileUploadTest.php', formData, options);
        // this.http.request(req).subscribe(console.log)

    this.uploadService.uploadFile(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
          console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

}
