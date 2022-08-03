import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType, concatLatestFrom} from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, map, tap, of} from "rxjs";
import {LoginService} from "../services/login.service";
import {CoreActions} from "../actions";
import {mergeMap} from "rxjs/operators";
import {oidcIssuer as oidcIssuerSelector, redirectUrl} from "../selectors";
import { Router } from "@angular/router";

@Injectable()
export class CoreEffects {

  constructor(
    private actions$: Actions,
    private id: LoginService,
    private store: Store,
    private router: Router,
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.loginRequested),
    map(({oidcIssuer}) => CoreActions.loginInitiated({oidcIssuer})),
    tap(({oidcIssuer}) => this.id.login(oidcIssuer)),
  ))

  handleIncomingRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.incomingLoginRedirect),
    mergeMap(({url}) => this.id.handleIncomingRedirect$(url)),
    map(oidcInfo => {
      if (oidcInfo) {
        return CoreActions.oidcInfoReceived({oidcInfo})
      } else {
        throw new Error('oidcInfo undefined')
      }
    })
  ))

  setLoggedIn$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.oidcInfoReceived),
    map(({oidcInfo}) => CoreActions.loginStatusChanged({loggedIn: oidcInfo.isLoggedIn}))
  ))

  setWebId$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.oidcInfoReceived),
    map(({oidcInfo}) => CoreActions.webIdReceived({webId: oidcInfo.webId!}))
  ))

  checkServerSession$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.loginStatusChanged),
    concatLatestFrom(action => this.store.select(oidcIssuerSelector)),
    mergeMap(([action, oidcIssuer]) => {
      if (action.loggedIn) {
        return of(CoreActions.serverSessionRequested({oidcIssuer}))
      } else {
        return EMPTY;
      }
    }),
  ))

  serverSessionRequested$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.serverSessionRequested),
    mergeMap(({oidcIssuer}) => this.id.checkServerSession$(oidcIssuer)
      .pipe(
        map(result => CoreActions.serverSessionReceived(result))
      )),
  ))

  serverLoginRequested$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.serverLoginRequested),
    concatLatestFrom(action => this.store.select(redirectUrl)),
    tap(([action, redirectUrl]) => this.id.serverLogin(redirectUrl)),
    map(([action, redirectUrl]) => CoreActions.serverLoginInitiated()),
  ))
}
