const Animal = require('../entities/Animal');
const VetClinic = require('./VetClinic');

describe('VetClinic', () => {
  it('Deve adicionar um animal existente com sucesso', () => {
    const vetClinic = new VetClinic();
    const animal = new Animal('Luck', 'Cachorro', 5);

    vetClinic.addAnimal(animal);

    expect(vetClinic.animals).toEqual(expect.arrayContaining([animal]));
  })
});
