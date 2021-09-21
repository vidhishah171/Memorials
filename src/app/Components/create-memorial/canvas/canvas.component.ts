import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Canvas, Control } from 'fabric/fabric-impl';
import { DomSanitizer } from '@angular/platform-browser';

import { CreateMemorialService } from 'src/services/create-memorial.service';
import { trace } from 'console';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})


export class CanvasComponent implements OnInit,OnDestroy {
  


  newCanddleImages = [];
  canddleCaroucelCount: number = 1;
  canddleImages = [];
  URNSImages = [];
  flowerImages = [];
  flowerCaroucelCount: number = 1;
  newFlowerImages = [];
  backgroundImages = [];
   canvas:  fabric.Canvas;
  // canvas:any;
  showMenuItems: Number = 1;
  showSubMenItem: Number = 1;
  ctx: any;
  newText: any;
  myVideoUrl: any;
  dataURL:any;
  src:any;
  canvasImg: any;
  canvasURL: any;
  imgUrl:any;
  video1:any;
  fill:null;


  constructor(private service: CreateMemorialService,private _sanitizer: DomSanitizer) { }
 


  ngOnDestroy(){
        const image=new Image();
        image.crossOrigin="anonymous";
        image.src= this.canvas.toDataURL({format: 'png'});
        this.service.saveCanvas=image.src;
        this.saveCanvasToJSON();
  }


  ngOnInit(): void {
    this.getCanddleImages();
    this.getURNSImages();
    this.getFlowerImages();
    this.getbackgImages();
    this.canvasadd();
    this.loadCanvasFromJSON();

  }
  public textString: string;
  public selected:any;
  
  canvasadd() {
    this.canvas = new fabric.Canvas('Mycanvas');
    
    fabric.Image.fromURL(this.service.selectedMainImg || this.service.selectedMain, newImg => {
      // this.service.selectedMainImg || this.service.selectedMain
      this.canvas.add(newImg);
      newImg.toCanvasElement;
      newImg.top = 70;
      newImg.left = 20;
      newImg.originX = 'left';
      newImg.originY = 'top';
      newImg.scaleToHeight(300);
      newImg.scaleToWidth(300);
      
      // newImg.opacity = 0.8;
      // newImg.bringToFront();
      // var ctx=canvas.getContext('2d');
      //  var videoContainer;
    });
  }
  
  saveCanvasToJSON(){
      const json=JSON.stringify(this.canvas);
      // localStorage.setItem('Kanvas',json);
      // console.log(json);
      this.service.saveCanvas1=json;
    }

    loadCanvasFromJSON(){
      // const CANVAS=localStorage.getItem('Kanvas');
      const CANVAS=this.service.saveCanvas1;

      // and load everything from the same json
      this.canvas.loadFromJSON(CANVAS, ()=>{

        // making sure to render canvas at the end
        this.canvas.renderAll();
      })
    }
      
    removeSelected() {
      debugger;
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


    

  //------------------------------

  DropImageToCan(dragImage: any) {
    this.addImageToCanvas(dragImage);
  }
  addImageToCanvas(decImages: any) {
   
    fabric.Image.fromURL(decImages.path, (newImg) => {
      // decImages.path
      // 'http://localhost:4200/assets/StaticAssets/ganesh-3692779_1920.jpg'
      this.canvas.add(newImg);    
      newImg.toCanvasElement;
      newImg.originX = 'center';
      newImg.originY = 'center';
      newImg.hasControls = true;
      newImg.bringToFront();
    },
      {
        left: 220,
        top: 300

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
    if (this.textString) {
      const text = new fabric.IText(this.textString, {
        left: 100,
        top: 20,
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#000000',
        scaleX: 0.5,
        scaleY: 0.5,
        fontWeight: '',
        hasRotatingPoint: true
      });

      this.extend(text, this.randomId());
      this.canvas.add(text);
      this.selectItemAfterAdded(text);
      this.textString = '';
    }
  }


  

   extend(obj, id) {
     obj.toObject = ((toObject) => {
       return function() {
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


            //Code for add color picker




   getFill(){
    this.fill = this.getActiveStyle('fill', null);
   }
   setFill(){
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
          object.setSelectionStyles({underline: true});
        } else {
          object.setSelectionStyles({underline: false});
        }

        if (value.includes('overline')) {
          object.setSelectionStyles({overline: true});
        } else {
          object.setSelectionStyles({overline: false});
        }

        if (value.includes('line-through')) {
          object.setSelectionStyles({linethrough: true});
        } else {
          object.setSelectionStyles({linethrough: false});
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
    this.canvas.setBackgroundImage(backImage.path, this.canvas.renderAll.bind(this.canvas));
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


  nextFlowers() {
    this.flowerCaroucelCount++;

    if (this.flowerCaroucelCount == 2) {
      this.newFlowerImages = this.flowerImages.slice(10, 20);

    }
    if (this.flowerCaroucelCount == 3) {
      this.newFlowerImages = this.flowerImages.slice(20, 30);

    }
    if (this.flowerCaroucelCount == 4) {
      this.newFlowerImages = this.flowerImages.slice(30, 40);

    }
    if (this.flowerCaroucelCount == 5) {
      this.newFlowerImages = this.flowerImages.slice(40, 50);

    }
    if (this.flowerCaroucelCount == 6) {
      this.newFlowerImages = this.flowerImages.slice(50, 60);

    }
    if (this.flowerCaroucelCount == 7) {
      this.newFlowerImages = this.flowerImages.slice(60, 70);

    }
    if (this.flowerCaroucelCount == 8) {
      this.newFlowerImages = this.flowerImages.slice(70, 80);

    }
    if (this.flowerCaroucelCount >= 8) {
      this.newFlowerImages = this.flowerImages.slice(70, 80);

    }

  }


  prevFlower() {
    this.flowerCaroucelCount--;
    if (this.flowerCaroucelCount <= 1) {
      this.newFlowerImages = this.flowerImages.slice(0, 10);

    }
    if (this.flowerCaroucelCount == 2) {
      this.newFlowerImages = this.flowerImages.slice(10, 20);

    }
    if (this.flowerCaroucelCount == 3) {
      this.newFlowerImages = this.flowerImages.slice(20, 30);

    }
    if (this.flowerCaroucelCount == 4) {
      this.newFlowerImages = this.flowerImages.slice(30, 40);

    }
    if (this.flowerCaroucelCount == 5) {
      this.newFlowerImages = this.flowerImages.slice(40, 50);

    }
    if (this.flowerCaroucelCount == 6) {
      this.newFlowerImages = this.flowerImages.slice(50, 60);

    }
    if (this.flowerCaroucelCount == 7) {
      this.newFlowerImages = this.flowerImages.slice(60, 70);

    }
    if (this.flowerCaroucelCount == 8) {
      this.newFlowerImages = this.flowerImages.slice(70, 80);

    }
  }



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

  url = "";
  onselectFile(e: any) {
     
     if (e.target.files) {
       var reader = new FileReader();
       reader.readAsDataURL(e.target.files[0]);
       reader.onload = (event: any) => {
         this.url = event.target.result;
         // this.service.selectedMain=this.url;

        //-------Optional code for displaying videos---------

  //       // setTimeout(() => {
  //        
    //       var canvas =<HTMLCanvasElement> document.getElementById('Mycanvas');
    //       var ctx= canvas.getContext("2d");
    //       var video1E1 = <HTMLImageElement> document.getElementById('video1');

    //       var video1  = new fabric.Image(video1E1, {
    //         left: 200,
    //         top: 300,
    //         statefullCache: true,
    //         originX: 'center',
    //         originY: 'center',
    //         objectCaching: false,
    //         hasControls:false,
            
    //       })


    //       video1.bringToFront();
    //       this.canvas.add(video1);
    //       // this.canvas.add(video1)
    //         // ctx.drawImage(video1E1 ,5,5,100,30)
    //       // video1.getElement().play();

    //       // fabric.util.requestAnimFrame(function render() {
    //       //   canvas.renderAll();

    //       //   fabric.util.requestAnimFrame(render);
    //       // });


    //     // }, 2);

    //   }
    // }



  //-----------------------------------------------------


   var c= <HTMLCanvasElement> document.getElementById("Mycanvas");
   var ctx=c.getContext("2d");
   var v= <HTMLImageElement> document.getElementById("video1");
     var i;

     var video1 = new fabric.Image(v,{
             left: 20,
             top: 30,
             statefullCache: true,
             originX: 'center',
             originY: 'center',
             objectCaching: false,
             hasControls:true,
           })
          
           v.addEventListener("play",function(){i=
             window.setInterval(function(){
               
               ctx.drawImage(v,260,360,230,130)
              
              
             },20);
           },false);

         }
       }

    }
}

