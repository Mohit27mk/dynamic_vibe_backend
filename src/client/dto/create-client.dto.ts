export class CreateCarContactDto {

 name:string;
 
 phoneno:string;

 email:string;

 service:string;

 message:string
}



   

   export class CreateRentalContactDto {
    name: string;                           // Name of the person
    email: string;                          // Email address
    phoneNumber: string;                    // Phone number
    location: string;                       // Location (Town)
    eventDate: string;                      // Approximate event date (ISO format)
    guestCount: number;                     // Number of guests
    eventType: string;                      // Selected event type
    needsPackage: boolean;                  // Whether a package is needed
    additionalInfo?: string;                // Additional information (optional)
  
    tentTypes: string[];                    // Array of tent types
    tableTypes: string[];                   // Array of table types
    chairTypes: string[];                   // Array of chair types
    lightingTypes: string[];                // Array of lighting types
    danceFloorTypes: string[];              // Array of dance floor types
    barTypes: string[];                     // Array of bar types
    accessoryTypes: string[];               // Array of accessory types
  }
  