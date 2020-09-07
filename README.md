# hospital_api
An API made for hospital for coronavirus patients for doctors.
This is an API for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of  COVID-19 patients-

## Introduction:

There are 2 types of Users-
1. Doctors
2. Patients

### Functionalities:
#### 1. Doctors can log in
#### 2. Each time a patient visits, the doctor will follow below steps-
###### 2.1 Register the patient in the app (using phone number, if the patient already exists, just return the patient info in the API)
###### 2.2. After the checkup, create a Report
Patient Report has the following fields
    -Created by doctor
    -Status:- Can be either of: [Negative, Travelled-Quarantine,Symptoms-Quarantine, Positive-Admit]
    -Date
    
 ## Routes-
 1. /doctors/register → with username and password (add {email, password, contact} to body)
 2. /doctors/login → returns the JWT to be used (add {email, password} to body)
 3. /patients/register → register a patient (use bearer token for authentication and add {name, phone, birthday} to body)
 4. /patients/:id/create_report → create a report of the patient (add id of the patient to params and add {status} to body)
 5. /patients/:id/all_reports → List all the reports of a patient oldest to latest (add id of the patient)
 6. /reports/:status  → List all the reports of all the patients filtered by a specificstatus (add status from this list: [Negative, Travelled-Quarantine,Symptoms-Quarantine, Positive-Admit])

## Requirements-
Mongodb

## Install all dependencies using this command:
npm i install 

## Use this command to run on command line:
npm start
