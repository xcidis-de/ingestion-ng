import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crapome-upload',
  templateUrl: './crapome-upload.component.html',
  styleUrls: ['./crapome-upload.component.scss']
})
export class CrapomeUploadComponent implements OnInit {
  myForm: FormGroup;
  file: FormControl;

  constructor() { }

  ngOnInit() {
    this.file = new FormControl('', [
      Validators.required
    ]);

    this.myForm = new FormGroup({
      file: this.file
    })
  }

  onSubmit(){
    if(this.myForm.valid){
      console.log('ok');
      // this.myForm.
    }
  }
}
