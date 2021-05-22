import { Component, OnInit } from '@angular/core';
import { Patient } from '../../Patient';
import { Prescription } from '../../Patient';
import { PatientService } from '../../Patient.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Status:any[];
  PatientDialog: boolean;
  PatientUpdateDialog: boolean;
  PrescriptionDialog: boolean;
  Sex:any[];
  Patients: Patient[];
  prescription:Prescription;
  Patient: Patient;
  selectedPatients: Patient[];
  uploadedFiles: any[] = [];
  submitted: boolean;
  submittedPrescription:boolean;
  viewPrescription:boolean;
  patientPrescription:Patient;
  constructor(private route:Router,private auth:AuthService,private patientService: PatientService, private messageService: MessageService, private confirmationService: ConfirmationService) { 
    if(!this.auth.isAuthenticated) {
      this.route.navigate(['/']);
    }
    this.Status = ['INPROGRESS', 'COMPLETE'];
    this.Sex=[
        'Male',
        'Female',
        'Others'
        ];
  }

  ngOnInit() { 
    if(!this.auth.isAuthenticated) {
      this.route.navigate(['/']);
    }
      this.patientService.getPatients().subscribe(data => {
        debugger;
        this.Patients = data.map(e => {
          return {
            Id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Patient;
      });
    });
  }

  openNew() {
      this.Patient = {} as Patient;
      this.submitted = false;
      this.PatientDialog = true;
  }

  hideDialog() {
      this.PatientDialog = false;
      this.submitted = false;
  }
  openUpdatePatientDialogue(patient:Patient) {
    this.Patient = patient;
    this.submitted = false;
    this.PatientUpdateDialog = true;
}
  hideupdateDialog(){
    this.PatientUpdateDialog = false;
    this.submitted = false;
  }
  savePatient() {
          this.submitted = true;
          this.Patient.IsActive=true;
          this.Patient.Date= new Date();
          this.Patient.PatientId= this.createId(this.Patient);
          if(!this.Patient.Status){
            this.Patient.Status= this.Status[0];
          }
          if(!this.Patient.Sex){
            this.Patient.Sex=this.Sex[0];
          }

          this.patientService.savePatients(this.Patient).then(res => {
            this.ngOnInit();
          });
          this.PatientDialog = false;
          this.Patient = {} as Patient;
          this.hideDialog();
  }
  updatePatient() {
    this.submitted = true;
    this.Patient.IsActive=true;
    this.Patient.Date= new Date();
    if(!this.Patient.Status){
      this.Patient.Status= this.Status[0];
    }
    if(!this.Patient.Sex){
      this.Patient.Sex=this.Sex[0];
    }

    this.patientService.savePatientPrescription(this.Patient).then(res => {
      this.ngOnInit();
    });
    this.PatientUpdateDialog = false;
    this.Patient = {} as Patient;
    this.hideupdateDialog();
}
  ViewPrescription(patient:Patient){
    this.patientPrescription = patient;
    this.viewPrescription=true;
  }
  AddPrescription(patient:Patient){
    this.Patient=patient;
    this.prescription = {} as Prescription;
    this.submittedPrescription = false;
    this.PrescriptionDialog = true;
  }
  hidePrescription() {
      this.PrescriptionDialog = false;
      this.submittedPrescription = false;
  }
  hideViewPrescription() {
    this.viewPrescription = false;
}
  accept:any = {
    binary : ["image/png", "image/jpeg"],
    text   : ["text/plain", "text/css", "application/xml", "text/html"]
  };
  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
   
  savePrescription(){
    this.submittedPrescription = true;
    this.prescription.IsActive=true;
    this.prescription.Date= new Date();
    this.Patient.Prescriptions.push(this.prescription);

    this.patientService.savePatientPrescription(this.Patient).then(res => {
      this.ngOnInit();
    });
    this.PrescriptionDialog = false;
    this.hidePrescription();
  }
  deletePatient(Id:any){
    this.patientService.deletePatient(Id).then(res => {
      this.ngOnInit();
    });
  }
  generatePDF() {
    const filename = 'test.pdf';

    html2canvas(document.querySelector('#print-section')).then(canvas => {
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0.5, 0.5, 210, 297);
      pdf.save(filename);
    });
  }
  confirm(patient:Patient) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this Patient?', 
        accept: () => {
          this.deletePatient(patient.Id);
        }
    });
  }
  createId(patient:Patient){
     return 'AA'+Date.now().toString();
  }

}
