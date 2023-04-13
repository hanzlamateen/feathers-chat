import { hooks as schemaHooks } from '@feathersjs/schema'
import { getValidator } from '@feathersjs/typebox'

import {
  emailAuthSchema,
  emailSettingDatabaseSchema,
  emailSettingDataSchema,
  emailSettingPatchSchema,
  emailSettingQuerySchema,
  emailSettingSchema,
  emailSmtpSchema,
  emailSubjectSchema
} from './email-setting.schema'
import { dataValidator, queryValidator } from '../../validators'

import {
  emailSettingDataResolver,
  emailSettingExternalResolver,
  emailSettingPatchResolver,
  emailSettingQueryResolver,
  emailSettingResolver
} from './email-setting.resolvers'

const emailSubjectValidator = getValidator(emailSubjectSchema, dataValidator)
const emailAuthValidator = getValidator(emailAuthSchema, dataValidator)
const emailSmtpValidator = getValidator(emailSmtpSchema, dataValidator)
const emailSettingValidator = getValidator(emailSettingSchema, dataValidator)
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
