import { Provider } from '@nestjs/common';
import axios from 'axios';

export const AxiosProvider: Provider = {
  provide: 'Axios',
  useFactory: () => axios.create(),
};
