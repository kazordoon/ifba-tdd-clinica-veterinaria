const Animal = require('../entities/Animal');
const VetAppointment = require('./VetAppointment');

describe('VetAppointment', () => {
  it('Deve gerar um erro caso tente inserir um tipo de atendimento inválido', () => {
    const appointment = new VetAppointment();
    const expectedErrorMessage = 'Invalid appointment';

    expect(() => (appointment.appointmentType = {})).toThrow(
      expectedErrorMessage
    );
  });

  it('Deve definir corretamente o tipo de atendimento caso tente inserir um tipo de atendimento válido', () => {
    const appointment = new VetAppointment();

    appointment.appointmentType = VetAppointment.types.ROTINA;
    expect(appointment.appointmentType).toEqual(
      VetAppointment.types.ROTINA
    );
  });

  it('Deve definir corretamente o valor final do atendimento ao inserir um tipo de atendimento válido', () => {
    const appointment = new VetAppointment();

    appointment.appointmentType = VetAppointment.types.ROTINA;
    expect(appointment.totalValue).toBe(
      VetAppointment.types.ROTINA.price
    );
  });

  it('Deve aplicar 10% de desconto de fidelidade', () => {
    const appointment = new VetAppointment();
    appointment.appointmentType = VetAppointment.types.ROTINA;

    appointment.applyLoyaltyDiscount();

    const expectedValueWithDiscount =
      VetAppointment.types.ROTINA.price * 0.9;
    expect(appointment.totalValue).toBe(90);
  });

  it('Não deve aplicar desconto mais de uma vez', () => {
    const appointment = new VetAppointment();
    appointment.appointmentType = VetAppointment.types.ROTINA;

    const errorMessage = 'Discount already applied.';

    expect(() => {
      appointment.applyLoyaltyDiscount();
      appointment.applyLoyaltyDiscount();
    }).toThrow(errorMessage);
  });
});
