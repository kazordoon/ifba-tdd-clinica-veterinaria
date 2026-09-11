module.exports = class VetClinic {
  #animals = [];

  get animals() {
    return this.#animals;
  }

  addAnimal(animal) {
    this.animals.push(animal);
  }
};
