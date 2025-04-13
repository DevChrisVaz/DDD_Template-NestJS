import { JSONAPIException } from 'core/json_api.exception';

export class UnavailbleServiceException extends JSONAPIException {
  constructor(service: string) {
    super({
      hideDetails: true,
      code: 'UnavailableServiceException',
      detail: `El servicio ${service} no está disponible en este momento, intente más tarde`,
      status: '503',
      suggestion: 'Intente más tarde, contacte al equipo soporte.',
      title: 'Servicio no disponible',
    });
  }
}
