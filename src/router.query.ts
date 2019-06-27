import { Injectable } from '@angular/core';
import { RouterStore, RouterState } from './router.store';
import { Query, HashMap, filterNil } from '@datorama/akita';
import { Observable, combineLatest } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { RouterStateSnapshot, Data } from '@angular/router';

function slice(section: string) {
  return (source: Observable<RouterState<RouterStateSnapshot>>) => {
    return source.pipe(map(data => data.state)).pipe(
      filterNil,
      map(state => (state!.root as any)[section])
    );
  };
}

@Injectable()
export class RouterQuery extends Query<RouterState> {
  constructor(protected store: RouterStore) {
    super(store);
  }

  selectParam<T>(names: string): Observable<T>;
  selectParam<T>(names: string[]): Observable<T[]>;
  selectParam<T>(): Observable<HashMap<T>>;
  selectParam<T>(names?: string | string[]): Observable<T | T[] | HashMap<T>> {
    if (names === undefined) {
      return this.select().pipe(slice('params'));
    }

    const select = (p: string) =>
      this.select().pipe(
        slice('params'),
        pluck(p)
      );

    if (Array.isArray(names)) {
      const sources = names.map(select);
      return combineLatest(sources);
    }

    return select(names);
  }

  getParam<T>(): HashMap<T>;
  getParam<T>(name: string): T;
  getParam<T>(name?: string): T | HashMap<any> | null {
    if (this.getValue().state) {
      const params = this.getValue().state!.root.params;
      if (name === undefined) {
        return params;
      }

      return params[name];
    }

    return null;
  }

  selectQueryParam<T>(names: string): Observable<T>;
  selectQueryParam<T>(names: string[]): Observable<T[]>;
  selectQueryParam<T>(): Observable<HashMap<T>>;
  selectQueryParam<T>(names?: string | string[]): Observable<T | T[] | HashMap<T>> {
    if (names === undefined) {
      return this.select().pipe(slice('queryParams'));
    }

    const select = (p: string) =>
      this.select().pipe(
        slice('queryParams'),
        pluck(p)
      );

    if (Array.isArray(names)) {
      const sources = names.map(select);
      return combineLatest(sources);
    }

    return select(names);
  }

  getQueryParam<T>(name: string): T;
  getQueryParam<T>(): HashMap<T>;
  getQueryParam<T>(name?: string): T | HashMap<T> | null {
    if (this.getValue().state) {
      const params = this.getValue().state!.root.params;
      if (name === undefined) {
        return params;
      }

      return params[name];
    }

    return null;
  }

  selectFragment(): Observable<string> {
    return this.select().pipe(slice('fragment'));
  }

  getFragment(): string | null {
    if (this.getValue().state) {
      return this.getValue().state!.root.fragment;
    }

    return null;
  }

  selectData<T>(name: string): Observable<T>;
  selectData<T>(): Observable<HashMap<T>>;
  selectData<T>(name?: string): Observable<T | HashMap<T>> {
    if (name === undefined) {
      return this.select().pipe(slice('data'));
    }

    return this.select().pipe(
      slice('data'),
      pluck(name)
    );
  }

  getData<T>(name: string): T | null;
  getData<T>(): Data | null;
  getData<T>(name?: string): Data | null {
    if (this.getValue().state) {
      const data = this.getValue().state!.root.data;
      if (name === undefined) {
        return data;
      }

      return data[name];
    }

    return null;
  }
}
