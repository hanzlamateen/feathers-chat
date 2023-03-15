import { useState } from "react"
import { client } from "../client"

export const CreateMessage = () => {
  const [text, setText] = useState('')
  const handleSubmit = async () => {
    await client.service('messages').create({ text })
    setText('')
  }

  const createRoute = async () => {
    console.log('Activating route')
    await client.service('route-activate').create({ project: 'default-project', route: '/admin', activate: true })
  }

  return <form className="input-group overflow-hidden" id="send-message" onSubmit={ev => {
    ev.preventDefault()
    handleSubmit()
  }}>
    <input name="text" type="text" value={text} onChange={ev => setText(ev.target.value)}
      placeholder="Compose message" className="input input-bordered w-full" />
    <button type="submit" className="btn">Send</button>
    <button type="button" className="btn" onClick={createRoute}>Create Route</button>
  </form>
}
