import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Canvas, Control } from 'fabric/fabric-impl';
import { DomSanitizer } from '@angular/platform-browser';

import { CreateMemorialService } from 'src/services/create-memorial.service';
import { debug, trace } from 'console';
import { style } from '@angular/animations';

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
  public fill:'#000000';

  showTambstone: boolean = true;
  imagespath = [];
  caroucelCount: number = 1;
  imagesForCaroucel = [];

  changeStyle: string;


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
    this.getTambImage();

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


  // canvasObjectDelete(){
  //   var canvas = new fabric.Canvas('Mycanvas');
	// // create a rect object
  // var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  // var img = document.createElement('img');
  // img.src = deleteIcon;

  
  

  // fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  //   x: 0.5,
  //   y: -0.5,
  //   offsetY: 16,
  //   cursorStyle: 'pointer',
  //   mouseUpHandler: deleteObject,
  //   render: renderIcon,
  //   cornerSize: 24
  // });

  // // Add();

  // function deleteObject(eventData:MouseEvent, transform:fabric.Transform,x:10,y:10) {
	// 	var target = transform.target;
	// 	var canvas = target.canvas;
	// 	    canvas.remove(target);
  //       canvas.requestRenderAll();
	// }

  // function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  //   var size = this.cornerSize;
  //   ctx.save();
  //   ctx.translate(left, top);
  //   ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  //   ctx.drawImage(img, -size/2, -size/2, size, size);
  //   ctx.restore();
  // }

  // }


  
  
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
   
    // removeSelected1() {
    //   debugger;
    //   var object=this.canvas
    //     this.canvas.remove(object);
    //     // this.textString = '';
    // }
  
    kl:any;

    

  //------------------------------

  DropImageToCan(dragImage: any) {
    this.addImageToCanvas(dragImage);
  }
  addImageToCanvas(decImages: any) {
   debugger
    fabric.Image.fromURL(decImages.path, (newImg) => {
      // decImages.path
      // 'http://localhost:4200/assets/StaticAssets/ganesh-3692779_1920.jpg'
      this.canvas.add(newImg);    
      newImg.toCanvasElement;
      newImg.originX = 'center';
      newImg.originY = 'center';
      newImg.hasControls = true;
      newImg.bringToFront();
      // newImg.scaleToHeight(300);
      // newImg.scaleToWidth(300);
    },
      {
        left: 180,
        top: 280

      })
  }

  addImageToCanvas1(decImages1: any) {
    debugger
     fabric.Image.fromURL(decImages1.path, (newImg1) => {
       // decImages.path
       // 'http://localhost:4200/assets/StaticAssets/ganesh-3692779_1920.jpg'
      //  this.removeSelected();
      //  this.canvas.add(newImg1);    
       newImg1.toCanvasElement;
       newImg1.originX = 'center';
       newImg1.originY = 'center';
       newImg1.hasControls = true;
      //  newImg1.bringToFront();
       newImg1.sendToBack();
       newImg1.scaleToHeight(300);
       newImg1.scaleToWidth(300);
      this.extend(newImg1,this.randomId());
      // var kl=this.randomId();
      // this.canvas.remove(kl);
      
      this.removeSelected();
      this.canvas.add(newImg1);    

     },
       {
         left: 175,
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
    debugger;
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
    debugger
    if (this.textString) {
      const text = new fabric.IText(this.textString, {
        left: 100,
        top: 20,
        fontFamily: 'helvetica',
        angle: 0,
        fill: this.fill,
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

  //show tombstone
  showCentric() {
    debugger;
      this.showTambstone = true;
    }

    checked(data) {
      debugger
      this.changeStyle = undefined;
      this.changeStyle = data;
      this.service.selectedMainImg = data;
    }

    getTambImage() {
debugger
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



