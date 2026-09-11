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

  findAnimalByID(animalID) {
    const foundAnimal = this.#animals.find((animal) => animal.id === animalID);

    if (!foundAnimal) throw new Error('Animal not found.');

    return foundAnimal;
  }
};
