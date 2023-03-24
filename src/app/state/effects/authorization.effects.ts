import {Actions, createEffect, ofType} from "@ngrx/effects";
import {DataService} from "../../services/data.service";
import {authorizationPageLoaded, authorizationRequested} from "../actions/authorization.actions";
import {catchError, mergeMap} from "rxjs/operators";
import {EMPTY, from, map, of} from "rxjs";
import {Injectable} from "@angular/core";
import {
  unregisteredApplicationProfileError,
  unregisteredApplicationProfileReceived
} from "../actions/application.actions";
import {descriptionsNeeded} from "../actions/description.actions";
import * as DataActions from "../actions/application.actions";


@Injectable()
export class AuthorizationEffects {
  constructor(
    private actions$: Actions,
    private data: DataService,
  ) {}

  requestUnregisteredApplicationProfile$ = createEffect(() => { return this.actions$.pipe(
    ofType(authorizationPageLoaded),
    mergeMap((action) =>
      from(
        this.data.getUnregisteredApplicationProfile(action.applicationId)).pipe(
          map(profile => unregisteredApplicationProfileReceived({profile}))
        )),
    catchError(() => of(unregisteredApplicationProfileError()))
  )});

  requestUnregisteredApplicationNeeds$ = createEffect(() => { return this.actions$.pipe(
    ofType(authorizationPageLoaded),
    map((action) => descriptionsNeeded({applicationId: action.applicationId}))
  )})

  requestAuthorization$ = createEffect(() => { return this.actions$.pipe(
    ofType(authorizationRequested),
    mergeMap(({ authorization }) => this.data.authorizeApplication(authorization)),
    map(accessAuthorization => DataActions.authorizationReceived({ accessAuthorization })),
    map(() => ({type: 'NOOP'}))
  )})
}
