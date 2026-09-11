module.exports = class VetClinic {
  #animals = [];

  get animals() {
    return this.#animals;
  }

  addAnimal(animal) {
    const animalAlreadyAdded = this.#animals.some(
      (existentAnimal) => animal.id === existentAnimal.id
    );
    if (animalAlreadyAdded) throw new Error('Animal already added.');

    this.animals.push(animal);
  }

  addAnimals(animals) {
    animals.forEach((animal) => this.addAnimal(animal));
  }

  findAnimalByID(id) {
    const foundAnimal = this.#animals.find((animal) => animal.id === id);

    if (!foundAnimal) throw new Error('Animal not found.');

    return foundAnimal;
  }

  findAnimalByName(name) {
    const foundAnimal = this.#animals.find((animal) => animal.name === name);

    if (!foundAnimal) throw new Error('Animal not found.');

    return foundAnimal;
  }

  calculateTotalSpent() {
    return this.#animals.reduce(
      (prev, curr) => prev.totalSpent + curr.totalSpent
    );
  }

  findAnimalsWithTotalSpentAbove(value) {
    return this.#animals.filter((animal) => animal.totalSpent > value);
  }

  sortAnimalsByTotalSpent() {
    this.#animals = this.#animals.sort((a, b) => b.totalSpent - a.totalSpent);
  }

  removeAnimalsWithoutAppointments() {
    this.#animals = this.#animals.filter(
      (animal) => animal.appointments.length > 0
    );
  }
};
