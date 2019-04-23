Bindings to connect Angular router to Akita store.

To get started, install the `@datorama/akita-ng-router-store` package and add to the app module the Akita’s devtools modules:

```ts
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
​
​@NgModule({
imports: [environment.production ? [] :
  [ AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot() ]
})
export class AppModule {
}
```

## Lazy Load Modules

To get the lazy modules routing params, please add the following option to your module:

```ts
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
```
