import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Employee} from './employee';
import {EmployeeService} from './employee.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees:Employee[];
  public editEmployee:Employee;
  public deleteEmployee:Employee;
  constructor(private employeeService:EmployeeService) { 
   // public employees:Employee[];
  }
  ngOnInit() {
this.getEmployee();
  }
  public getEmployee():void{
    this.employeeService.getEmployee().subscribe(
      (res:Employee[])=>{
        this.employees=res;
      },(error:HttpErrorResponse)=>{
        alert(error.message)
      })
  }

  openModal(employee:Employee,mode:string):void{
    const container=document.getElementById('main-container')
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(mode==='edit'){
      this.editEmployee=employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode==='delete'){
      this.deleteEmployee=employee;
      console.log("Delete Employee",this.deleteEmployee);
      
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }
  onAddEmployee(addForm:NgForm):void{
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe((res:Employee)=>
    {
      console.log(res);
      this.getEmployee();
      addForm.reset();
      
    },(error:HttpErrorResponse)=>
    {
      alert(error.message);
      addForm.reset();
    })
  }
  onEditEmployee(employee:Employee):void{
    document.getElementById('editEmp').click();
    this.employeeService.updateEmployee(employee).subscribe((res:Employee)=>
    {
      console.log(res);
      this.getEmployee();
      
    },(error:HttpErrorResponse)=>
    {
      alert(error.message)
    })
  }

  onDeleteEmployee(employeeId:number){
    //document.getElementById('editEmp').click();

    this.employeeService.deleteEmployee(employeeId).subscribe((res:void)=>
    {
      console.log(res);
      this.getEmployee();
      
    },(error:HttpErrorResponse)=>
    {
      alert(error.message)
    })
  }

  search(event){
    console.log(event.target.value);
    
  }

}
