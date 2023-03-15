// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexAdapter, KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Route, RouteData, RoutePatch, RouteQuery } from './route.schema'

export type { Route, RouteData, RoutePatch, RouteQuery }

export interface RouteParams extends KnexAdapterParams<RouteQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
// export class RouteService<ServiceParams extends Params = RouteParams> extends KnexService<
//   Route,
//   RouteData,
//   RouteParams,
//   RoutePatch
// > {}


export interface UserParams extends Params {
  userId?: string
  paginate?: false
  isInternal?: boolean
}

export class RouteService<ServiceParams extends Params = RouteParams> extends KnexAdapter<
  Route,
  RouteData,
  RouteParams,
  RoutePatch
> {
  docs: any

  constructor(options: KnexAdapterOptions) {
    super(options)
  }

  async find(params?: UserParams) {
    if (!params) params = {}
    params.paginate = false
    const routes = await super._find(params)
    return {
      total: (routes as any).length,
      data: routes
    }
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'route',
    multi: true
  }
}
