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

    appointment.appointmentType = appointment.appointmentTypes.ROTINA;
    expect(appointment.appointmentType).toEqual(
      appointment.appointmentTypes.ROTINA
    );
  });

  it('Deve definir corretamente o valor final do atendimento ao inserir um tipo de atendimento válido', () => {
    const appointment = new VetAppointment();

    appointment.appointmentType = appointment.appointmentTypes.ROTINA;
    expect(appointment.totalValue).toBe(appointment.appointmentTypes.ROTINA.price);
  });
});
