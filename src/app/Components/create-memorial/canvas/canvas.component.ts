import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Canvas, Control } from 'fabric/fabric-impl';
import { DomSanitizer } from '@angular/platform-browser';

import { CreateMemorialService } from 'src/services/create-memorial.service';
import { debug, trace } from 'console';
import { animate, style } from '@angular/animations';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})


export class CanvasComponent implements OnInit, OnDestroy {

data:any = {};
  ImgRandomId =0;
  newCanddleImages = [];
  canddleCaroucelCount: number = 1;
  canddleImages = [];
  URNSImages = [];
  flowerImages = [];
  flowerCaroucelCount: number = 1;
  newFlowerImages = [];
  backgroundImages = [];
  canvas: fabric.Canvas;
  canvas1:fabric.Canvas;
  // canvas:any;
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
  // video1: any;
  public fill = '#000000';
  
  public selected:any;

  removeId: any;

  showTambstone: boolean = true;
  imagespath = [];
  caroucelCount: number = 1;
  imagesForCaroucel = [];

  changeStyle: string;
  cornerSize: any;
  fontWeight: any;
  fontStyle: any;
  TextDecoration: '';
  textAlign:any;
  Rate: any;
  p: any;
  paused: any;
  ended: any;
  context: CanvasRenderingContext2D;




  constructor(public service: CreateMemorialService, private _sanitizer: DomSanitizer) { }



  ngOnDestroy() {
    debugger
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = this.canvas.toDataURL({ format: 'png' });
    this.service.saveCanvas = image.src;
    this.saveCanvasToJSON();
    const newLocal = this;
    this.service.saveVitaText=this.service.vita.textString1;
    this.service.vita.textString1;
  }


  ngOnInit(): void {
    this.getCanddleImages();
    this.getURNSImages();
    this.getFlowerImages();
    this.getbackgImages();
    this.canvasadd();
    this.loadCanvasFromJSON();
    this.getTambImage();

    // this.service.vita.textString1;

    
  }
  public textString: string;
  public textString1:string;


  // public selected: any;



  canvasadd() {
    this.canvas = new fabric.Canvas('Mycanvas');
    
    
    this.removeSelected1();
    fabric.Image.fromURL(this.service.selectedMainImg, newImg => {
      // this.service.selectedMainImg || this.service.selectedMain
      this.canvas.add(newImg);
      newImg.toCanvasElement;
      newImg.top = 80;
      newImg.left = 60;
     
      newImg.originX = 'left';
      newImg.originY = 'top';
      newImg.scaleToHeight(300);
      newImg.scaleToWidth(300);

  // this.removeSelected1();

  
      this.extend(newImg, this.ImgRandomId);

      // alert("created random id is:-"+this.service.ImgRandomId);
   

      // this.canvas.setActiveObject(newImg);
    });
    this.canvas.renderAll();

    
    this.canvas.on('object:moving', function (e) {
      movingRotatingWithinBounds(e);
    });

    this.canvas.on('object:scaling',function(e){
      scalling(e);
    })
    

  

    


    //Delete object

 
    var Obj= new fabric.Control({

      render: this.renderIcon,
      x: 0.5,
      y: -0.5,
      offsetY: 16,
      cursorStyle: 'pointer',
      
      mouseUpHandler:this.deleteObject,
      // cornerSize:30
  });

  Obj['cornerSize']=36;
  fabric.Object.prototype.controls.deleteControl  =Obj;
  }

  deleteObject(eventData, transform):boolean {
    var target = transform.target;
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
    return true;
    
  }
  renderIcon(ctx, left, top, styleOverride, fabricObject):boolean {
    // var deleteIcon="../../../../assets/StaticAssets/trash 3.svg";
    var deleteIcon="../../../../assets/StaticAssets/Flat_cross_icon.svg.png";
    var img = document.createElement('img');
    img.src = deleteIcon;


    var size = this.cornerSize;
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img,-size/2, -size/2, size/2, size/2);
    ctx.restore();
    ctx.save();
    return true;
  }


  saveCanvasToJSON() {
    const json = JSON.stringify(this.canvas);
    // localStorage.setItem('Kanvas',json);
    // console.log(json);
    this.service.saveCanvas1 = json;
  }

  loadCanvasFromJSON() {
    // const CANVAS=localStorage.getItem('Kanvas');
    const CANVAS = this.service.saveCanvas1;

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {

      // making sure to render canvas at the end
      this.canvas.renderAll();
    })
  }

  

  removeSelected() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();
    
    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      const self = this;
      activeGroup.forEach((object) => {
        self.canvas.remove(object);
      });
    }
  }

  removeSelected1() {
    debugger;
    var activeObject = this.canvas.getObjects();

    // alert("created random id is:-"+this.service.ImgRandomId);

    activeObject.forEach(element => {
      if (element.toObject().id == this.ImgRandomId) {
        this.canvas.remove(element);
        // alert("remove id:-"+this.service.ImgRandomId);
      }
    });

  }




  
  //------------------------------
  DropImageToCan(dragImage: any) {
    
    this.addImageToCanvas(dragImage);
  }
  addImageToCanvas(decImages: any) {

    debugger

    // let self = this;
    // fabric.util.requestAnimFrame(function render() {
    //   self.canvas.renderAll();
    //   fabric.util.requestAnimFrame(render);
    // });
    

    fabric.Image.fromURL(decImages.path, (newImg) => {
      // decImages.path
      // 'http://localhost:4200/assets/StaticAssets/ganesh-3692779_1920.jpg'

      this.canvas.add(newImg);
      let self = this;
      
      newImg.toCanvasElement;
      newImg.originX = 'center';
      newImg.originY = 'center';
      newImg.hasControls = true;
      newImg.bringToFront();
      // newImg.scaleToHeight(300);
      // newImg.scaleToWidth(300);
      this.canvas.setActiveObject(newImg); 
      
   
    },
      {
        // left: 180,
        // top: 280
        
        left: Math.floor(Math.random() * (this.canvas.width - 50)),
        top: Math.floor(Math.random() * (this.canvas.height - 50)),
      })
  }

  addImageToCanvas1(decImages1: any) {
    debugger;
    this.removeSelected1();
    
    fabric.Image.fromURL(decImages1.path, (newImg1) => {
      // decImages.path
      // 'http://localhost:4200/assets/StaticAssets/ganesh-3692779_1920.jpg'
      this.canvas.add(newImg1);
      newImg1.toCanvasElement;
      newImg1.originX = 'center';
      newImg1.originY = 'center';
      newImg1.hasControls = true;
      //  newImg1.bringToFront();
      newImg1.scaleToHeight(300);
      newImg1.scaleToWidth(300);
      newImg1.sendToBack();

    //  this.removeSelected1();
      this.ImgRandomId = this.randomId();

      this.extend(newImg1, this.ImgRandomId);

    },
      {
        left: 210,
        top: 280
      })
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

  startImgDrag(event) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData("decImage", event.target.getAttribute("src"));
    return true;

  };

  addText() {
    debugger;
    if (this.textString) {
      // this.canvas1=new fabric.Canvas("Mycanvas");
      // this.context=this.canvas.getContext();
      const text = new fabric.IText(this.textString, {
        // left: 100,
        // top: 20,
        left: Math.floor(Math.random() * (this.canvas.width - 50)),
        top: Math.floor(Math.random() * (this.canvas.height - 50)),
        fontFamily: 'helvetica',
        angle: 0,
        fill: this.fill,
        scaleX: 0.4,
        scaleY: 0.4,
        fontWeight: '',
        hasRotatingPoint: true,
        // textAlign:this.textAlign,
      });
      
      // this.context.textAlign='center';

      

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
    debugger;
    this.textAlign = value;
    this.setActiveProp('textAlign', this.textAlign);
  }
  

  getActiveProp(name) {
    const object = this.canvas.getActiveObject();
    if (!object) { return ''; }

    return object[name] || '';
  }

  setActiveProp(name, value) {
    debugger
    const object = this.canvas.getActiveObject();
    if (!object) { return; }
    object.set(name, value);
    object.setCoords();
    this.canvas.renderAll();
  }




  // setTextDecoration(value) {
  //   let iclass = this.TextDecoration;
  //   if (iclass.includes(value)) {
  //     iclass = iclass.replace(RegExp(value, 'g'), '');
  //   // } else {
  //     iclass += ` ${value}`;
  //   }
  //   this.TextDecoration = iclass;
  //   this.setActiveStyle('textDecoration', this.TextDecoration, null);
  // }
  // hasTextDecoration(value) {
  //   return this.TextDecoration.includes(value);
  // }

  //Code for add color picker




  getFill() {
    this.fill = this.getActiveStyle('fill', null);
  }
  setFill() {
    debugger
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
    // this.canvas.setBackgroundImage(backImage.path, this.canvas.renderAll.bind(this.canvas));

    fabric.Image.fromURL(backImage.path,(img)=>{
      img.set({
        scaleX: this.canvas.width / img.width,
        scaleY: this.canvas.height / img.height
      });
      this.canvas.setBackgroundImage(img,this.canvas.renderAll.bind(this.canvas));
    });
    this.canvas.renderAll();
  }
  

  //---------------------




  getCanddleImages() {
    this.service.getCanddleImages(2)
      .subscribe(
        (cImages: any) => {
          this.newCanddleImages = cImages.images;

          if (this.canddleCaroucelCount == 1) {
            this.canddleImages = this.newCanddleImages.slice(0, 24);
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
      this.canddleImages = this.newCanddleImages.slice(24, 37);
    }
  }

  prevCanddle() {
    this.canddleCaroucelCount--;
    if (this.canddleCaroucelCount <= 1) {
      this.canddleImages = this.newCanddleImages.slice(0, 24);
    }
  }


  getURNSImages() {
    this.service.getURNSImages(5)
      .subscribe(
        (URImages: any) => {
          this.URNSImages = URImages.images;
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
          this.flowerImages = flowerImages.images;
          if (this.flowerCaroucelCount == 1) {
            this.newFlowerImages = this.flowerImages.slice(0, 10);

          }
        },
        (error: any) => {
          console.log(error);

        }
      )
  }

  //show tombstone
  showCentric() {
    this.showTambstone = true;
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

    //new

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

    //new

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

  // addVita(redata:any){
  //   debugger;
  //   console.log(redata);
  //   this.service.createvitaMemorial(6,this.textString1).subscribe(resp=>{

  //   })
  // }



  getbackgImages() {
    this.service.getBackgImages(4)
      .subscribe(
        (backImages: any) => {
          this.backgroundImages = backImages.images;

        },
        error => {
          console.log(error);


        }
      )
  }


   play(){
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

    debugger;
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url1 = event.target.result;
        // this.service.selectedMain=this.url;

        //-------Optional code for displaying videos---------

              // setTimeout(() => {
        
                debugger;
              var canvas =<HTMLCanvasElement> document.getElementById('Mycanvas');
              var ctx= canvas.getContext("2d");
              var video1E1 =<HTMLImageElement> document.getElementById('video1');

              var video2  = new fabric.Image(video1E1, {
                left: 200,
                top: 300,
                // scaleX: this.canvas.width / this.video1.width,
                // scaleY: this.canvas.height / this.video1.height,
                statefullCache: false,
                originX: 'center',
                originY: 'center',
                objectCaching: false,
                hasControls:true,
                

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
    var top1 = 0 ;
    var scale1x = 0 ;    
    var scale1y = 0 ;    
    var width1 = 0 ;    
    var height1 = 0 ;


function scalling(e:fabric.IEvent){
  var obj = e.target;
    obj.setCoords();
    var brNew = obj.getBoundingRect();
    
    if (((brNew.width+brNew.left)>=obj.canvas.width) || ((brNew.height+brNew.top)>=obj.canvas.height) || ((brNew.left<0) || (brNew.top<0))) {
    obj.left = left1;
    obj.top=top1;
    obj.scaleX=scale1x;
    obj.scaleY=scale1y;
    obj.width=width1;
    obj.height=height1;
  }
    else{    
      left1 =obj.left;
      top1 =obj.top;
      scale1x = obj.scaleX;
      scale1y=obj.scaleY;
      width1=obj.width;
      height1=obj.height;
    }
}

 
