import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFirestore} from '@angular/fire/firestore';

import { ItemService } from '../item.service';


@Component({
  selector: 'app-edit-tutor-profile',
  templateUrl: './edit-tutor-profile.page.html',
  styleUrls: ['./edit-tutor-profile.page.scss'],
})
export class EditTutorProfilePage implements OnInit {

  tutor_profile_form: FormGroup;
  cur_profile: any;

  constructor(
    public router:Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {
    this.tutor_profile_form = this.formBuilder.group({
      image: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      contact_info: new FormControl('', Validators.required),
      field: new FormControl('', Validators.required),
      introduction: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        console.log("param = " + param);
        this.cur_profile = param;
        console.log("current profile is " + this.cur_profile);
        console.log("current profile id is = " + this.cur_profile.id);
        this.tutor_profile_form.patchValue({image:this.cur_profile.image});
        this.tutor_profile_form.patchValue({username:this.cur_profile.username});
        this.tutor_profile_form.patchValue({contact_info: this.cur_profile.contact_info});
        this.tutor_profile_form.patchValue({field: this.cur_profile.field});
        this.tutor_profile_form.patchValue({introduction: this.cur_profile.introduction});
      }
    )
    
  }

  updateProfile(value) {
    console.log("new profile contact_info = " + value.contact_info);
    let newProfile = {
      id: this.cur_profile.id,
      image: value.image,
      username: value.username,
      contact_info: value.contact_info,
      field: value.field,
      introduction: value.introduction
    }
    this.itemService.updateProfile(newProfile);
    this.goBack();
  }

  // updateProfile(value) {
  //   let target_profile = this.itemService.getProfileByUid(this.cur_profile.uid);
  //   console.log("target_profile = " + target_profile);
  //   console.log("target profile uid" + target_profile.uid);
  // }


  goBack(){
    this.router.navigate(['/tutor-profile']);
  }

}
