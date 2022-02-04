import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { MostVisitedService } from '../../../services/most-visited.service';


@Component({
  selector: 'app-most-visited',
  templateUrl: './most-visited.component.html',
  styleUrls: ['./most-visited.component.css']
})
export class MostVisitedComponent implements OnInit {

  mostVisitMemorial:any;
  showNewDiv: number;
  isvalid: boolean;
  respo1: any;
  respo: any;
  respo2: any;

  constructor(
    private service : MostVisitedService,
    public editservice: AdminEditService,
    public loginservice:LoginService,
    private recentService : RecentMeorialsService,
    private router: Router,


  ) { }

  ngOnInit(): void {
    this.getData();
    this.editData();

  }

  getData(){
    this.service.getMostVisMemorial().subscribe(
      (memorials:any)=>{
        
        this.mostVisitMemorial = memorials.Memorials;
        
      },
      errors=>{
        console.log(errors);
        
      }
    )}


    // Code for labels

    openDialogue(num): void{
     
     if(num==1){
       this.showNewDiv=1;
       this.isvalid=true;
     }else if(num==2){
       this.showNewDiv=2;
       this.isvalid=true;
     }
    }
  
    openDialogue1(){
      this.isvalid=false;
    }
  
    editData(){
      this.editservice.adminEdit().subscribe((res:any)=>{
        console.log(res);
        this.respo=res.Details;
        this.respo1=this.respo[19]
        this.respo2=this.respo[20]
  
    
      });
    }
  
  
    postEditData(editDataNew:any){
      var formdata=new FormData();
      formdata.append('id',editDataNew.value.id);
      formdata.append('en',editDataNew.value.en);
      formdata.append('de',editDataNew.value.de);
      formdata.append('fr',editDataNew.value.fr);
    
      this.editservice.editPostData(formdata).subscribe(response=>{
        console.log(response);
      })
    }
  
    // For Visitor mode page
    recentMemorialGrabId(data){
      debugger
      console.log(data);
  
      if(data){
        this.recentService.userGrabIdData=data;
        this.router.navigate(['/visitor-mode']);
      }
    }
  

}
