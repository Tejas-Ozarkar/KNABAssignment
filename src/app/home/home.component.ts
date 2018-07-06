import { SubjectService } from './../subject.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  newSubject: any = {
    id: '',
    name: '',
    teacher: '',
    duration: '',
    semester: ''
  }

  user: any = {
    id: '',
    name: '',
    email: '',
    imageUrl: ''
  }

  selectedSubject: any = {
    '_id': '',
    name: '',
    teacher: '',
    duration: '',
    semester: ''
  }

  subjects: any[];
  showAddSubjectModal: boolean;
  showEditSubjectModal: boolean;


  constructor(private __subjectService: SubjectService) {
    this.user.id = localStorage.getItem('id');
    this.user.name = localStorage.getItem('name');
    this.user.email = localStorage.getItem('email');
    this.user.imageUrl = localStorage.getItem('imageUrl');
   }

  ngOnInit() {
    this.getSubjects();
   
    
  }

  addSubject(){
    console.log('adding new subject');
    console.log(this.newSubject);
    this.__subjectService.addSubject(this.newSubject)
      .subscribe(resp=>{
        console.log(resp);
        this.showAddSubject();
        this.newSubject={};
        this.subjects=null;
        this.getSubjects();
      },err => {
        console.log(err);
      })
  }

  getSubjects(){
    this.__subjectService.getSubjects()
      .subscribe(resp=>{
        console.log(resp);
        this.subjects = resp.data;
      },err=>{
        console.log(err);
      })
  }

  showAddSubject(){
    this.showAddSubjectModal==true?this.showAddSubjectModal=false:this.showAddSubjectModal=true;
  }

  editModal(subject){
    console.log(subject)
    if(subject){
      // this.selectedSubject= Object.create(subject);
      this.selectedSubject._id=subject._id;
      this.selectedSubject.name=subject.name;
      this.selectedSubject.teacher=subject.teacher;
      this.selectedSubject.duration=subject.duration;
      this.selectedSubject.semester=subject.semester;
    }
    

  
    this.showEditSubjectModal==true?this.showEditSubjectModal=false:this.showEditSubjectModal=true;
  }

  deleteSubject(){
    this.__subjectService.deleteSubject(this.selectedSubject._id)
    .subscribe(resp=>{
      console.log(resp);
      this.editModal(null);
      // this.selectedSubject={};
      this.subjects=null;
        this.getSubjects();
    },err=>{
      console.log(err);
    })
  }

  editSubject(){
    console.log(this.selectedSubject);
    this.__subjectService.editSubject(this.selectedSubject)
      .subscribe(resp=>{
        console.log(resp);
        this.editModal(null);
        // this.selectedSubject={};
        this.subjects=null;
        this.getSubjects();
      },err=>{
        console.log(err);
      })
  }
}
