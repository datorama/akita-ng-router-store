Bindings to connect Angular router to Akita store.

To get started, install the `@datorama/akita-ng-router-store` package and add to the app module the Akita’s devtools modules:

```ts
import { AkitaNgDevtools } from '@datorama/akita';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
​
​@NgModule({
imports: [environment.production ? [] :
  [ AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot() ]
})
export class AppModule {
}
```
