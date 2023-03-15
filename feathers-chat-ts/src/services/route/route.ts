// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  routeDataValidator,
  routePatchValidator,
  routeQueryValidator,
  routeResolver,
  routeExternalResolver,
  routeDataResolver,
  routePatchResolver,
  routeQueryResolver,
  Route
} from './route.schema'

import type { Application } from '../../declarations'
import { RouteService, getOptions } from './route.class'
import { routePath, routeMethods } from './route.shared'
import { Params } from '@feathersjs/feathers'

export * from './route.class'
export * from './route.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const route = (app: Application) => {
  // Register our service on the Feathers application
  const event = new RouteService(getOptions(app))
  app.use(routePath, event)
  app.use('route-activate', {
    create: activateRoute(event)
  })

  const service = app.service('route')

  const hooks = {
    around: {
      all: [schemaHooks.resolveExternal(routeExternalResolver), schemaHooks.resolveResult(routeResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(routeQueryValidator), schemaHooks.resolveQuery(routeQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(routeDataValidator), schemaHooks.resolveData(routeDataResolver)],
      patch: [schemaHooks.validateData(routePatchValidator), schemaHooks.resolveData(routePatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  }

  service.hooks(hooks)
}

export const activateRoute = (routeService: RouteService): any => {
  return async (data: { project: string; route: string; activate: boolean }, params: Params) => {
    const oldRoutes = (await routeService.find(null!) as any).data as Route[]
    console.log(oldRoutes)
    console.log(oldRoutes.length)

    await routeService._create({
      route: data.route,
      project: data.project
    })

    const newRoutes = (await routeService.find(null!) as any).data as Route[]
    console.log(newRoutes)
    console.log(newRoutes.length)
  }
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [routePath]: RouteService
  }
  interface ServiceTypes {
    'route-activate': {
      create: ReturnType<typeof activateRoute>
    }
  }
}
