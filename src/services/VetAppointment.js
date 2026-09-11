module.exports = class VetAppointment {
  #appointmentType;
  #loyaltyDiscountPercentage = 0.10; // 10%
  #totalValue = 0.0;
  #hasTheDiscountBeenApplied = false;
  static types = Object.freeze({
    ROTINA: { name: 'Consulta de rotina', price: 100.0 },
    URGENCIA: { name: 'Consulta de urgência', price: 180.0 },
    EMERGENCIA: { name: 'Consulta de emergência', price: 250.0 }
  });

  constructor(appointmentType) {
    this.appointmentType = appointmentType;
  }

  get totalValue() {
    return this.#totalValue;
  }

  get appointmentType() {
    return this.#appointmentType;
  }

  set appointmentType(appointmentType) {
    let isAValidAppointmentType = Object.values(VetAppointment.types).some(
      (existentAppointmentType) =>
        appointmentType?.name === existentAppointmentType.name && appointmentType?.price === existentAppointmentType.price
    );

    if (!isAValidAppointmentType) throw new Error('Invalid appointment');

    this.#totalValue = appointmentType.price;
    this.#appointmentType = appointmentType;
  }

  applyLoyaltyDiscount() {
    if (this.#hasTheDiscountBeenApplied) {
      throw new Error('Discount already applied.');
    }

    this.#totalValue *= 1 - this.#loyaltyDiscountPercentage;
    this.#hasTheDiscountBeenApplied = true;
  }
};
