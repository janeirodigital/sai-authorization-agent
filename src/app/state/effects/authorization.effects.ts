import {Actions, createEffect, ofType} from "@ngrx/effects";
import {DataService} from "../../services/data.service";
import {authorizationInitiated} from "../actions/authorization.actions";
import {catchError, mergeMap} from "rxjs/operators";
import {from, map, of} from "rxjs";
import {Injectable} from "@angular/core";
import {
  unregisteredApplicationProfileError,
  unregisteredApplicationProfileReceived
} from "../actions/application.actions";


@Injectable()
export class AuthorizationEffects {
  constructor(
    private actions$: Actions,
    private data: DataService,
  ) {}

  requestUnregisteredApplicationProfile$ = createEffect(() => { return this.actions$.pipe(
    ofType(authorizationInitiated),
    mergeMap((action) =>
      from(
        this.data.getUnregisteredApplicationProfile(action.applicationId)).pipe(
          map(profile => unregisteredApplicationProfileReceived({profile}))
        )),
    catchError(() => of(unregisteredApplicationProfileError()))
  )});
}
