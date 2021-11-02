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


@Component({
  selector: 'app-create-memorial',
  templateUrl: './create-memorial.component.html',
  styleUrls: ['./create-memorial.component.css']
})
export class CreateMemorialComponent implements OnInit {

  // @ViewChild('canvas', { static: true }) Canvas: ElementRef<HTMLCanvasElement>;


 

  ImgRandomId = 0;
  imagespath = [];
  imagesForCaroucel = [];
  caroucelCount: number = 1;

  showMemSteps: Number = 1;
  showTambstone: boolean = true;
  showMenuItems: Number = 1;
  showSubMenItem: Number = 1;

  changeStyle: string;
  
  year = new Date().getFullYear();
  month = new Date().getMonth() +1;           //+1
  day = new Date().getDate();
  // curruntDate: any = `${this.year}` + "-" + `${this.month}` + "-" + `${this.day}`;
  curruntDate:any = `${this.month}` + "-" + `${this.day}` + "-" + `${this.year}`;
  // curruntDate: any = `${'0' + this.month}` + "-" + `${this.day}` + "-" + `${this.year}`;
 searchDate:any=new Date(this.curruntDate)
  

  canddleImages = [];
  newCanddleImages = [];
  canddleCaroucelCount: number = 1;

  URNSImages = [];

  flowerImages = [];
  newFlowerImages = [];
  flowerCaroucelCount: number = 1;

  backgroundImages = [];
  canvas: any;
  memory: any = {};
  data: any;
  msg: any;
  Data: { grab_id: any; image: any; image_type_id: any; };
  result: Object;

  flag: any = false;


  constructor(
    public service: CreateMemorialService,
    public snack: MatSnackBar,
    public element: ElementRef,


    
  ) { 
    debugger;
  //   const year = new Date().getFullYear();
  // const month = new Date().getMonth()+1 ;
  // const day = new Date().getDate();
  //  `${year}` + "-" + `${'0' +month}` + "-" + `${day}`;
  }





  ngOnInit() {
    // this.canvas=new fabric.Canvas('Mycanvas');

    // this.canvas.add(new fabric.IText('Hello Fabric!'));


    this.changeStyle = undefined;
    this.getTambImage();
    this.clickShowStepBtn1();
    // this.showActive();

  }










  /// --------------------------------------------------

  addImageToCanvas(decImages: any) {

    fabric.Image.fromURL(decImages.path, (newImg) => {
      this.canvas.add(newImg);
      newImg.toCanvasElement;
      newImg.originX = 'center';
      newImg.originY = 'center';
      newImg.hasControls = false;
    },
      {
        left: 220,
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
  hidePerson:boolean=false;
  onselectFile(e) {
    debugger
    this.service.selectedMainImg == null;
    this.changeStyle = null;
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;


        if(this.url==''){
          this.hidePerson=true;
        }else{
          this.hidePerson=true;
        }

        this.service.selectedMainImg = this.url;
      }

    }

  }




  //  memorialDetails(memDetails: any) {
  //   
  //    console.log(memDetails.value);
  //    this.service.memCreatePostData(memDetails.value).subscribe(res=>{
  //    })





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


  register(regData: any) {
    debugger;
    console.log(regData);
    this.service.memCreatePostData().subscribe((res: any) => {
      // this.msg("you have created successfully account");
      // if(res == 1){



      var test = this.service.saveCanvas;



      const formData = new FormData();

      debugger;

      formData.append('grab_id', res.grab_id);
      formData.append('image', 'Image');
      formData.append('image_type_id', '7');
      formData.append('x', '100');
      formData.append('y', '120');
      formData.append('height', '200');
      formData.append('width', '300');
      formData.append('user_id', res.user_id);
      formData.append('canvas_json', 'canvas_json');
      formData.append('canvas_preview_base64', test);


      debugger;
      var vitaText = this.service.saveVitaText

      const formData1 = new FormData();

      formData1.append('grab_id', res.grab_id);
      formData1.append('vita_html', vitaText);


      this.service.createvitaMemorial(formData1).subscribe(result1 => {
        console.log(formData1);
      })

      // debugger;
      // this.result = {
      //   'grab_id': res.grab_id,
      //   'image': this.files,
      //   'image_type_id': 3,
      //   'x': 100,
      //   'y': 120,
      //   'height': 200,
      //   'width': 300,
      //   'user_id': res.user_id,
      //   'canvas_json': 'canvas_json',
      //   'canvas_preview_base64': 'canvas_base_64'
      // }
      this.service.memCreateImageData(formData).subscribe(result => {

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

    // this.service.saveFormData=memDetails.value;

  }


  // selectTab(e){
  //   debugger;
  //   e.preventDefault();

  //   let activeTab=document.querySelector('.tab > button.active');
  //   if(activeTab){
  //      activeTab.classList.remove('active');
  //     }
  //   e.target.element.classList.add('active');

  // }




  // step 1 functions
  showStep(num) {
    if (num == 1) {
      this.showMemSteps = 1;

    }

    else if (num == 2
      && (this.service.createMemorial.g_firstname != undefined && this.service.createMemorial.g_firstname.length > 0)
      && (this.service.createMemorial.g_lastname != undefined && this.service.createMemorial.g_lastname.length > 0)
      && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB.length > 0)
      && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD?.length > 0)
       ) {
      this.showMemSteps = 2;
    }
    else if (num == 2) {
      this.snackBar('Please fill all details on step-1', 'alert-success');

    }

    else if (num == 3
      && (this.service.createMemorial.g_firstname != undefined && this.service.createMemorial.g_firstname.length > 0)
      && (this.service.createMemorial.g_lastname != undefined && this.service.createMemorial.g_lastname.length > 0)
      && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB.length > 0)
      && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD?.length > 0)
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
        test.style.backgroundColor = '#f87171';
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
        && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB.length > 0)
        && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD?.length > 0)
         ) {
        test.style.backgroundColor = '#f87171';
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
        && (this.service.createMemorial.DOB != undefined && this.service.createMemorial.DOB.length > 0)
        && (this.service.createMemorial.DOD != undefined && this.service.createMemorial.DOD?.length > 0)
        ) {
        test.style.backgroundColor = '#f87171';
      }
    }
  }



  snackBar(message: string, panelClass: string) {
    this.snack.openFromComponent(SnackbarComponent, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      data: message,
      panelClass: panelClass,


    })

  };




  // isActive:any;
  // showActive(){
  //   debugger;
  //   var header=document.getElementById("myDiv");
  //   var btns=header.getElementsByClassName("steeper");

  //   for(var i=0; i < btns.length; i++){
  //     btns[i].addEventListener("click", function(){
  //       var current=document.getElementsByClassName("activep");
  //       current[0].className=current[0].className.replace("activep","");
  //       this.className +="activep";
  //     });
  //   }
  // }


  checked(data) {
    this.service.selectedMainImg == null;
    this.changeStyle = undefined;
    this.changeStyle = data;
    this.service.selectedMainImg = data;

  }





  showCentric(point) {
    // alert(point)
    if (point == 1) {
      this.showTambstone = true;
    }
    if (point == 2) {
      this.showTambstone = false;
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















  //  step2 functions






















  // imagespath = [
  //   { path: "../../../assets/StaticAssets/Create memorial/step1/tome1.png" },
  //   { path: "../../../assets/StaticAssets/Create memorial/step1/tome2.png" },
  //   { path: "../../../assets/StaticAssets/Create memorial/step1/tome4.png" },
  //   { path: "../../../assets/StaticAssets/Create memorial/step1/tome5.png" },
  //   { path: "../../../assets/StaticAssets/Create memorial/step1/tome6.png" },
  //   { path: "../../../assets/StaticAssets/Create memorial/step1/tome3.png" }
  // ]

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
