import { hooks as schemaHooks } from '@feathersjs/schema'
import { getValidator } from '@feathersjs/typebox'

import {
  emailSettingDatabaseSchema,
  emailSettingDataSchema,
  emailSettingPatchSchema,
  emailSettingQuerySchema
} from './email-setting.schema'
import { dataValidator, queryValidator } from '../../validators'

import {
  emailSettingDataResolver,
  emailSettingExternalResolver,
  emailSettingPatchResolver,
  emailSettingQueryResolver,
  emailSettingResolver
} from './email-setting.resolvers'

const emailSettingDataValidator = getValidator(emailSettingDataSchema, dataValidator)
const emailSettingPatchValidator = getValidator(emailSettingPatchSchema, dataValidator)
const emailSettingQueryValidator = getValidator(emailSettingQuerySchema, queryValidator)

export default {
  around: {
    all: [
      schemaHooks.resolveExternal(emailSettingExternalResolver),
      schemaHooks.resolveResult(emailSettingResolver)
    ]
  },

  before: {
    all: [
      schemaHooks.validateQuery(emailSettingQueryValidator),
      schemaHooks.resolveQuery(emailSettingQueryResolver)
    ],
    find: [],
    get: [],
    create: [
      schemaHooks.validateData(emailSettingDataValidator),
      schemaHooks.resolveData(emailSettingDataResolver)
    ],
    update: [],
    patch: [
      schemaHooks.validateData(emailSettingPatchValidator),
      schemaHooks.resolveData(emailSettingPatchResolver)
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
} as any
