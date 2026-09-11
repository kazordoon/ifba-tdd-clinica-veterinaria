module.exports = class VetClinic {
  #animals = [];

  get animals() {
    return this.#animals;
  }

  addAnimal(animal) {
    this.animals.push(animal);
  }

  findAnimalByID(animalID) {
    const foundAnimal = this.#animals.find((animal) => animal.id === animalID);

    if (!foundAnimal) throw new Error('Animal not found.');

    return foundAnimal;
  }
};
