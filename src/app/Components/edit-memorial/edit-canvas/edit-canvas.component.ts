import { formatDate } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { fabric } from 'fabric';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { AdminEditService } from 'src/services/admin-edit.service';
import { CreateMemorialService } from 'src/services/create-memorial.service';
import { EditMemorialService } from 'src/services/edit-memorial.service';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { UserProfileService } from 'src/services/user-profile.service';
import { GifLoaderService } from '../../create-memorial/canvas/gif-loader.service';
import { fabricGif } from "../../create-memorial/canvas/fabricGif";
@Component({
  selector: 'app-edit-canvas',
  templateUrl: './edit-canvas.component.html',
  styleUrls: ['./edit-canvas.component.css']
})
export class EditCanvasComponent implements OnInit {

  vitaData: any;
  data: any = {};
  ImgRandomId = 0;
  newCanddleImages = [];
  canddleCaroucelCount: number = 1;
  canddleImages = [];
  URNSImages = [];
  flowerImages = [];
  flowerCaroucelCount: number = 1;
  newFlowerImages = [];
  backgroundImages = [];
  canvas: fabric.Canvas;
  canvas1: fabric.Canvas;
  showMenuItems: Number = 1;
  showSubMenItem: Number = 1;
  ctx: any;
  newText: any;
  myVideoUrl: any;
  dataURL: any;
  src: any;
  canvasImg: any;
  canvasURL: any;
  imgUrl: any;
  public fill = '#000000';

  public selected: any;

  removeId: any;

  showTambstone: boolean = true;
  imagespath = [];
  caroucelCount: number = 1;
  bgCaroucelCount: number = 1;
  imagesForCaroucel = [];

  changeStyle: string;
  cornerSize: any;
  fontWeight: any;
  fontStyle: any;
  TextDecoration: '';
  textAlign: any;
  Rate: any;
  p: any;
  paused: any;
  ended: any;
  context: CanvasRenderingContext2D;
  showNewDiv: number;
  isvalid: boolean;
  respo: any;
  respo1: any;
  respo2: any;
  respo3: any;
  respo4: any;
  respo5: any;
  respo6: any;
  respo7: any;
  respo8: any;
  respo9: any;
  respo10: any;
  jsonData1: any;
  getUserMemoData: any;
  vitaData1: any;
  saveVita: boolean = true;
  tomb: HTMLElement;
  person: HTMLElement;
  isDisplaySmallImage: boolean;
  respo11: any;
  respo12: any;
  respo13: any;
  imgBack: any[];
  respo14: any;
  respo15: any;
  isMobile: boolean = false;
  isTablet: boolean = false;
  tombstomeMainOjbectToCenter: any;
  showFirstCandleIcon: boolean = true;
  showLastCandleIcon: boolean = false;
  existBackImage: any;
  textObject: any;
  respo16: any = {
    de: "DEKORATION HINZUFÜGEN",
    en: "ADD DECORATION",
    fr: "AJOUTER UNE DÉCORATION"
  };

  constructor(
    public service: CreateMemorialService,
    private _sanitizer: DomSanitizer,
    public editservice: AdminEditService,
    public loginservice: LoginService,
    public editCanvas: EditMemorialService,
    public profileService: UserProfileService,
    public recentService: RecentMeorialsService,
    public dialog: MatDialog,
    private spiner: NgxSpinnerService,
    public snack: MatSnackBar,
    private router: Router,
    private gifLoaderService: GifLoaderService
  ) { this.loginservice.otherPage = true; }
  ngAfterViewInit() {
    this.showSecMenu(1);
    this.showSubMenuItems(1);
    this.isMobile = false;
    this.isTablet = false;
    if (window.innerWidth >= 1500) {
      this.canvas.setHeight(600);
      this.canvas.setWidth(600);
      this.canvas.renderAll();
    }
    else if(window.innerWidth > 1400 && window.innerWidth < 1500){
      this.canvas.setHeight(500);
      this.canvas.setWidth(500);
      this.canvas.renderAll();
    }
    else if (window.innerWidth > 1000 && window.innerWidth < 1200) {
      this.canvas.setHeight(500);
      this.canvas.setWidth(380);
      // this.canvas.setWidth(380);
      this.canvas.renderAll();
    }
    else if (window.innerWidth > 1200 && window.innerWidth < 1400) {
      this.canvas.setHeight(500);
      this.canvas.setWidth(470);
      this.canvas.renderAll();
    }
    else if (window.innerWidth > 768 && window.innerWidth <= 1000) {
      this.isTablet = true;
      this.canvas.setHeight(400);
      this.canvas.setWidth(400);
      this.canvas.renderAll();
    }
    else if (window.innerWidth <= 768) {
      this.isMobile = true;
      this.canvas.setHeight(350);
      this.canvas.setWidth(300);
      this.canvas.renderAll();
    }

    if (this.canddleCaroucelCount == 1) {
      this.canddleImages = this.isMobile
        ? this.newCanddleImages
        : this.newCanddleImages.slice(0, 20);
    }

    this.imagesForCaroucel = this.isMobile
      ? this.imagespath
      : this.imagespath.slice(0, 6);

    this.imgBack = this.isMobile
      ? this.backgroundImages
      : this.backgroundImages.slice(0, 6);

  }

  ngOnInit(): void {
    this.getCanddleImages();
    this.getURNSImages();
    // this.getFlowerImages();
    this.getbackgImages();
    this.canvasadd();
    this.loadCanvasFromJSON();
    this.getTambImage();
    this.editData();
    this.getData();
    this.postGrabId();
    this.displayVitaText();
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = false;
    this.isTablet = false;
    this.showFirstCandleIcon = true;
    this.showLastCandleIcon = true;
    if (window.innerWidth >= 1500) {
      this.canvas.setHeight(600);
      this.canvas.setWidth(600);
      this.canvas.renderAll();
    }
    else if(window.innerWidth > 1400 && window.innerWidth < 1500){
      this.canvas.setHeight(500);
      this.canvas.setWidth(500);
      this.canvas.renderAll();
    }
    else if (window.innerWidth > 1200 && window.innerWidth < 1400) {
      this.canvas.setHeight(500);
      this.canvas.setWidth(470);
      this.canvas.renderAll();
    }
    else if (window.innerWidth > 1000 && window.innerWidth < 1200) {
      // this.canvas.setHeight(500);
      this.canvas.setHeight(500);
      this.canvas.setWidth(380);
      // this.canvas.setWidth(380);
      this.canvas.renderAll();
    }
    else if (window.innerWidth > 768 && window.innerWidth <= 1000) {
      this.isTablet = true;
      this.canvas.setHeight(400);
      this.canvas.setWidth(400);
      this.canvas.renderAll();
    }
    else if (window.innerWidth <= 768) {
      this.isMobile = true;
      this.showFirstCandleIcon = true;
      // this.showLastCandleIcon = false;
      this.canvas.setHeight(350);
      this.canvas.setWidth(300);
      this.canvas.renderAll();
    }
    if (this.canddleCaroucelCount == 1) {
      this.canddleImages = this.isMobile
        ? this.newCanddleImages
        : this.newCanddleImages.slice(0, 20);
      // this.canddleImages = this.newCanddleImages;
    }
    
    this.imagesForCaroucel = this.isMobile
      ? this.imagespath
      : this.imagespath.slice(0, 6);

    this.imgBack = this.isMobile
      ? this.backgroundImages
      : this.backgroundImages.slice(0, 6);
    if(this.existBackImage){
      this.setBackgImage(this.existBackImage);
    }

    if (this.flowerCaroucelCount == 1) {
      this.newFlowerImages = this.isMobile
        ? this.flowerImages
        : this.flowerImages.slice(0, 10);
    }

    // else if (window.innerWidth < 500) {
    //   this.canvas.setHeight(200);
    //   this.canvas.setWidth(200);
    //   this.canvas.renderAll();
    // }
    setTimeout(() => {
      this.canvas.centerObjectH(this.textObject);
      // this.addImageToCanvas1(this.selectedTombstoneImage);
      this.canvas.centerObjectH(this.tombstomeMainOjbectToCenter);
    }, 200);
  }
  
  public textString: string;
  public textString1: string;
  coloro: any = 'tomato';
  name45: any;
  DOB1: any;
  DOD1: any;
  // For refresh user
  getData() {
    var userLoginData = localStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);

    this.loginservice.loginAllData = loginAfterRefresh.user[0].id;
    this.getUserMemorial();
  }
  count: any = 0;
  countImage() {
    this.count++;
    this.service.count1 = this.count;
  }

  // Get user Memorials for refresh user
  getUserMemorial() {
    var data = { "user_id": this.loginservice.loginAllData }
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        this.getUserMemoData = userRes["User Memorials"];
        this.displayVitaText();
        this.postGrabId();
      })
  }
  // For display vita text
  displayVitaText() {
    var fetchData = { "grab_id": this.recentService.userGrabIdData }
    this.editCanvas.fetchVita(fetchData).subscribe((response: any) => {
      if (response.details.vita_html !== "undefined") {
        this.vitaData = response.details.vita_html;
      } else if (response.details.vita_html == "undefined") {
        this.vitaData = '';
      }
    })
  }
  // Open vita text input
  openUser(num): void {

    if (num == 100) {
      this.showNewDiv = 100;
      this.isvalid = true;
    }
  }
  openUser1() {
    this.isvalid = false;
    this.displayVitaText();
  }

  userVitaData(data) {
    this.spiner.show();
    var vitaData = { "grab_id": this.recentService.userGrabIdData, "vita_html": data.value.vita_html };
    this.editCanvas.vitaUpload(vitaData).subscribe((response: any) => {
      this.spiner.hide();
      this.displayVitaText();
    });
  }

  addText1() {
    this.DOB1 = formatDate(this.service.createMemorial.DOB, 'M.d.yyyy', 'en_US');
    this.DOD1 = formatDate(this.service.createMemorial.DOD, 'M.d.yyyy', 'en_US');
    let left = (this.canvas.width >= 470) ? 175 : ((this.canvas.width - 150) / 2 );
    this.name45 = this.service.createMemorial.g_firstname + " " + this.service.createMemorial.g_lastname + " " + "(" + this.DOB1 + " " + "-" + " " + this.DOD1 + ")"
    const text = new fabric.IText(this.name45, {
      left: left,
      top: 1,
      fontFamily: 'helvetica',
      angle: 0,
      scaleX: 0.4,
      scaleY: 0.4,
      fill: "#CF6363",
      fontWeight: 'bold',
      hasRotatingPoint: true,
    });
    this.textObject = text;
    this.canvas.add(text);
    this.canvas.centerObjectH(this.textObject);
  }
  canvasadd() {
    this.canvas = new fabric.Canvas('Mycanvas');
    this.canvas.preserveObjectStacking = true;
    this.removeSelected1();
    fabric.Image.fromURL(this.service.selectedMainImg, newImg => {
      this.canvas.add(newImg);
      newImg.toCanvasElement;
      newImg.top = (this.canvas.height >= 500) ? ((this.canvas.height - 400) / 2)+5 : 20;
      newImg.left = ((this.canvas.width - 300) / 2);
      newImg.originX = 'left';
      newImg.originY = 'top';
      newImg.scaleToHeight(260);
      newImg.scaleToWidth(260);
      newImg.name = "tombStoneImage";
      this.tombstomeMainOjbectToCenter = newImg;
      this.canvas.centerObjectH(this.tombstomeMainOjbectToCenter);
      
      this.extend(newImg, this.ImgRandomId);
    });
    this.canvas.renderAll();
    this.canvas.on('object:moving', function (e) {
      movingRotatingWithinBounds(e);
    });

    this.canvas.on('object:scaling', function (e) {
      scalling(e);
    })
    //Delete object
    var Obj = new fabric.Control({
      render: this.renderIcon,
      x: 0.5,
      y: -0.5,
      cursorStyle: 'pointer',
      mouseUpHandler: this.deleteObject,
    });
    Obj['cornerSize'] = 36;
    fabric.Object.prototype.controls.deleteControl = Obj;
  }
  deleteObject(eventData, transform): boolean {
    var target = transform.target;
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
    return true;
  }
  renderIcon(ctx, left, top, styleOverride, fabricObject): boolean {
    var deleteIcon = "../../../../assets/StaticAssets/Flat_cross_icon.svg.png";
    var img = document.createElement('img');
    img.src = deleteIcon;
    var size = 20;
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
    ctx.save();
    return true;
  }


  saveCanvasToJSON() {
    const json = JSON.stringify(this.canvas);
    this.service.saveCanvas1 = json;
  }

  loadCanvasFromJSON() {
    const CANVAS = this.service.saveCanvas1;
    this.canvas.loadFromJSON(CANVAS, () => {
      this.canvas.renderAll();
    })
  }

  removeSelected() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.remove(activeObject);
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      const self = this;
      activeGroup.forEach((object) => {
        self.canvas.remove(object);
      });
    }
  }

  removeSelected1() {
    var activeObject = this.canvas.getObjects();
    activeObject.forEach(element => {
      if (element.toObject().id == this.ImgRandomId) {
        this.canvas.remove(element);
      }
    });
  }
  //------------------------------
  DropImageToCan(dragImage: any) {

    this.addImageToCanvas(dragImage);
  }
  addImageToCanvas(decImages: any) {
    fabric.Image.fromURL(decImages.path, (newImg) => {
      this.canvas.add(newImg);
      let self = this;
      newImg.toCanvasElement;
      newImg.originX = 'center';
      newImg.originY = 'center';
      newImg.hasControls = true;
      newImg.bringToFront();
      this.canvas.setActiveObject(newImg);
    },
      {
        left: Math.floor(Math.random() * (this.canvas.width - 50)),
        top: Math.floor(Math.random() * (this.canvas.height - 50)),
      })
  }

  addImageToCanvas1(decImages1: any) {
    this.removeSelected1();

    fabric.Image.fromURL(decImages1.path, (newImg1) => {
      this.canvas.add(newImg1);
      newImg1.toCanvasElement;
      newImg1.top = (this.canvas.height >= 500) ? ((this.canvas.height - 400) / 2)+5 : 20;
      newImg1.left = ((this.canvas.width - 300) / 2);
      newImg1.originX = 'center';
      newImg1.originY = 'center';
      newImg1.hasControls = true;
      newImg1.scaleToHeight(260);
      newImg1.scaleToWidth(260);
      newImg1.sendToBack();
      newImg1.name = "tombStoneImage";
      this.ImgRandomId = this.randomId();
      this.tombstomeMainOjbectToCenter = newImg1;
      this.canvas.centerObjectH(this.tombstomeMainOjbectToCenter);
      this.extend(newImg1, this.ImgRandomId);
    },
      // {
      //   left: 280,
      //   top: 280
      // }
    );
  }

  addVitaTextString() {
    if (this.service.vita.textString1) {
      // const text = new fabric.IText(this.service.vita.textString1, {
      //   left: Math.floor(Math.random() * (this.canvas.width - 50)),
      //   top: Math.floor(Math.random() * (this.canvas.height - 50)),
      //   fontFamily: "helvetica",
      //   angle: 0,
      //   fill: this.fill,
      //   scaleX: 0.4,
      //   scaleY: 0.4,
      //   fontWeight: "",
      //   hasRotatingPoint: true,
      // });
      // this.extend(text, this.randomId());
      // this.canvas.add(text);
      // this.selectItemAfterAdded(text);
      // this.service.vita.textString1 = "";
    }
  }

  showSecMenu(num) {
    var decoration = document.getElementById('Decoration');
    var background = document.getElementById('Background');
    var vita = document.getElementById('Vita');
    if (num == 1) {
      this.showMenuItems = 1;
      decoration.style.backgroundColor = '#F2F2F2';
      background.style.backgroundColor = 'white';
      vita.style.backgroundColor = 'white';
    } else if (num == 2) {
      this.showMenuItems = 2;
      decoration.style.backgroundColor = 'white';
      background.style.backgroundColor = '#F2F2F2';
      vita.style.backgroundColor = 'white';
    } else if (num == 3) {
      this.showMenuItems = 3;
      decoration.style.backgroundColor = 'white';
      background.style.backgroundColor = 'white';
      vita.style.backgroundColor = '#F2F2F2';
    } else if (num == 4) {
      this.showMenuItems = 4;
    }
  }
  urnSM1: boolean;
  urnSM2: boolean;
  candleSM1: boolean;
  candleSM2: boolean;
  changetombSM1: boolean;
  changetombSM2: boolean;
  flowerSM1: boolean;
  flowerSM2: boolean;
  incriptionSM1: boolean;
  incriptionSM2: boolean;
  showSubMenuItems(num) {
    if (num == 1) {
      this.showSubMenItem = 1;
      this.candleSM1 = false;
      this.candleSM2 = true;
      this.urnSM1 = true;
      this.urnSM2 = false;
      this.changetombSM1 = true;
      this.changetombSM2 = false;
      this.flowerSM1 = true;
      this.flowerSM2 = false;
      this.incriptionSM1 = true;
      this.incriptionSM2 = false;
    } else if (num == 2) {
      this.showSubMenItem = 2;
      this.candleSM1 = true;
      this.candleSM2 = false;
      this.urnSM1 = false;
      this.urnSM2 = true;
      this.changetombSM1 = true;
      this.changetombSM2 = false;
      this.flowerSM1 = true;
      this.flowerSM2 = false;
      this.incriptionSM1 = true;
      this.incriptionSM2 = false;

    } else if (num == 3) {
      this.showSubMenItem = 3;
      this.candleSM1 = true;
      this.candleSM2 = false;
      this.urnSM1 = true;
      this.urnSM2 = false;
      this.changetombSM1 = true;
      this.changetombSM2 = false;
      this.flowerSM1 = false;
      this.flowerSM2 = true;
      this.incriptionSM1 = true;
      this.incriptionSM2 = false;

    } else if (num == 4) {
      this.showSubMenItem = 4;
      this.candleSM1 = true;
      this.candleSM2 = false;
      this.urnSM1 = true;
      this.urnSM2 = false;
      this.changetombSM1 = true;
      this.changetombSM2 = false;
      this.flowerSM1 = true;
      this.flowerSM2 = false;
      this.incriptionSM1 = false;
      this.incriptionSM2 = true;

    } else if (num == 5) {
      this.showSubMenItem = 5;
      this.candleSM1 = true;
      this.candleSM2 = false;
      this.urnSM1 = true;
      this.urnSM2 = false;
      this.changetombSM1 = false;
      this.changetombSM2 = true;
      this.flowerSM1 = true;
      this.flowerSM2 = false;
      this.incriptionSM1 = true;
      this.incriptionSM2 = false;
      this.showCentric1(1);
    }
  }
  startImgDrag(event) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData("decImage", event.target.getAttribute("src"));
    return true;
  };
  addText() {
    if (this.textString) {
      const text = new fabric.IText(this.textString, {
        left: Math.floor(Math.random() * (this.canvas.width - 50)),
        top: Math.floor(Math.random() * (this.canvas.height - 50)),
        fontFamily: 'helvetica',
        angle: 0,
        fill: this.fill,
        scaleX: 0.4,
        scaleY: 0.4,
        fontWeight: '',
        hasRotatingPoint: true,
      });
      this.extend(text, this.randomId());
      this.canvas.add(text);
      this.selectItemAfterAdded(text);
      this.textString = '';
    }
  }

  extend(obj, id) {
    obj.toObject = ((toObject) => {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id
        });
      };
    })(obj.toObject);
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  selectItemAfterAdded(obj) {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }

  setBold() {
    this.fontWeight = !this.fontWeight;
    this.setActiveStyle('fontWeight', this.fontWeight ? 'bold' : '', null);
  }
  setFontStyle() {
    this.fontStyle = !this.fontStyle;
    if (this.fontStyle) {
      this.setActiveStyle('fontStyle', 'italic', null);
    } else {
      this.setActiveStyle('fontStyle', 'normal', null);
    }
  }

  getTextAlign() {
    this.textAlign = this.getActiveProp('textAlign');
  }

  setTextAlign(value) {
    this.textAlign = value;
    this.setActiveProp('textAlign', this.textAlign);
  }
  getActiveProp(name) {
    const object = this.canvas.getActiveObject();
    if (!object) { return ''; }

    return object[name] || '';
  }

  setActiveProp(name, value) {
    const object = this.canvas.getActiveObject();
    if (!object) { return; }
    object.set(name, value);
    object.setCoords();
    this.canvas.renderAll();
  }
  //Code for add color picker
  getFill() {
    this.fill = this.getActiveStyle('fill', null);
  }
  setFill() {
    this.setActiveStyle('fill', this.fill, null);
  }
  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) { return ''; }

    if (object.getSelectionStyles && object.isEditing) {
      return (object.getSelectionStyles()[styleName] || '');
    } else {
      return (object[styleName] || '');
    }
  }

  setActiveStyle(styleName, value: string | number, object: fabric.IText) {
    object = object || this.canvas.getActiveObject() as fabric.IText;
    if (!object) { return; }
    if (object.setSelectionStyles && object.isEditing) {
      const style = {};
      style[styleName] = value;
      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.setSelectionStyles({ underline: true });
        } else {
          object.setSelectionStyles({ underline: false });
        }
        if (value.includes('overline')) {
          object.setSelectionStyles({ overline: true });
        } else {
          object.setSelectionStyles({ overline: false });
        }
        if (value.includes('line-through')) {
          object.setSelectionStyles({ linethrough: true });
        } else {
          object.setSelectionStyles({ linethrough: false });
        }
      }
      object.setSelectionStyles(style);
      object.setCoords();
    } else {
      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.set('underline', true);
        } else {
          object.set('underline', false);
        }

        if (value.includes('overline')) {
          object.set('overline', true);
        } else {
          object.set('overline', false);
        }

        if (value.includes('line-through')) {
          object.set('linethrough', true);
        } else {
          object.set('linethrough', false);
        }
      }
      object.set(styleName, value);
    }
    object.setCoords();
    this.canvas.renderAll();
  }
  setBackgImage(backImage: any) {
    fabric.Image.fromURL(backImage.path, (img) => {
      img.set({
        scaleX: this.canvas.width / img.width,
        scaleY: this.canvas.height / img.height
      });
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));
    });
    this.canvas.renderAll();
  }
  getCanddleImages() {
    this.service.getCanddleImages(2)
      .subscribe(
        (cImages: any) => {
          this.newCanddleImages = cImages.images;

          if (this.canddleCaroucelCount == 1) {
            this.canddleImages = this.isMobile
            ? this.newCanddleImages
            : this.newCanddleImages.slice(0, 20);
          }
        },
        error => {
          console.log(error);
        }
      )
  }
  nextCanddle() {
    this.canddleCaroucelCount++;
    if (this.canddleCaroucelCount >= 2) {
      this.canddleImages = this.newCanddleImages.slice(20, 37);
    }
  }
  prevCanddle() {
    this.canddleCaroucelCount--;
    if (this.canddleCaroucelCount <= 1) {
      this.canddleImages = this.newCanddleImages.slice(0, 20);
    }
  }
  getURNSImages() {
    this.service.getURNSImages(5)
      .subscribe(
        (URImages: any) => {
          this.URNSImages = URImages.images;
          this.getFlowerImages();
        },
        error => {
          console.log(error);
        }
      )
  }
  getFlowerImages() {
    this.service.getFlowerImages(3)
      .subscribe(
        (flowerImages: any) => {
          this.flowerImages = [...this.URNSImages, ...flowerImages.images];
        if (this.flowerCaroucelCount == 1) {
          this.newFlowerImages = this.isMobile
            ? this.flowerImages
            : this.flowerImages.slice(0, 10);
        }
        },
        (error: any) => {
          console.log(error);
        }
      )
  }
  //show tombstone
  showCentric1(point) {
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

  checked(data) {
    this.changeStyle = undefined;
    this.changeStyle = data;
    this.service.selectedMainImg = data;
  }

  getTambImage() {
    this.service.getTambstoneImages(1)
      .subscribe(
        (tambImags: any) => {
          this.imagespath = tambImags.images;
          if (this.caroucelCount == 1) {
            this.imagesForCaroucel = this.isMobile
            ? this.imagespath
            : this.imagespath.slice(0, 6);
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

  nextFlowers() {
    this.flowerCaroucelCount++;

    if (this.flowerCaroucelCount == 1) {
      this.newFlowerImages = this.flowerImages.slice(0, 7);

    }

    if (this.flowerCaroucelCount == 2) {
      this.newFlowerImages = this.flowerImages.slice(7, 14);

    }
    if (this.flowerCaroucelCount == 3) {
      this.newFlowerImages = this.flowerImages.slice(14, 21);

    }
    if (this.flowerCaroucelCount == 4) {
      this.newFlowerImages = this.flowerImages.slice(21, 28);

    }
    if (this.flowerCaroucelCount == 5) {
      this.newFlowerImages = this.flowerImages.slice(28, 35);

    }
    if (this.flowerCaroucelCount == 6) {
      this.newFlowerImages = this.flowerImages.slice(35, 42);

    }
    if (this.flowerCaroucelCount == 7) {
      this.newFlowerImages = this.flowerImages.slice(42, 49);

    }
    if (this.flowerCaroucelCount == 8) {
      this.newFlowerImages = this.flowerImages.slice(49, 56);

    }
    if (this.flowerCaroucelCount == 8) {
      this.newFlowerImages = this.flowerImages.slice(56, 63);

    }
    if (this.flowerCaroucelCount == 9) {
      this.newFlowerImages = this.flowerImages.slice(63, 70);

    }
    if (this.flowerCaroucelCount == 10) {
      this.newFlowerImages = this.flowerImages.slice(70, 77);

    }
    if (this.flowerCaroucelCount == 11) {
      this.newFlowerImages = this.flowerImages.slice(77, 84);

    }
    if (this.flowerCaroucelCount >= 12) {
      this.newFlowerImages = this.flowerImages.slice(84, 91);

    }

  }

  prevFlower() {
    this.flowerCaroucelCount--;
    if (this.flowerCaroucelCount == 1) {
      this.newFlowerImages = this.flowerImages.slice(0, 10);

    }
    if (this.flowerCaroucelCount == 2) {
      this.newFlowerImages = this.flowerImages.slice(7, 14);

    }
    if (this.flowerCaroucelCount == 3) {
      this.newFlowerImages = this.flowerImages.slice(14, 21);

    }
    if (this.flowerCaroucelCount == 4) {
      this.newFlowerImages = this.flowerImages.slice(21, 28);

    }
    if (this.flowerCaroucelCount == 5) {
      this.newFlowerImages = this.flowerImages.slice(28, 35);

    }
    if (this.flowerCaroucelCount == 6) {
      this.newFlowerImages = this.flowerImages.slice(35, 42);

    }
    if (this.flowerCaroucelCount == 7) {
      this.newFlowerImages = this.flowerImages.slice(42, 49);

    }
    if (this.flowerCaroucelCount == 8) {
      this.newFlowerImages = this.flowerImages.slice(49, 56);

    }
    if (this.flowerCaroucelCount == 9) {
      this.newFlowerImages = this.flowerImages.slice(56, 63);

    }
    if (this.flowerCaroucelCount == 10) {
      this.newFlowerImages = this.flowerImages.slice(63, 70);

    }
    if (this.flowerCaroucelCount == 11) {
      this.newFlowerImages = this.flowerImages.slice(70, 77);

    }
    if (this.flowerCaroucelCount == 12) {
      this.newFlowerImages = this.flowerImages.slice(77, 84);

    }
  }
  getbackgImages() {
    this.service.getBackgImages(4)
      .subscribe(
        (backImages: any) => {
          this.backgroundImages = backImages.images;
          if (this.caroucelCount == 1) {
            this.imgBack = this.isMobile
            ? this.backgroundImages
            : this.backgroundImages.slice(0, 6);
          }
        },
        error => {
          console.log(error);
        }
      )
  }

  nextCarousel1() {
    this.bgCaroucelCount++;

    if (this.bgCaroucelCount == 2) {
      this.imgBack = this.backgroundImages.slice(7, 13);
    }
    if (this.bgCaroucelCount == 3) {
      this.imgBack = this.backgroundImages.slice(13, 19);
    } if (this.bgCaroucelCount == 4) {
      this.imgBack = this.backgroundImages.slice(19, 25);
    }
  }

  prevCarousel1() {
    this.bgCaroucelCount = this.bgCaroucelCount - 1;

    if (this.bgCaroucelCount == 2) {
      this.imgBack = this.backgroundImages.slice(7, 13);
    }
    if (this.bgCaroucelCount == 3) {
      this.imgBack = this.backgroundImages.slice(13, 19);
    }
    if (this.bgCaroucelCount == 4) {
      this.imgBack = this.backgroundImages.slice(19, 25);
    }
    if (this.bgCaroucelCount == 1 || null) {
      this.imgBack = this.backgroundImages.slice(0, 6);
    }
  }
  play() {
    var $this = this; //cache
    (function loop() {
      if (!$this.paused && !$this.ended) {
        // ctx.drawImage($this, 0, 0);
        setTimeout(loop, 1000 / 30); // drawing at 30fps
      }
    })();
  };
  url1 = "";
  onselectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url1 = event.target.result;
        //-------Optional code for displaying videos---------
        // setTimeout(() => {
        var canvas = <HTMLCanvasElement>document.getElementById('Mycanvas');
        var ctx = canvas.getContext("2d");
        var video1E1 = <HTMLImageElement>document.getElementById('video1');

        var video2 = new fabric.Image(video1E1, {
          left: 200,
          top: 300,
          // scaleX: this.canvas.width / this.video1.width,
          // scaleY: this.canvas.height / this.video1.height,
          statefullCache: false,
          originX: 'center',
          originY: 'center',
          objectCaching: false,
          hasControls: true,
        })
        this.canvas.setActiveObject(video2);
        video2.scaleToHeight(200);
        video2.scaleToWidth(200);
        video2.bringToFront();
        this.canvas.add(video2);
        // video2.getElement().play();
        fabric.util.requestAnimFrame(function render() {
          this.canvas.renderAll();
          fabric.util.requestAnimFrame(render);
        });

        // --------------------------------------

        // this.canvas.add(video1)
        // ctx.drawImage(video1E1 ,5,5,100,30)
        // this.canvas.renderAll();
        // }, 2);
        // }
        // }
        //-----------------------------------------------------
        // var c = <HTMLCanvasElement>document.getElementById("Mycanvas");
        // var ctx = c.getContext("2d");
        // var v = <HTMLVideoElement>document.getElementById("video1");
        // var i;

        // var video1 = new fabric.Image(v, {
        //   left: 20,
        //   top: 30,
        //   statefullCache: true,
        //   originX: 'center',
        //   originY: 'center',
        //   objectCaching: false,
        //   hasControls: true,
        // })

        // v.addEventListener("play", function () {
        //   i =
        //     window.setInterval(function () {

        //       ctx.drawImage(v, 190, 420, 200, 120)
        //     }, 20);
        // }, false);
      }
    }
  }
  url = '';
  hidePerson: boolean = false;
  onselectFile3(e) {
    this.service.selectedMainImg = "";
    this.changeStyle = null;
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
        this.removeSelected1();
        fabric.Image.fromURL(this.url, newImg => {
          this.canvas.add(newImg);
          newImg.toCanvasElement;
          newImg.top = 150;
          newImg.left = 135;
          newImg.hasControls = true;
          newImg.hasBorders = true;
          newImg.originX = 'left';
          newImg.originY = 'top';
          newImg.scaleToHeight(250);
          newImg.scaleToWidth(250);
          newImg.sendToBack();
          this.extend(newImg, this.ImgRandomId);
        });
        this.canvas.renderAll();
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
    }

  }

  openDialogue1() {
    this.isvalid = false;
  }

  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      this.respo = res.Details;
      this.respo1 = this.respo[101];
      this.respo2 = this.respo[102];
      this.respo3 = this.respo[103];
      this.respo4 = this.respo[104];
      this.respo5 = this.respo[105];
      this.respo6 = this.respo[106];
      this.respo7 = this.respo[108];
      this.respo8 = this.respo[107];
      this.respo9 = this.respo[109];
      this.respo10 = this.respo[169];
      this.respo11 = this.respo[94];
      this.respo12 = this.respo[95];
      this.respo13 = this.respo[96];
      this.respo14 = this.respo[261];
      this.respo15 = this.respo[261];
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

  checkIfGif(url: string){
    return url.split(".").pop() === "gif";
  }

  onParentClick(event: MouseEvent) {
    if (event.target instanceof HTMLImageElement) {
      // Access the child image information using event.target
      console.log((event.target as HTMLImageElement).src); // Example usage

      this.gifLoaderService.loadGifFromUrl((event.target as HTMLImageElement).src).subscribe(async (gif) => {
        const gif1 = await fabricGif(
          gif
        );
        gif1.set({ left: Math.floor(Math.random() * (this.canvas.width - 50)),
          top: Math.floor(Math.random() * (this.canvas.height - 50)),});
        this.canvas.add(gif1);
  
        let render = () => {
          this.canvas.renderAll();
          fabric.util.requestAnimFrame(render);
        }
        fabric.util.requestAnimFrame(render);
  
      })

    }
  }

  postGrabId() {
    var jsonData = this.recentService.userGrabIdData;
    var formdata = new FormData();
    formdata.append('grab_id', jsonData);
    this.editCanvas.fetchJson(formdata).subscribe((Response: any) => {
      this.editCanvas.lovedPersonData = Response;
      if (Response) {
        var jsonData1 = Response.Details[0].canvas_json;
        this.canvas.loadFromJSON(jsonData1, () => {
          this.canvas.renderAll();
        })
      }
    })
  }
  // Save json from edit memorial
  saveEditMemorial() {
    this.spiner.show();
    var userId = this.loginservice.loginAllData;
    var grabId = this.recentService.userGrabIdData;
    var json = JSON.stringify(this.canvas);
    // For preview Image
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = this.canvas.toDataURL({ format: 'png' });
    this.service.saveCanvas = image.src;
    var test = this.service.saveCanvas;
    const formData = new FormData();
    formData.append('grab_id', grabId);
    formData.append('image', 'Image');
    formData.append('image_type_id', '7');
    formData.append('x', '100');
    formData.append('y', '120');
    formData.append('height', '200');
    formData.append('width', '300');
    formData.append('user_id', userId);
    formData.append('canvas_json', json);
    formData.append('canvas_preview_base64', test);
    this.service.memCreateImageData(formData).subscribe((result: any) => {
      this.spiner.hide();
      if (result.status == "success") {
        this.snackBar('Your memory has been successfully updated', 'alert-green');
        setTimeout(() => {
          this.router.navigate(['/user-account']);
        }, 2500);
      }
    })
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
}
function movingRotatingWithinBounds(e: fabric.IEvent) {
  const obj = e.target;
  // if object is too big ignore
  if (obj.height == obj.canvas.height || obj.width == obj.canvas.width) {
    return;
  }
  obj.setCoords();
  // top-left  corner
  if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
    obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
    obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
  }
  // bot-right corner
  if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
    obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
    obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
  }
}
var left1 = 0;
var top1 = 0;
var scale1x = 0;
var scale1y = 0;
var width1 = 0;
var height1 = 0;

function scalling(e: fabric.IEvent) {
  var obj = e.target;
  obj.setCoords();
  var brNew = obj.getBoundingRect();

  if (((brNew.width + brNew.left) >= obj.canvas.width) || ((brNew.height + brNew.top) >= obj.canvas.height) || ((brNew.left < 0) || (brNew.top < 0))) {
    obj.left = left1;
    obj.top = top1;
    obj.scaleX = scale1x;
    obj.scaleY = scale1y;
    obj.width = width1;
    obj.height = height1;
  }
  else {
    left1 = obj.left;
    top1 = obj.top;
    scale1x = obj.scaleX;
    scale1y = obj.scaleY;
    width1 = obj.width;
    height1 = obj.height;
  }
}
