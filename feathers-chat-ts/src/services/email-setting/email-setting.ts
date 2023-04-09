import { emailSettingMethods, emailSettingPath } from './email-setting.schema'

import type { Application } from '../../declarations'
import { EmailSettingService } from './email-setting.class'
import hooks from './email-setting.hooks'

declare module '../../declarations' {
  interface ServiceTypes {
    [emailSettingPath]: EmailSettingService
  }
}

export const emailSetting = (app: Application): void => {
  const options = {
    //TODO: Ideally we should use `emailSettingPath` variable, but since our table name is not `email-setting` therefore hardcoded string is used.
    name: 'emailSetting', // emailSettingPath,
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    multi: true
  }

  app.use(emailSettingPath, new EmailSettingService(options), {
    // A list of all methods this service exposes externally
    methods: emailSettingMethods,
    // You can add additional custom events to be sent to clients here
    events: []
    // docs: emailSettingDocs
  })

  const service = app.service(emailSettingPath)
  service.hooks(hooks)
}
