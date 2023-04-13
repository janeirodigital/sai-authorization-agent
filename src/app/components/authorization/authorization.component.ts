import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessNeed, Authorization, AuthorizationData, DataAuthorization, IRI} from '@janeirodigital/sai-api-messages';
import {Store} from "@ngrx/store";
import * as DescActions from 'src/app/state/actions/description.actions';
import * as DataActions from 'src/app/state/actions/application.actions';
import {selectDescriptions} from 'src/app/state/selectors/description.selectors'
import { BaseAuthorization } from '@janeirodigital/sai-api-messages';

@Component({
  selector: 'sai-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  clientId?: IRI;
  clientIdInput = '';

  authorizationData$ = this.store.select(selectDescriptions);
  authorizationData?: AuthorizationData

  treeControl = new NestedTreeControl<AccessNeed>(node => node.children);
  dataSource = new MatTreeNestedDataSource<AccessNeed>();

  hasChild = (_: number, node: AccessNeed) => !!node.children && node.children.length > 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    ) {
      this.authorizationData$.subscribe(data => {
        if (data) {
          this.authorizationData = data
          // change-plan (1) instead of using the store to pull the data, take the id from the router and call the service to pull
          //                 pull the data. Use the data to pass as inputs to the view-component
          this.dataSource.data = data.accessNeedGroup.needs;
        }
      });
    }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    const clientId = params['client_id'];

    if (clientId) {
      this.clientId = clientId;
      this.fetchApplication(clientId);
    }
  }

  getScope(accessNeed: AccessNeed): string {
    if (accessNeed.parent) return 'Inherited'
    // TODO based on user input
    return 'All'
  }

  // TODO use case when there is a `parent` access need
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createDataAuthorizations(accessNeed: AccessNeed, parent?: AccessNeed): DataAuthorization[] {
    const dataAuthorization = {
      accessNeed: accessNeed.id,
      scope: this.getScope(accessNeed),
    } as DataAuthorization
    let children: DataAuthorization[] = []
    if (accessNeed.children) {
      children = accessNeed.children.flatMap(childAccessNeed => this.createDataAuthorizations(childAccessNeed, accessNeed))
    }

    return [ dataAuthorization, ...children]
  }

  fetchApplication(clientId: IRI): void {
      this.store.dispatch(DescActions.descriptionsNeeded({
        applicationId: clientId
      }));
  }

  authorize(granted = true) {
    if (this.authorizationData) {
      let authorization: Authorization
      const baseAuthorization = {
        grantee: this.authorizationData.id,
        accessNeedGroup: this.authorizationData.accessNeedGroup.id,
      } as BaseAuthorization;
      if (granted) {
        authorization =  {
          ...baseAuthorization,
          dataAuthorizations: this.authorizationData.accessNeedGroup.needs.flatMap(accessNeed => this.createDataAuthorizations(accessNeed)),
          granted: true,
        }
      } else {
        authorization =  {
          ...baseAuthorization,
          granted: false,
        }
      }
      this.store.dispatch(DataActions.authorizeApplication({ authorization }));
      // TODO: show spinner
    }
  }
}
