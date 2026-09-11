const Animal = require('../entities/Animal');
const VetClinic = require('./VetClinic');
const VetAppointment = require('./VetAppointment');

describe('VetClinic', () => {
  it('Deve adicionar um novo animal com sucesso', () => {
    const vetClinic = new VetClinic();
    const animal = new Animal('Luck', 'Cachorro', 5);

    vetClinic.addAnimal(animal);

    expect(vetClinic.animals).toEqual(expect.arrayContaining([animal]));
  })

  it('Deve gerar um erro ao tentar adicionar um animal que já tenha sido adicionado anteriormente', () => {
    const vetClinic = new VetClinic();
    const animal = new Animal('Luck', 'Cachorro', 5);

    vetClinic.addAnimal(animal);

    const errorMessage = 'Animal already added.';

    expect(() => vetClinic.addAnimal(animal)).toThrow(errorMessage);
  });

  it('Deve consultar um animal existente com sucesso', () => {
    const vetClinic = new VetClinic();
    const animal = new Animal('Luck', 'Cachorro', 5);

    vetClinic.addAnimal(animal);

    const foundAnimal = vetClinic.findAnimalByID(animal.id);

    expect(foundAnimal.id).toBe(animal.id);
  });

  it('Deve gerar um erro caso um animal não existente seja buscado', () => {
    const vetClinic = new VetClinic();
    const animal = new Animal('Luck', 'Cachorro', 5);

    vetClinic.addAnimal(animal);

    const errorMessage = 'Animal not found.';

    expect(() => vetClinic.findAnimalByID('id-nao-existente')).toThrow(errorMessage);
  });
});
