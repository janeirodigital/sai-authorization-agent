import {createAction, props} from "@ngrx/store";

export const authorizationInitiated = createAction(
  '[Authorization] Authorization Initiated',
  props<{applicationId: string}>(),
)
