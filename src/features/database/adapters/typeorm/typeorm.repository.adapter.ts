import { Injectable } from '@nestjs/common';
import { TypeORMFilterService } from './services/typeorm_filter.service';
import { FindManyOptions, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { Repository as RepositoryPort } from '../../ports/repository.port';
import { TFindOneOptions, TFindOptions } from '../../ports/types/find_options.type';

@Injectable()
export class TypeORMRepository<T extends ObjectLiteral> implements RepositoryPort<T> {
  constructor(private readonly _repository: Repository<T>) {}

  find(options?: TFindOptions<T>): Promise<T[]> {
    return this._repository.find(this._toFindManyOptions(options));
  }

  findOne(options: TFindOneOptions<T>): Promise<T | null> {
    return this._repository.findOne(this._toFindOneOptions(options));
  }

  private _toFindManyOptions(findOptions?: TFindOptions<T>): FindManyOptions<T> {
    const options: FindManyOptions<T> = {};

    if (findOptions?.filter) {
      options.where = TypeORMFilterService.applyFilters(findOptions.filter) as FindOptionsWhere<T>;
    }

    if (findOptions?.fields) {
      options.select = findOptions.fields as FindOptionsSelect<T>;
    }

    return options;
  }

  private _toFindOneOptions(findOptions?: TFindOneOptions<T>): FindManyOptions<T> {
    const options: FindManyOptions<T> = {};

    if (findOptions?.filter) {
      options.where = TypeORMFilterService.applyFilters(findOptions.filter) as FindOptionsWhere<T>;
    }

    if (findOptions?.fields) {
      options.select = findOptions.fields as FindOptionsSelect<T>;
    }

    if (findOptions?.relations) {
      options.relations = findOptions.relations as FindOptionsRelations<T>;
    }

    return options;
  }
}
