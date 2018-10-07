import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterStore } from './router.store';
import { RouterService } from './router.service';
import { RouterQuery } from './router.query';

@NgModule({})
export class AkitaNgRouterStoreModule {
  constructor(private routerService: RouterService) {
    this.routerService.init();
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AkitaNgRouterStoreModule,
      providers: [RouterStore, RouterService, RouterQuery]
    };
  }
}
