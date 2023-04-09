import { message } from './messages/messages'
import { user } from './users/users'
import { emailSetting } from './email-setting/email-setting'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(message)
  app.configure(user)
  app.configure(emailSetting)
  // All services will be registered here
}
