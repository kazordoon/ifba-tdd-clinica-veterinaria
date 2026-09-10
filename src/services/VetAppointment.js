module.exports = class VetAppointment {
  #appointmentType;
  appointmentTypes = Object.freeze({
    ROTINA: { name: 'Consulta de rotina', price: 100.0 },
    URGENCIA: { name: 'Consulta de urgência', price: 180.0 },
    EMERGENCIA: { name: 'Consulta de emergência', price: 250.0 }
  });

  get appointmentType() {
    return this.#appointmentType;
  }

  set appointmentType(appointmentType) {
    let isAValidAppointmentType = Object.values(this.appointmentTypes).some(
      (existentAppointmentType) =>
        appointmentType?.name === existentAppointmentType.name && appointmentType?.price === existentAppointmentType.price
    );

    if (!isAValidAppointmentType) throw new Error('Invalid appointment');

    this.#appointmentType = appointmentType;
  }
};
