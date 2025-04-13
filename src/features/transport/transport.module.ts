import { Global, Module } from '@nestjs/common';
import { AxiosConfig } from './adapters/http/axios/axios.config';
import { TransportProviders } from './transport.providers';
import { HTTPService } from './ports/http.service.port';
import { AxiosJsonApiHttpServiceToken } from './adapters/http/axios/axiosJsonApiHttp.service';

@Global()
@Module({
  imports: [AxiosConfig],
  providers: TransportProviders,
  exports: [HTTPService, AxiosJsonApiHttpServiceToken],
})
export class TransportModule {}
