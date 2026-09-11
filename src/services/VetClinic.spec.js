const Animal = require('../entities/Animal');
const VetClinic = require('./VetClinic');
const VetAppointment = require('./VetAppointment');

describe('VetClinic', () => {
  it('Deve adicionar um novo animal com sucesso', () => {
    const vetClinic = new VetClinic();
    const animal = new Animal('Luck', 'Cachorro', 5);

    vetClinic.addAnimal(animal);

    expect(vetClinic.animals).toEqual(expect.arrayContaining([animal]));
  });

  it('Deve gerar um erro ao tentar adicionar um animal que já tenha sido adicionado anteriormente', () => {
    const vetClinic = new VetClinic();
    const animal = new Animal('Luck', 'Cachorro', 5);

    vetClinic.addAnimal(animal);

    const errorMessage = 'Animal already added.';

    expect(() => vetClinic.addAnimal(animal)).toThrow(errorMessage);
  });

  it('Deve adicionar uma lista de animais com sucesso', () => {
    const vetClinic = new VetClinic();
    const animal1 = new Animal('Luck', 'Cachorro', 5);
    const animal2 = new Animal('Mingau', 'Gato', 7);
    const animal3 = new Animal('Crusoé', 'Lagarto', 1);

    const animals = [animal1, animal2, animal3];

    vetClinic.addAnimals(animals);

    expect(vetClinic.animals).toEqual(expect.arrayContaining(animals));
  });

  it('Deve consultar um animal existente pelo ID com sucesso', () => {
    const vetClinic = new VetClinic();
    const animal = new Animal('Luck', 'Cachorro', 5);

    vetClinic.addAnimal(animal);

    const foundAnimal = vetClinic.findAnimalByID(animal.id);

    expect(foundAnimal.id).toBe(animal.id);
  });

  it('Deve gerar um erro caso um animal com determinado ID não exista', () => {
    const vetClinic = new VetClinic();
    const animal = new Animal('Luck', 'Cachorro', 5);

    vetClinic.addAnimal(animal);

    const errorMessage = 'Animal not found.';

    expect(() => vetClinic.findAnimalByID('id-nao-existente')).toThrow(
      errorMessage
    );
  });

  it('Deve consultar um animal existente pelo nome com sucesso', () => {
    const vetClinic = new VetClinic();
    const animal = new Animal('Luck', 'Cachorro', 5);

    vetClinic.addAnimal(animal);

    const foundAnimal = vetClinic.findAnimalByName(animal.name);

    expect(foundAnimal.name).toBe(animal.name);
  });

  it('Deve gerar um erro caso um animal com determinado nome não exista', () => {
    const vetClinic = new VetClinic();
    const animal = new Animal('Luck', 'Cachorro', 5);

    vetClinic.addAnimal(animal);

    const errorMessage = 'Animal not found.';

    expect(() => vetClinic.findAnimalByName('nome-nao-existente')).toThrow(
      errorMessage
    );
  });

  it('Deve calcular o total gasto acumulado de todos os animais', () => {
    const vetClinic = new VetClinic();
    const animal1 = new Animal('Luck', 'Cachorro', 5);
    const animal2 = new Animal('Mingau', 'Gato', 7);

    const appointment1 = new VetAppointment();
    appointment1.appointmentType = appointment1.appointmentTypes.ROTINA;

    const appointment2 = new VetAppointment();
    appointment2.appointmentType = appointment2.appointmentTypes.EMERGENCIA;

    animal1.addAppointment(appointment1);
    animal1.addAppointment(appointment2);

    animal2.addAppointment(appointment1);
    animal2.addAppointment(appointment2);

    vetClinic.addAnimals([animal1, animal2]);

    const expectedTotalSpent =
      appointment1.appointmentTypes.ROTINA.price * 2 +
      appointment1.appointmentTypes.EMERGENCIA.price * 2;
    const totalSpent = vetClinic.calculateTotalSpent();

    expect(totalSpent).toBe(expectedTotalSpent);
  });

  it('Deve filtrar apenas os animais que tiverem o total gasto acima de determinado valor', () => {
    const vetClinic = new VetClinic();
    const animal1 = new Animal('Luck', 'Cachorro', 5);
    const animal2 = new Animal('Mingau', 'Gato', 7);
    const animal3 = new Animal('Crusoé', 'Lagarto', 1);

    const appointment1 = new VetAppointment();
    appointment1.appointmentType = appointment1.appointmentTypes.ROTINA;

    const appointment2 = new VetAppointment();
    appointment2.appointmentType = appointment2.appointmentTypes.EMERGENCIA;

    animal1.addAppointment(appointment1);
    animal1.addAppointment(appointment2);

    animal2.addAppointment(appointment1);
    animal2.addAppointment(appointment2);

    animal3.addAppointment(appointment2);

    vetClinic.addAnimals([animal1, animal2, animal3]);

    const expectedAnimals = vetClinic.findAnimalsWithTotalSpentAbove(
      appointment2.appointmentTypes.EMERGENCIA.price
    );

    expect(expectedAnimals).toEqual(expect.arrayContaining([animal1, animal2]));
    expect(expectedAnimals).not.toEqual(expect.arrayContaining([animal3]));
  });

  it('Deve ordenar a lista de animais pelo total gasto de forma decrescente', () => {
    const vetClinic = new VetClinic();
    const animalWithMostTotalSpent = new Animal('Luck', 'Cachorro', 5);
    const animalWithLessTotalSpent = new Animal('Crusoé', 'Lagarto', 1);
    const randomAnimal = new Animal('Mingau', 'Gato', 7);

    const appointment1 = new VetAppointment();
    appointment1.appointmentType = appointment1.appointmentTypes.ROTINA;

    const appointment2 = new VetAppointment();
    appointment2.appointmentType = appointment2.appointmentTypes.EMERGENCIA;

    animalWithMostTotalSpent.addAppointment(appointment1);
    animalWithMostTotalSpent.addAppointment(appointment2);
    animalWithMostTotalSpent.addAppointment(appointment2);

    animalWithLessTotalSpent.addAppointment(appointment1);

    randomAnimal.addAppointment(appointment2);
    randomAnimal.addAppointment(appointment2);

    vetClinic.addAnimals([
      animalWithMostTotalSpent,
      animalWithLessTotalSpent,
      randomAnimal
    ]);

    vetClinic.sortAnimalsByTotalSpent();

    expect(vetClinic.animals[0]).toEqual(animalWithMostTotalSpent);
    expect(vetClinic.animals[1]).toEqual(randomAnimal);
    expect(vetClinic.animals[2]).toEqual(animalWithLessTotalSpent);
  });

  it('Deve remover animais sem atendimentos registrados', () => {
    const vetClinic = new VetClinic();
    const animalWithAppointment = new Animal('Luck', 'Cachorro', 5);
    const animalWithoutAppointment = new Animal('Crusoé', 'Lagarto', 1);

    const appointment = new VetAppointment();
    appointment.appointmentType = appointment.appointmentTypes.ROTINA;

    animalWithAppointment.addAppointment(appointment);

    vetClinic.addAnimals([animalWithAppointment, animalWithoutAppointment]);

    vetClinic.removeAnimalsWithoutAppointments();

    expect(vetClinic.animals).not.toEqual(
      expect.arrayContaining([animalWithoutAppointment])
    );
  });
});
