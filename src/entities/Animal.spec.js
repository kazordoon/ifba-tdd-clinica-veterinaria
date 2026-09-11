const VetAppointment = require('../services/VetAppointment');
const Animal = require('./Animal');

describe('Animal', () => {
  it('Deve definir corretamente o total gasto do animal após vários atendimentos consecutivos', () => {
    const animal = new Animal('Luck', 'Cachorro', 5);

    const appointment1 = new VetAppointment(VetAppointment.types.ROTINA);

    const { types: appointmentTypes } = VetAppointment;

    const appointment2 = new VetAppointment(VetAppointment.types.URGENCIA);

    const appointment3 = new VetAppointment(VetAppointment.types.EMERGENCIA);

    const expectedTotalSpent = appointmentTypes.ROTINA.price + appointmentTypes.URGENCIA.price + appointmentTypes.EMERGENCIA.price;

    animal.addAppointment(appointment1);
    animal.addAppointment(appointment2);
    animal.addAppointment(appointment3);

    expect(animal.totalSpent).toBe(expectedTotalSpent);
  });

  it('Deve adicionar os atendimentos no histórico do animal', () => {
    const animal = new Animal('Luck', 'Cachorro', 5);

    const appointment = new VetAppointment(VetAppointment.types.ROTINA);

    animal.addAppointment(appointment);

    expect(animal.appointments).toEqual(expect.arrayContaining([appointment]));
  })

    it('Deve adicionar 10% de desconto caso o animal tenha pelo menos 5 atendimentos anteriores', () => {
    const animal = new Animal('Luck', 'Cachorro', 5);
    const appointment = new VetAppointment(VetAppointment.types.ROTINA);


    animal.addAppointment(appointment);
    animal.addAppointment(appointment);
    animal.addAppointment(appointment);
    animal.addAppointment(appointment);
    animal.addAppointment(appointment);

    const sixthAppointment = new VetAppointment(VetAppointment.types.ROTINA)
    animal.addAppointment(sixthAppointment);

    const expectedValueWithDiscount = VetAppointment.types.ROTINA.price * 0.9;

    expect(sixthAppointment.totalValue).toBe(expectedValueWithDiscount);
  });

    it('Não deve adicionar 10% de desconto caso o animal tenha menos que 5 atendimentos anteriores', () => {
    const animal = new Animal('Luck', 'Cachorro', 5);
    const appointment = new VetAppointment(VetAppointment.types.ROTINA);

    animal.addAppointment(appointment);
    animal.addAppointment(appointment);
    animal.addAppointment(appointment);
    animal.addAppointment(appointment);

    const fifthAppointment = new VetAppointment(VetAppointment.types.ROTINA)
    animal.addAppointment(fifthAppointment);

    expect(fifthAppointment.totalValue).toBe(VetAppointment.types.ROTINA.price);
  });
});
