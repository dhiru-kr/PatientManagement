import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient, Prescription } from './Patient';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
    constructor(private http: HttpClient,private firestore: AngularFirestore) { }

    getPatients() :Observable<any[]>{
        return this.firestore.collection('patients').snapshotChanges();
    }

    savePatients(patient:Patient){
        return new Promise<any>((resolve, reject) => {
            this.firestore
              .collection("patients")
              .add(patient)
              .then(res => {}, err => reject(err));
          });
    }
    deletePatient(Id:any){
        return new Promise<any>((resolve, reject) => {
            this.firestore.doc('patients/' + Id).delete();
        });
    }
    savePatientPrescription(patient:Patient) {
        return new Promise<any>((resolve, reject) => {
            this.firestore.doc('patients/' + patient.Id).update(patient);
        });
    }
    
}
