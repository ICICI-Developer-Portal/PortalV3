import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { AppathonService } from "src/app/services/appathon.service";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
import { ToasterService, Toast } from "angular2-toaster";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { error } from "protractor";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-appathon-dashboard",
  templateUrl: "./appathon-dashboard.component.html",
  styleUrls: ["./appathon-dashboard.component.css"]
})
export class AppathonDashboardComponent implements OnInit {
  @ViewChild("ideaInput") ideaFileVar: ElementRef;
  @ViewChild("subInput") subFileVar: ElementRef;

  //initialize form group
  readonly formGroup = new FormGroup({
    emailFormControl1: new FormControl("", [
      // Validators.required,
      Validators.email
    ]),
    emailFormControl2: new FormControl("", [
      // Validators.required,
      Validators.email
    ]),
    emailFormControl3: new FormControl("", [
      // Validators.required,
      Validators.email
    ]),
    emailFormControl4: new FormControl("", [
      // Validators.required,
      Validators.email
    ]),
    emailFormControl5: new FormControl("", [
      // Validators.required,
      Validators.email
    ]),
    emailFormControl6: new FormControl("", [
      // Validators.required,
      Validators.email
    ]),
    teamName: new FormControl("", [Validators.required]),
    company: new FormControl("", [Validators.required]),
    location: new FormControl("", [Validators.required]),
    name1: new FormControl("", [
      // Validators.required,
    ]),
    name2: new FormControl("", [
      // Validators.required,
    ]),
    name3: new FormControl("", [
      // Validators.required,
    ]),
    name4: new FormControl("", [
      // Validators.required,
    ]),
    name5: new FormControl("", [
      // Validators.required,
    ]),
    name6: new FormControl("", [
      // Validators.required,
    ]),
    mobile1: new FormControl("", [
      // Validators.required,
      //Validators.pattern("[0-9]{10}")
    ]),
    mobile2: new FormControl("", [
      // Validators.required,
      //Validators.pattern("[0-9]{10}")
    ]),
    mobile3: new FormControl("", [
      // Validators.required,
      // Validators.pattern("[0-9]{10}")
    ]),
    mobile4: new FormControl("", [
      // Validators.required,
      // Validators.pattern("[0-9]{10}")
    ]),
    mobile5: new FormControl("", [
      // Validators.required,
      //Validators.pattern("[0-9]{10}")
    ]),
    FINAL_URL: new FormControl("", [
      // Validators.required,
    ])
  });
  ideaFile: File;
  subFile: File;
  finalSubmissionFile: File;
  newIdeaLink = "";
  disableSubmit: boolean = false;

  //form controls
  get emailFormControl1() {
    return this.formGroup.get("emailFormControl1");
  }
  get emailFormControl2() {
    return this.formGroup.get("emailFormControl2");
  }
  get emailFormControl3() {
    return this.formGroup.get("emailFormControl3");
  }
  get emailFormControl4() {
    return this.formGroup.get("emailFormControl4");
  }
  get emailFormControl5() {
    return this.formGroup.get("emailFormControl5");
  }
  get emailFormControl6() {
    return this.formGroup.get("emailFormControl6");
  }
  get mobile1() {
    return this.formGroup.get("mobile1");
  }
  get mobile2() {
    return this.formGroup.get("mobile2");
  }
  get mobile3() {
    return this.formGroup.get("mobile3");
  }
  get mobile4() {
    return this.formGroup.get("mobile4");
  }
  get mobile5() {
    return this.formGroup.get("mobile5");
  }
  get mobile6() {
    return this.formGroup.get("mobile6");
  }
  get name1() {
    return this.formGroup.get("name1");
  }
  get name2() {
    return this.formGroup.get("name2");
  }
  get name3() {
    return this.formGroup.get("name3");
  }
  get name4() {
    return this.formGroup.get("name4");
  }
  get name5() {
    return this.formGroup.get("name5");
  }
  get name6() {
    return this.formGroup.get("name6");
  }
  get teamName() {
    return this.formGroup.get("teamName");
  }
  get company() {
    return this.formGroup.get("company");
  }
  get location() {
    return this.formGroup.get("location");
  }
  get FINAL_URL() {
    return this.formGroup.get("FINAL_URL");
  }
  matcher = new MyErrorStateMatcher();

  //initialize form data
  formData = {
    username: "",
    team_name: "",
    team_size: "",
    company_name: "",
    location: "",

    team_captain_name: "",
    team_captain_email: "",
    team_captain_mobile: "",
    team_members_name: "",
    team_members_mobile: "",
    team_members_email: "",
    ideaLink: "",
    finalSubmissionLink: "",
    FINAL_URL: ""
  };
  team_members_name = [];
  team_members_mobile = [];
  team_members_email = [];
  finalSubStatus: any;
  constructor(
    private appathonService: AppathonService,
    private router: Router,
    private toasterService: ToasterService,
    private spinnerService: Ng4LoadingSpinnerService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem("appathonusername")) {
      this.router.navigate(["/index"]);
    }
    this.spinnerService.show();
    this.getAppathonDetails();
  }

  toastrmsg(type, title) {
    var toast: Toast = {
      type: type,
      showCloseButton: true,
      title: "",
      body: title
      
    };
    this.toasterService.pop(toast);
  }

  //get appathon data
  getAppathonDetails() {
    var json={
      userName : localStorage.getItem("appathonusername"),
      user: localStorage.getItem("username")
    } 
    this.appathonService.fetchAppathonDetails(json).subscribe(
      (data: any) => {
        let response = JSON.parse(data._body);
        if (response.status) {
          this.formData.username = response.data.Username;
          this.formData.team_name = response.data.TeamName;
          this.formData.team_size = response.data.TeamSize;
          this.formData.company_name = response.data.CompanyName;
          this.formData.location = response.data.Location;
          this.formData.team_captain_name = response.data.TeamCaptainName;
          this.formData.team_captain_mobile = response.data.TeamCaptainMobile;
          this.formData.team_captain_email = response.data.TeamCaptainEmail;
          this.team_members_email = JSON.parse(response.data.TeamMembersEmail);
          this.team_members_name = JSON.parse(response.data.TeamMembersName);
          this.team_members_mobile = JSON.parse(
            response.data.TeamMembersMobile
          );
          this.formData.ideaLink = response.data.IdeaLink;
          this.formData.finalSubmissionLink = response.data.FinalSubmissionLink;
          this.formData.FINAL_URL = response.data.FinalURL;
          this.finalSubStatus = response.data.Status;
          console.log("this.finalSubStatus==========", this.finalSubStatus);
          this.spinnerService.hide();
        } else {
          this.spinnerService.hide();
          this.toastrmsg("error", response.message);
          this.router.navigate(["/index"]);
        }
      },
      err => {
        this.spinnerService.hide();
        this.toastrmsg('error',"Something went wrong. Please try again in some time.");
        //this.router.navigate(['error']);
      }
    );
  }

  //reset form
  reset = () => {
    if (this.finalSubStatus !== "selected") {
      this.toastrmsg("error", "You are not allowed to Reset!");
    } else {
      this.spinnerService.show();
      this.ideaFile = undefined;
      this.subFile = undefined;
      this.finalSubmissionFile = undefined;
      this.formGroup.reset();
      this.getAppathonDetails();
    }
  };

  //submit form data
  submit = async () => {
    if (this.finalSubStatus !== "selected") {
      this.toastrmsg("error", "You are not allowed for Final Submission!");
    } else {
      this.disableSubmit = true;
      this.spinnerService.show();

      if (!this.formGroup.valid) {
        return;
      }
      if (this.ideaFile) {
        await this.uploadFile(this.ideaFile)
          .then((data: any) => {
            this.newIdeaLink = JSON.parse(data._body).FilePath;
          })
          .catch(error => {
            this.toastrmsg("error", "Error while uploading Idea file!");
          });
      }

      if (this.subFile) {
        await this.uploadFile(this.subFile)
          .then((data: any) => {
            this.subFile = JSON.parse(data._body).FilePath;
          })
          .catch(error => {
            this.toastrmsg(
              "error",
              "Error while uploading Final Submission file!"
            );
          });
      }
      let count = 0;
      let tempName = [];
      let tempMobile = [];
      let tempEmail = [];
      this.team_members_name.forEach((each, index) => {
        if (
          each &&
          this.team_members_email[index] &&
          this.team_members_mobile[index]
        ) {
          tempName.push(each);
          tempEmail.push(this.team_members_email[index]);
          tempMobile.push(this.team_members_mobile[index]);
        } else count++;
      });
      this.formData.team_members_email = JSON.stringify(tempEmail);
      this.formData.team_members_mobile = JSON.stringify(tempMobile);
      this.formData.team_members_name = JSON.stringify(tempName);
      this.formData.team_size = count.toString();
      let jsonObject = JSON.parse(JSON.stringify(this.formData));
      delete jsonObject.ideaLink;
      delete jsonObject.finalSubmissionLink;

      jsonObject["IDEA_LINK"] = this.newIdeaLink;
      jsonObject["FINAL_SUBMISSION_LINK"] = this.subFile;
      console.log("json Obj", jsonObject);
      this.appathonService.update_appathon_details(jsonObject).subscribe(
        (data: any) => {
          let response = JSON.parse(data._body);
          if (response.status) {
            this.toastrmsg("success", "Successfully Updated");
            this.reset();
            this.disableSubmit = false;
          } else {
            this.spinnerService.hide();
            this.disableSubmit = false;
            this.toastrmsg("error", response.message);
            this.router.navigate(["/index"]);
          }
        },
        err => {
          this.spinnerService.hide();
          this.disableSubmit = false;
          this.toastrmsg('error',"Something went wrong. Please try again in some time.");
          //this.router.navigate(['error']);
        }
      );
    }
  };

  //file upload handle
  public handleFileInput(files: FileList, fileFor) {
    console.log(files);
    let fileToUpload = files.item(0);
    let temp = fileToUpload.name.split(".");
    let fileType = temp[temp.length - 1];
    const ALLOWED_TYPES = ["pdf", "ppt", "pptx"];

    if (ALLOWED_TYPES.indexOf(fileType.toLowerCase()) >= 0) {
      if (fileFor === "idea") {
        this.ideaFile = files[0];
        this.ideaFileVar.nativeElement.value = "";
      } else {
        this.subFile = files[0];
        this.subFileVar.nativeElement.value = "";
      }
    } else {
      this.toastrmsg("error", "Invalid file type!");
    }
  }

  comingSoon() {
    this.toastrmsg("info", "Coming Soon!");
  }

  uploadFile = file => {
    let formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("username", this.formData.username);
    return new Promise((resolve, reject) => {
      this.appathonService.appathonFileUpload(formData).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    });
  };

  deleteFile(type) {
    if (type === "idea") {
      this.ideaFile = undefined;
      this.ideaFileVar.nativeElement.value = "";
    } else {
      this.subFile = undefined;
      this.subFileVar.nativeElement.value = "";
    }
  }

  certificate: any;
  // downloadBtn(url) {
  //   var json = {
  //     filePath: url
  //   };

  //   var fileName = url.substring(url.lastIndexOf("/") + 1);

  //   this.loginService.downloadPdf(json).subscribe((data: any) => {
  //     this.certificate = data._body;
  //     console.log(data._body);
  //     var blob = new Blob([this.certificate], {
  //       type: "text/plain"
  //     });
  //     saveAs(blob, fileName);
  //   });
  // }
  downloadBtn(url) {
    var json = {
      filePath: url,
      "username":localStorage.getItem('username')
    };

    var fileName = url.substring(url.lastIndexOf("/") + 1);

    this.loginService.downloadPdf(json).subscribe((data: any) => {
      this.certificate = data._body;
      console.log(data._body);
      var blob = new Blob([this.certificate], {
        type: "application/pdf"
      });
      saveAs(blob, fileName);
    },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
    },);
  }
}
