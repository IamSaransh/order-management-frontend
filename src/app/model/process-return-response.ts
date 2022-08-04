import { NumberSymbol } from "@angular/common";

export interface ProcessReturnResponse
{
    requestId: number,
    processingCharge: number,
    packagingAndDeliveryCharge: NumberSymbol,
    dateOfDelivery: Date
}