export class Flights {
  flightId: number;
  cabinClass: string;
  airlineName: string;
  flyTo: string;
  flyFrom: string;
  ticketPrice: number;
  maxFlightSize: number;
  passengers: {
    passengerId: number,
    passengerEmail: string,
    passengerName: string,
    passengerPhone: number
  }

  constructor (flightId: number, cabinClass: string, airlineName:string, flyTo:string, flyFrom:string, ticketPrice:number, maxFlightSize:number, passengers:any) {
    this.flightId = flightId;
    this.cabinClass = cabinClass;
    this.airlineName = airlineName;
    this.flyTo = flyTo;
    this.flyFrom = flyFrom;
    this.ticketPrice = ticketPrice;
    this.maxFlightSize = maxFlightSize;
    this.passengers = passengers;
  }
}
