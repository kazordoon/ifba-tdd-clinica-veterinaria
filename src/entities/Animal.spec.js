const VetAppointment = require('../services/VetAppointment');
const Animal = require('./Animal');

describe('Animal', () => {
  it('Deve definir corretamente o total gasto do animal após vários atendimentos consecutivos', () => {
    const animal = new Animal('Luck', 'Cachorro', 5);

    const appointment1 = new VetAppointment();
    appointment1.appointmentType = appointment1.appointmentTypes.ROTINA;

    const { appointmentTypes } = appointment1;

    const appointment2 = new VetAppointment();
    appointment2.appointmentType = appointment2.appointmentTypes.URGENCIA;

    const appointment3 = new VetAppointment();
    appointment3.appointmentType = appointment3.appointmentTypes.EMERGENCIA;

    const expectedTotalSpent = appointmentTypes.ROTINA.price + appointmentTypes.URGENCIA.price + appointmentTypes.EMERGENCIA.price;

    animal.addAppointment(appointment1);
    animal.addAppointment(appointment2);
    animal.addAppointment(appointment3);

    expect(animal.totalSpent).toBe(expectedTotalSpent);
  });

  it('Deve adicionar os atendimentos no histórico do animal', () => {
    const animal = new Animal('Luck', 'Cachorro', 5);

    const appointment = new VetAppointment();
    appointment.appointmentType = appointment.appointmentTypes.ROTINA;

    animal.addAppointment(appointment);

    expect(animal.appointments).toEqual(expect.arrayContaining([appointment]));
  })

    it('Deve adicionar 10% de desconto caso o animal tenha pelo menos 5 atendimentos anteriores', () => {
    const animal = new Animal('Luck', 'Cachorro', 5);
    const appointment = new VetAppointment();
    appointment.appointmentType = appointment.appointmentTypes.ROTINA;

    animal.addAppointment(appointment);
    animal.addAppointment(appointment);
    animal.addAppointment(appointment);
    animal.addAppointment(appointment);
    animal.addAppointment(appointment);

    const sixthAppointment = new VetAppointment()
    sixthAppointment.appointmentType = appointment.appointmentTypes.ROTINA;
    animal.addAppointment(sixthAppointment);

    const expectedValueWithDiscount = appointment.appointmentTypes.ROTINA.price * 0.9;

    expect(sixthAppointment.totalValue).toBe(expectedValueWithDiscount);
  });

    it('Não deve adicionar 10% de desconto caso o animal tenha menos que 5 atendimentos anteriores', () => {
    const animal = new Animal('Luck', 'Cachorro', 5);
    const appointment = new VetAppointment();
    appointment.appointmentType = appointment.appointmentTypes.ROTINA;

    animal.addAppointment(appointment);
    animal.addAppointment(appointment);
    animal.addAppointment(appointment);
    animal.addAppointment(appointment);

    const fifthAppointment = new VetAppointment()
    fifthAppointment.appointmentType = appointment.appointmentTypes.ROTINA;
    animal.addAppointment(fifthAppointment);

    expect(fifthAppointment.totalValue).toBe(appointment.appointmentTypes.ROTINA.price);
  });
});
