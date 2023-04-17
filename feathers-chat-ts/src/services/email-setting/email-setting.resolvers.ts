// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { v4 } from 'uuid'

import {
  EmailSettingDatabaseType,
  EmailSettingQuery,
  EmailSettingType,
  EmailSmtpType,
  EmailSubjectType
} from './email-setting.schema'
import type { HookContext } from '../../declarations'

import { getDateTimeSql } from './get-datetime-sql'

export const emailSettingResolver = resolve<EmailSettingType, HookContext>({})

export const emailSettingExternalResolver = resolve<EmailSettingType, HookContext>(
  {},
  {
    // Convert the raw data into a new structure before running property resolvers
    converter: async (rawData, context) => {
      return {
        ...rawData,
        smtp: JSON.parse(rawData.smtp) as EmailSmtpType,
        subject: JSON.parse(rawData.subject) as EmailSubjectType
      }
    }
  }
)

export const emailSettingDataResolver = resolve<EmailSettingDatabaseType, HookContext>(
  {
    id: async () => {
      return v4()
    },
    createdAt: getDateTimeSql,
    updatedAt: getDateTimeSql
  },
  {
    // Convert the raw data into a new structure before running property resolvers
    converter: async (rawData, context) => {
      return {
        ...rawData,
        smtp: JSON.stringify(rawData.smtp),
        subject: JSON.stringify(rawData.subject)
      }
    }
  }
)

export const emailSettingPatchResolver = resolve<EmailSettingType, HookContext>(
  {
    updatedAt: getDateTimeSql
  },
  {
    // Convert the raw data into a new structure before running property resolvers
    converter: async (rawData, context) => {
      return {
        ...rawData,
        smtp: JSON.stringify(rawData.smtp),
        subject: JSON.stringify(rawData.subject)
      }
    }
  }
)

export const emailSettingQueryResolver = resolve<EmailSettingQuery, HookContext>({})
