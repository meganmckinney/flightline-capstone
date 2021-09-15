export interface Flights {
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
}
