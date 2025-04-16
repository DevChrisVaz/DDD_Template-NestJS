import { Global, Module } from '@nestjs/common';
import { SharedProviders } from './shared.providers';

@Global()
@Module({
  imports: [],
  providers: SharedProviders,
  exports: SharedProviders,
})
export class SharedModule {}
