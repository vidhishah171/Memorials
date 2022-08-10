import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CreateMemorialService } from '../../../services/create-memorial.service';
import { memorialimage } from 'src/app/Model/memorialimage';
import { fabric } from 'fabric';
import { Router } from '@angular/router';
import { AUTO_STYLE, style } from '@angular/animations';
import { Color } from 'fabric/fabric-impl';
import { $ } from 'protractor';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { threadId } from 'worker_threads';
import { formatDate } from '@angular/common';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Console } from 'console';
import { CanvasComponent } from './canvas/canvas.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createMemorial } from 'src/app/Model/createMemorial';


@Component({
  selector: 'app-create-memorial',
  templateUrl: './create-memorial.component.html',
  styleUrls: ['./create-memorial.component.css']
})
export class CreateMemorialComponent implements OnInit {
  @ViewChild(CanvasComponent) child: CanvasComponent;

  ImgRandomId = 0;
  imagespath = [];
  imagesForCaroucel = [];
  caroucelCount: number = 1;

  showMemSteps: Number = 1;
  showTambstone: boolean = true;
  showMenuItems: Number = 1;
  showSubMenItem: Number = 1;

  changeStyle: string;
  maxDate = new Date();
  canddleImages = [];
  newCanddleImages = [];
  canddleCaroucelCount: number = 1;

  URNSImages = [];

  flowerImages = [];
  newFlowerImages = [];
  flowerCaroucelCount: number = 1;

  backgroundImages = [];
  canvas: fabric.Canvas;
  memory: any = {};
  data: any;
  msg: any;
  Data: { grab_id: any; image: any; image_type_id: any; };
  result: Object;

  flag: any = false;
  DOB3: any;
  DOB4: any;

  tomb: any;
  person: any;

  // For labels
  respo: any;
  respo1: any;
  showNewDiv: number;
  isvalid: boolean;
  respo2: any;
  respo3: any;
  respo4: any;
  respo5: any;
  respo6: any;
  respo7: any;
  respo8: any;
  respo9: any;
  respo10: any;
  respo11: any;
  respo13: any;
  respo12: any;
  respo14: any;
  respo15: any;
  respo16: any;
  respo17: any;
  respo18: any;
  respo19: any;
  respo20: any;
  respo21: any;
  respo22: any;
  respo23: any;
  respo24: any;
  respo25: any;
  respo26: any;
  respo27: any;
  respo28: any;
  respo29: any;
  respo30: any;
  respo31: any;
  respo32: any;
  respo33: any;
  respo34: any;
  respo35: any;
  respo36: any;
  respo37: any;
  respo38: any;
  respo39: any;
  respo40: any;
  respo42: any;
  respo41: any;
  respo43: any;
  respo44: any;
  errors: any;
  loginData: any;
  condition: boolean;
  json: string;
  isDisplaySmallImage: boolean;
  respo45: any;

  constructor(
    public service: CreateMemorialService,
    public snack: MatSnackBar,
    public element: ElementRef,
    public editservice: AdminEditService,
    public loginservice: LoginService,
    private router: Router,
    private spiner: NgxSpinnerService,
  ) {
    this.loginservice.otherPage = false;
    this.loginservice.logoDisplay = true;
    this.loginservice.isFooterLogin = true;
    this.loginservice.hideMemorialImage = true;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.clickDiv();
    }, 1000);
    this.showCentric(1)
  }
  ngOnInit() {
    this.changeStyle = undefined;
    this.getTambImage();
    this.clickShowStepBtn1();
    this.editData();
    this.service.createMemorial.DOB = new Date(this.service.createMemorial.DOB);
    this.service.createMemorial.DOD = new Date(this.service.createMemorial.DOD);
  }
  clickDiv() {
    var test = document.getElementById("navDiv");
    if (test != null) {
      test.style.position = 'absolute';
    }
  }
  personNavColor() {

  }
  /// --------------------------------------------------
  // Canvas Render
  loadCanvasFromJSON() {
    // const CANVAS=localStorage.getItem('Kanvas');
    const CANVAS = this.service.saveCanvas1;

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {

      // making sure to render canvas at the end
      this.canvas.renderAll();
    })
  }
  addImageToCanvas(decImages: any) {
    fabric.Image.fromURL(decImages.path, (newImg) => {
      this.canvas.add(newImg);
      newImg.toCanvasElement;
      newImg.originX = 'center';
      newImg.originY = 'center';
      newImg.hasControls = false;
    },
      {
        left: 440,
        top: 300
      })
  }

  startImgDrag(event) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData("decImage", event.target.getAttribute("src"));
    return true;

  };

  DropImageToCan(dragImage: any) {
    this.addImageToCanvas(dragImage);
  }

  setBackgImage(backImage: any) {
    this.canvas.setBackgroundImage(backImage.path, this.canvas.renderAll.bind(this.canvas));
  }

  addTextToCanvas(textCan, event) {

    if (event.keyCode === 13) {
      var newText = new fabric.Text(textCan.value, {
        fontSize: 50,
        left: 200,
        top: 200,
        lineHeight: 1,
        fontFamily: 'Helvetica',
        statefullCache: true,
        scaleX: 0.4,
        scaleY: 0.4,
        originY: "center",
        originX: 'left',
        backgroundColor: "white",
        hasControls: true,

      });

      newText.bringToFront();
      this.canvas.add(newText);

    }
  }
  url = "";
  hidePerson: boolean = false;
  onselectFile(e) {
    this.service.selectedMainImg = "";
    this.changeStyle = null;
    // if (e.target.files) {
    if (e.target.files[0].size < 1000 || e.target.files[0].size > 5242880) {
      this.snackBar("Please check your image size (Size should be 1KB to 5MB)", "alert-danger");
    } else if ((!this.ValidateFile(e.target.files[0].name))) {
      this.snackBar("Please Upload jpeg, jpg, png file format.", "alert-danger");
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;


        if (this.url == '') {
          this.hidePerson = true;
        } else {
          this.hidePerson = true;
        }

        this.service.selectedMainImg = this.url;
      }

    }

  }

  ValidateFile(name: string) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg') {
      return true;
    }
    else
      return false;
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }


  register() {
    this.spiner.show();
    this.service.memCreatePostData().subscribe((res: any) => {
      this.spiner.hide();

      if (res.status == 'success') {
        this.router.navigate(['/thank-you']);
      } else {
        this.snackBar1('User is already registered, Please login and create Memorial', 'alert-error');

      }


      var test = this.service.saveCanvas;



      const formData = new FormData();


      formData.append('grab_id', res.grab_id);
      formData.append('image', 'Image');
      formData.append('image_type_id', '7');
      formData.append('x', '100');
      formData.append('y', '120');
      formData.append('height', '200');
      formData.append('width', '300');
      formData.append('user_id', res.user_id);
      formData.append('canvas_json', this.service.saveCanvas1);
      formData.append('canvas_preview_base64', test);


      var vitaText = this.service.saveVitaText

      const formData1 = new FormData();

      formData1.append('grab_id', res.grab_id);
      formData1.append('vita_html', vitaText);


      this.service.createvitaMemorial(formData1).subscribe(result1 => {
        this.spiner.hide();
      })

      this.service.memCreateImageData(formData).subscribe(result => {
        this.spiner.hide();
      })
      // }
    })

    this.service.createMemorial.g_firstname
    this.service.createMemorial.g_lastname
    this.service.createMemorial.birthplace
    this.service.createMemorial.deathplace
    this.service.createMemorial.DOB
    this.service.createMemorial.birthname
    this.service.createMemorial.DOD

    this.service.createMemorial.firstname
    this.service.createMemorial.lastname
    this.service.createMemorial.password
    this.service.createMemorial.password1
    this.service.createMemorial.email
    this.service.createMemorial.streetname
    this.service.createMemorial.zipcode
    this.service.createMemorial.hometown
    this.service.createMemorial.voucher
  }

  // step 1 functions
  showStep(num) {
    this.service.stepNumber = num;
    if (num == 1) {
      this.snackBar('You need to re-arrange the decoration items...', 'alert-danger');

      setTimeout(() => {
        this.showMemSteps = 1;
      }, 2500);
    }

    else if (num == 2
      && (this.service.createMemorial.g_firstname != undefined && this.service.createMemorial.g_firstname.length > 0)
      && (this.service.createMemorial.g_lastname != undefined && this.service.createMemorial.g_lastname.length > 0)
      // && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB.length > 0)
      && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB != null && this.service.createMemorial.DOB != "")
      // && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD?.length > 0)
      && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD != null && this.service.createMemorial.DOD != "")
    ) {
      this.showMemSteps = 2;
    }
    else if (num == 2) {
      this.snackBar('Please fill all details on step-1', 'alert-success');

    }

    else if (num == 3
      && (this.service.createMemorial.g_firstname != undefined && this.service.createMemorial.g_firstname.length > 0)
      && (this.service.createMemorial.g_lastname != undefined && this.service.createMemorial.g_lastname.length > 0)
      // && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB.length > 0)
      && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB != null && this.service.createMemorial.DOB != "")
      // && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD?.length > 0)
      && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD != null && this.service.createMemorial.DOB != "")
    ) {
      this.showMemSteps = 3;
    }
    else if (num == 3) {
      this.snackBar('Please fill all details on step-1', 'alert-success')
    }
  }

  clickShowStepBtn1() {
    if (1) {
      // btn class
      var test = document.getElementById("showStepBtn1");
      if (test != null) {
        test.style.backgroundColor = '#CF6363';
      }

      // btn class
      var test = document.getElementById("showStepBtn2");
      if (test != null) {
        test.style.backgroundColor = '';
      }

      var test = document.getElementById("showStepBtn3");
      if (test != null) {
        test.style.backgroundColor = '';
      }
    }
  }
  clickShowStepBtn2() {
    if (2) {
      // btn class
      var test = document.getElementById("showStepBtn1");
      if (test != null) {
        test.style.backgroundColor = '';
      }

      // btn class
      var test = document.getElementById("showStepBtn2");
      if (test !== null
        && (this.service.createMemorial.g_firstname != undefined && this.service.createMemorial.g_firstname.length > 0)
        && (this.service.createMemorial.g_lastname != undefined && this.service.createMemorial.g_lastname.length > 0)
        // && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB.length > 0)
        && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB != null)
        // && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD?.length > 0)
        && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD != null)
      ) {
        test.style.backgroundColor = '#CF6363';
      }

      var test = document.getElementById("showStepBtn3");
      if (test != null) {
        test.style.backgroundColor = '';
      }
    }
  }
  clickShowStepBtn3() {
    if (3) {
      // btn class
      var test = document.getElementById("showStepBtn1");
      if (test != null) {
        test.style.backgroundColor = '';
      }

      // btn class
      var test = document.getElementById("showStepBtn2");
      if (test != null) {
        test.style.backgroundColor = '';
      }

      var test = document.getElementById("showStepBtn3");
      if (test != null
        && (this.service.createMemorial.g_firstname != undefined && this.service.createMemorial.g_firstname.length > 0)
        && (this.service.createMemorial.g_lastname != undefined && this.service.createMemorial.g_lastname.length > 0)
        // && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB.length > 0)
        && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB != null)
        // && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD?.length > 0)
        && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD != null)
      ) {
        test.style.backgroundColor = '#CF6363';
      }
    }
  }

  snackBar(message: string, panelClass: string) {
    this.snack.openFromComponent(SnackbarComponent, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: message,
      panelClass: panelClass,


    })

  };

  snackBar1(message: string, panelClass: string) {
    this.snack.openFromComponent(SnackbarComponent, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: message,
      panelClass: panelClass,


    })

  };

  checked(data) {
    this.service.selectedMainImg = "";
    this.changeStyle = undefined;
    this.changeStyle = data;
    this.service.selectedMainImg = data;
  }

  showCentric(point) {
    // alert(point)
    this.tomb = document.getElementById("tomb");
    this.person = document.getElementById("person");
    if (point == 1) {
      this.showTambstone = true;
      this.tomb.style.color = '#09AA13';
      this.person.style.color = 'black';
      this.isDisplaySmallImage = true;
    }
    if (point == 2) {
      this.showTambstone = false;
      this.tomb.style.color = 'black';
      this.person.style.color = '#09AA13'
      this.isDisplaySmallImage = false;
    }
  }

  showSecMenu(num) {
    if (num == 1) {
      this.showMenuItems = 1;
    } else if (num == 2) {
      this.showMenuItems = 2;
    } else if (num == 3) {
      this.showMenuItems = 3;
    } else if (num == 4) {
      this.showMenuItems = 4;
    }
  }


  showSubMenuItems(num) {
    if (num == 1) {
      this.showSubMenItem = 1;
    } else if (num == 2) {
      this.showSubMenItem = 2;
    } else if (num == 3) {
      this.showSubMenItem = 3;
    } else if (num == 4) {
      this.showSubMenItem = 4;
    } else if (num == 5) {
      this.showSubMenItem = 5;
    }
  }

  getTambImage() {
    this.service.getTambstoneImages(1)
      .subscribe(
        (tambImags: any) => {
          this.imagespath = tambImags.images;
          if (this.caroucelCount == 1) {
            this.imagesForCaroucel = this.imagespath.slice(0, 6);
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  nextCarousel() {
    this.caroucelCount++;

    if (this.caroucelCount == 2) {
      this.imagesForCaroucel = this.imagespath.slice(7, 13);
    }
    if (this.caroucelCount == 3) {
      this.imagesForCaroucel = this.imagespath.slice(13, 19);
    }
    if (this.caroucelCount == 4) {
      this.imagesForCaroucel = this.imagespath.slice(19, 25);
    }
    if (this.caroucelCount == 5) {
      this.imagesForCaroucel = this.imagespath.slice(25, 29);
    }
    if (this.caroucelCount == null) {
      this.imagesForCaroucel = this.imagespath.slice(7, 13);
    }
  }

  prevCarousel() {
    this.caroucelCount = this.caroucelCount - 1;

    if (this.caroucelCount == 2) {
      this.imagesForCaroucel = this.imagespath.slice(7, 13);
    }
    if (this.caroucelCount == 3) {
      this.imagesForCaroucel = this.imagespath.slice(13, 19);
    }
    if (this.caroucelCount == 4) {
      this.imagesForCaroucel = this.imagespath.slice(19, 25);
    }
    if (this.caroucelCount == 5) {
      this.imagesForCaroucel = this.imagespath.slice(25, 29);
    }
    if (this.caroucelCount == 1 || null) {
      this.imagesForCaroucel = this.imagespath.slice(0, 6);
    }

  }

  // Code for labels
  openDialogue(num): void {
    if (num == 1) {
      this.showNewDiv = 1;
      this.isvalid = true;
    } else if (num == 2) {
      this.showNewDiv = 2;
      this.isvalid = true;
    } else if (num == 3) {
      this.showNewDiv = 3;
      this.isvalid = true;
    } else if (num == 4) {
      this.showNewDiv = 4;
      this.isvalid = true;
    } else if (num == 5) {
      this.showNewDiv = 5;
      this.isvalid = true;
    } else if (num == 6) {
      this.showNewDiv = 6;
      this.isvalid = true;
    } else if (num == 7) {
      this.showNewDiv = 7;
      this.isvalid = true;
    } else if (num == 8) {
      this.showNewDiv = 8;
      this.isvalid = true;
    } else if (num == 9) {
      this.showNewDiv = 9;
      this.isvalid = true;
    } else if (num == 10) {
      this.showNewDiv = 10;
      this.isvalid = true;
    } else if (num == 11) {
      this.showNewDiv = 11;
      this.isvalid = true;
    } else if (num == 12) {
      this.showNewDiv = 12;
      this.isvalid = true;
    } else if (num == 13) {
      this.showNewDiv = 13;
      this.isvalid = true;
    } else if (num == 14) {
      this.showNewDiv = 14;
      this.isvalid = true;
    } else if (num == 15) {
      this.showNewDiv = 15;
      this.isvalid = true;
    } else if (num == 16) {
      this.showNewDiv = 16;
      this.isvalid = true;
    } else if (num == 17) {
      this.showNewDiv = 17;
      this.isvalid = true;
    } else if (num == 18) {
      this.showNewDiv = 18;
      this.isvalid = true;
    } else if (num == 19) {
      this.showNewDiv = 19;
      this.isvalid = true;
    } else if (num == 20) {
      this.showNewDiv = 20;
      this.isvalid = true;
    } else if (num == 21) {
      this.showNewDiv = 21;
      this.isvalid = true;
    } else if (num == 22) {
      this.showNewDiv = 22;
      this.isvalid = true;
    } else if (num == 23) {
      this.showNewDiv = 23;
      this.isvalid = true;
    } else if (num == 24) {
      this.showNewDiv = 24;
      this.isvalid = true;
    } else if (num == 25) {
      this.showNewDiv = 25;
      this.isvalid = true;
    } else if (num == 26) {
      this.showNewDiv = 26;
      this.isvalid = true;
    } else if (num == 27) {
      this.showNewDiv = 27;
      this.isvalid = true;
    } else if (num == 28) {
      this.showNewDiv = 28;
      this.isvalid = true;
    } else if (num == 29) {
      this.showNewDiv = 29;
      this.isvalid = true;
    } else if (num == 30) {
      this.showNewDiv = 30;
      this.isvalid = true;
    } else if (num == 31) {
      this.showNewDiv = 31;
      this.isvalid = true;
    } else if (num == 32) {
      this.showNewDiv = 32;
      this.isvalid = true;
    } else if (num == 33) {
      this.showNewDiv = 33;
      this.isvalid = true;
    } else if (num == 34) {
      this.showNewDiv = 34;
      this.isvalid = true;
    } else if (num == 35) {
      this.showNewDiv = 35;
      this.isvalid = true;
    } else if (num == 36) {
      this.showNewDiv = 36;
      this.isvalid = true;
    } else if (num == 37) {
      this.showNewDiv = 37;
      this.isvalid = true;
    } else if (num == 38) {
      this.showNewDiv = 38;
      this.isvalid = true;
    } else if (num == 39) {
      this.showNewDiv = 39;
      this.isvalid = true;
    } else if (num == 40) {
      this.showNewDiv = 40;
      this.isvalid = true;
    } else if (num == 41) {
      this.showNewDiv = 41;
      this.isvalid = true;
    } else if (num == 42) {
      this.showNewDiv = 42;
      this.isvalid = true;
    } else if (num == 43) {
      this.showNewDiv = 43;
      this.isvalid = true;
    } else if (num == 44) {
      this.showNewDiv = 44;
      this.isvalid = true;
    } else if (num == 45) {
      this.showNewDiv = 45;
      this.isvalid = true;
    }

  }

  openDialogue1() {
    this.isvalid = false;
  }

  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      this.respo = res.Details;
      // For step-1 id
      this.respo1 = this.respo[85];
      this.respo2 = this.respo[86];
      this.respo3 = this.respo[87];
      this.respo4 = this.respo[88];
      this.respo5 = this.respo[89];
      this.respo6 = this.respo[90];
      this.respo7 = this.respo[91];
      this.respo8 = this.respo[92];
      this.respo9 = this.respo[93];
      this.respo10 = this.respo[94];
      this.respo11 = this.respo[95];
      this.respo12 = this.respo[96];
      this.respo13 = this.respo[97];
      this.respo14 = this.respo[98];


      this.respo15 = this.respo[164];
      this.respo16 = this.respo[165];
      this.respo17 = this.respo[166];
      this.respo18 = this.respo[167];
      this.respo19 = this.respo[168];

      // For step-3 labels
      this.respo20 = this.respo[120];
      this.respo21 = this.respo[121];
      this.respo22 = this.respo[122];

      this.respo23 = this.respo[123];
      this.respo24 = this.respo[124];
      this.respo25 = this.respo[125];
      this.respo26 = this.respo[126];
      this.respo27 = this.respo[128];
      this.respo28 = this.respo[127];
      this.respo29 = this.respo[129];
      this.respo30 = this.respo[130];
      this.respo31 = this.respo[131];
      this.respo32 = this.respo[132];
      this.respo33 = this.respo[133];
      this.respo34 = this.respo[134];

      this.respo35 = this.respo[135];
      this.respo36 = this.respo[136];
      this.respo37 = this.respo[137];
      this.respo38 = this.respo[138];
      this.respo39 = this.respo[139];
      this.respo40 = this.respo[140];
      this.respo41 = this.respo[141];
      this.respo42 = this.respo[142];
      this.respo43 = this.respo[143];
      this.respo44 = this.respo[144];
      this.respo45 = this.respo[254];
    });
  }

  postEditData(editDataNew: any) {
    var formdata = new FormData();
    formdata.append('id', editDataNew.value.id);
    formdata.append('en', editDataNew.value.en);
    formdata.append('de', editDataNew.value.de);
    formdata.append('fr', editDataNew.value.fr);

    this.editservice.editPostData(formdata).subscribe(response => {
    })
  }

  saveCanvasToJSON() {
    // const json = JSON.stringify(this.canvas);
    this.json = JSON.stringify(this.canvas);
    // save canvas json to the service
    this.service.saveCanvas1 = this.json;
  }

  createMemorialAgain() {
    this.child.GetData();

    this.spiner.show()
    const formDataAgain = new FormData();
    this.service.createMemorial.DOB = formatDate(this.service.createMemorial.DOB, 'yyyy-M-d h:mm:ss', 'en_US');
    this.service.createMemorial.DOD = formatDate(this.service.createMemorial.DOD, 'yyyy-M-d h:mm:ss', 'en_US');

    formDataAgain.append('user_id', this.loginservice.loginAllData.id);
    formDataAgain.append('g_firstname', this.service.createMemorial.g_firstname);
    formDataAgain.append('g_lastname', this.service.createMemorial.g_lastname);
    formDataAgain.append('birthplace', this.service.createMemorial.birthplace);
    formDataAgain.append('DOB', this.service.createMemorial.DOB);
    formDataAgain.append('DOD', this.service.createMemorial.DOD);
    formDataAgain.append('deathplace', this.service.createMemorial.deathplace);
    formDataAgain.append('birthname', this.service.createMemorial.birthname);

    this.service.newMemorialAgain(formDataAgain).subscribe((res: any) => {
      this.spiner.hide();

      var test = this.service.saveCanvas;

      const formData = new FormData();

      formData.append('grab_id', res.grab_id);
      formData.append('image', 'Image');
      formData.append('image_type_id', '7');
      formData.append('x', '100');
      formData.append('y', '120');
      formData.append('height', '200');
      formData.append('width', '300');
      formData.append('user_id', res.user_id);
      formData.append('canvas_json', this.service.saveCanvas1);
      formData.append('canvas_preview_base64', test);


      var vitaText = this.service.saveVitaText

      const formData1 = new FormData();

      formData1.append('grab_id', res.grab_id);
      formData1.append('vita_html', vitaText);


      this.service.createvitaMemorial(formData1).subscribe((result1: any) => {
        this.spiner.hide();
        if (result1.status == 'success') {
          this.router.navigate(['/thank-you']);
        }
      })
      this.service.memCreateImageData(formData).subscribe(result => {
        this.spiner.hide();
      })
    })
  }

  userChecking: boolean = false
  checkUser(data) {
    const jsonData = JSON.stringify(data.target.value)
    sessionStorage.setItem('userCheckingData', jsonData)
    var checkData = { "email_id": `${data.target.value}` }
    this.service.checkUserAvailable(checkData).subscribe((resUser: any) => {
      if (resUser.message == "User is already exist") {
        this.userChecking = true;
      } else {
        this.userChecking = false;
      }
    })
  }

  returnValue(event) {
    return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)
  }
  returnValue1(event) {
    if (event.target.value.length == 10) {
      return false;
    }
    return (event.charCode > 47 && event.charCode < 58)
  }
  returnValueNew(event) {
    return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode == 32);
  }

  createForm = new FormGroup({
    g_firstname: new FormControl('', [Validators.required]),
    g_lastname: new FormControl('', [Validators.required]),
    birthplace: new FormControl(''),
    deathplace: new FormControl(''),
    birthname: new FormControl(''),
    DOB: new FormControl('', [Validators.required]),
    DOD: new FormControl('', [Validators.required]),
  })
  createFormNew = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!%*?&])[A-Za-z\d$#@$!%*?&].{7,}")]),
    password1: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    streetname: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    hometown: new FormControl('', [Validators.required]),
    voucher: new FormControl(''),
    checkbox: new FormControl('', Validators.required)
  })

  get g_firstnameNew() { return this.createForm.get('g_firstname') }
  get g_lastnameNew() { return this.createForm.get('g_lastname') }
  get birthplaceNew() { return this.createForm.get('birthplace') }
  get deathplaceNew() { return this.createForm.get('deathplace') }
  get birthnameNew() { return this.createForm.get('birthname') }
  get DOBNew() { return this.createForm.get('DOB') }
  get DODNew() { return this.createForm.get('DOD') }

  get firstnameNew() { return this.createFormNew.get('firstname') }
  get lastnameNew() { return this.createFormNew.get('lastname') }
  get passwordNew() { return this.createFormNew.get('password') }
  get password1New() { return this.createFormNew.get('password1') }
  get emailNew() { return this.createFormNew.get('email') }
  get streetnameNew() { return this.createFormNew.get('streetname') }
  get zipcodeNew() { return this.createFormNew.get('zipcode') }
  get hometownNew() { return this.createFormNew.get('hometown') }
  get voucherNew() { return this.createFormNew.get('voucher') }
  get checkedBoxNew() { return this.createFormNew.get('checkbox') }

  inputValues1(e: any) {
    this.service.createMemorial.g_firstname = e.target.value
  }
  inputValues2(e: any) {
    this.service.createMemorial.g_lastname = e.target.value
  }
  inputValues3(e: any) {
    this.service.createMemorial.birthplace = e.target.value
  }
  inputValues4(e: any) {
    this.service.createMemorial.deathplace = e.target.value
  }
  inputValues5(e: any) {
    this.service.createMemorial.birthname = e.target.value
  }
  inputValues6(e: any) {
    this.service.createMemorial.DOB = e.target.value
  }
  inputValues7(e: any) {
    this.service.createMemorial.DOD = e.target.value
  }


  create() {

  }

  memorialImage = [
    { path: "../../../assets/StaticAssets/Create memorial/step2/33k.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33125.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33142.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33k.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/334.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33125.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33125.png" },

    { path: "../../../assets/StaticAssets/Create memorial/step2/33k.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33125.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33142.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33k.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/334.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33125.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33125.png" },

    { path: "../../../assets/StaticAssets/Create memorial/step2/33k.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33125.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33142.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33k.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/334.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33125.png" },
    { path: "../../../assets/StaticAssets/Create memorial/step2/33125.png" }
  ]
}
