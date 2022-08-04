export interface ProcessReturnRequest{
    username: string,
    userContactNumber: string,
    componentType: string,
    componentName: string, // TODO: make this as a component type
    quantity: number
}