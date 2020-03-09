// import { Usuario } from './usuario.interface';
// import { PacienteInterface } from './paciente.interface';
// import { EmpleadoInterface } from './empleado.interface';

export class TurnoInterface {

    area: string;
    idProfesional: string;
    fechaInicio: string;
    horaInicio: string;
    fechaFin: string;
    horaFin: string;
    duracion: string;
    idPaciente: string;
    // paciente: PacienteInterface;
    creadoPor: string;
    creacion: string;
    actualizado: string;
    estado: string;
    observaciones?: string;
    // tslint:disable-next-line: variable-name
    _id?: string;

}
