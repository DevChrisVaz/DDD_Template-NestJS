import { Provider } from '@nestjs/common';
import { HTTPService } from './ports/http.service.port';
import { AxiosHTTPService } from './adapters/http/axios/axios_http.service';
import { AxiosProvider } from './adapters/http/axios/axios.provider';

export const TransportProviders: Provider[] = [
  {
    provide: HTTPService,
    useClass: AxiosHTTPService,
  },
  AxiosProvider,
];
