module.exports = class Animal {
  #totalSpent = 0.0;
  #appointments = [];
  name = '';
  species = '';
  age = 1;

  constructor(name, species, age) {
    this.name = name;
    this.species = species;
    this.age = age;
  }

  get totalSpent() {
    return this.#totalSpent;
  }

  get appointments() {
    return this.#appointments;
  }

  addAppointment(appointment) {
    if (this.#appointments.length >= 5) {
      appointment.applyLoyaltyDiscount();
    }

    this.#appointments.push(appointment);
    this.#totalSpent += appointment.totalValue;
  }
};
