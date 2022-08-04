import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { ComponentType } from 'src/app/model/component-type';
import { ProcessReturnRequest } from 'src/app/model/process-return-request';
import { ProcessReturnResponse } from 'src/app/model/process-return-response';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';
import { ProcessReturnService } from 'src/app/service/process-return-service/process-return.service';

@Component({
  selector: 'app-user',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class PlaceReturnComponent implements OnInit {
  [x: string]: any;
  /*
  * member variables of the class
  */
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  componentTypes: ComponentType[] = [{
    value: 'INTEGRAL_ITEM',
    viewValue: 'Integral Item'
  },{
    value: 'ACCESSORY',
    viewValue: 'Accessory'
  }]
  isStepperLinear = true;
  isProcessingReturn: boolean =  false;
  isProcessingReturnFailed: boolean =  false;
  isCompletingReturn: boolean =  false;
  isPaymentSuccessful: boolean =  false;
  processReturnResponse: ProcessReturnResponse;
  


  /*
  * Constructor getting the form data binded values and validating the same
  */
  constructor(
    private _formBuilder: FormBuilder,
    private processReturnService: ProcessReturnService,
    private authService: AuthenticationService,
    private notificationService: NotificationService
    ) 
    {
      this.firstFormGroup = this._formBuilder.group({
        componentName: ['', Validators.required],
        componentType: [,  Validators.required],
        componentQuantity: ['', Validators.min(1) && Validators.required ] 
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });
      //initlize response with Invalid values
      this.processReturnResponse = {
        requestId: 0,
        processingCharge: 0,
        packagingAndDeliveryCharge: 0,
        dateOfDelivery: new Date(-1)
      };
    }

    processReturnRequest(): void{
      this.isProcessingReturn = true;
      const processRequestContract: ProcessReturnRequest = this.processRequest;
      this.processReturnService.processComponmentRequest(processRequestContract).subscribe({
        next: (response: HttpResponse<ProcessReturnResponse>)  => {
          console.log(response)
          this.processReturnResponse.requestId = response.body?.requestId!;
          this.processReturnResponse.packagingAndDeliveryCharge = response.body?.packagingAndDeliveryCharge!;
          this.processReturnResponse.dateOfDelivery = response.body?.dateOfDelivery!;
          this.processReturnResponse.processingCharge = response.body?.processingCharge!;
          console.log(this.processReturnResponse);
         },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendErrorNotification(NotificationType.ERROR,errorResponse.error.message );
        }
      });
    }
    
    private sendErrorNotification(notificationType: NotificationType, message: string): void {
      if (message) {
        console.log(message);
        this.notificationService.notify(notificationType, message);
      } else {
        this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
      }
    }

  


 

  
  /*
  * TO DEBUG  
  */
  print(){
    console.log(this.firstFormGroup);
    console.log(this.processRequest);
  }

  ngOnInit(): void {
  }




  get componentName()
  {
    return this.firstFormGroup.get('componentName');
  }
  
  get componentQuantity()
  {
    return this.firstFormGroup.get('componentQuantity');
  }
  
  get componentType()
  {
    return this.firstFormGroup.get('componentType');
  }

  /*
  username and contact number: user provided during SignUp process
  */
  public get processRequest(): ProcessReturnRequest {
    return {
      username: this.authService.getUserFromLocalCache().email,
      userContactNumber : this.authService.getUserFromLocalCache().contactNumber,
      componentType : this.firstFormGroup?.value.componentType,
      componentName : this.firstFormGroup?.value.componentName,
      quantity : this.firstFormGroup?.value.componentQuantity,
      
    }
  }

}
