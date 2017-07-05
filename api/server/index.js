import _ from 'lodash'
import BodyParser from 'body-parser'
import EventEmitter from 'events'
import Express from 'express'
import ExpressGraphQL from 'express-graphql'
import http from 'http'
import Localdown from 'localdown'
import Passport from 'passport'
import SocketIO from 'socket.io'

export default class APIServer extends EventEmitter {
  constructor () {
    super()

    this._app = Express()
    this._app.use(BodyParser.urlencoded({ extended: false }))
    this._app.use(BodyParser.json())

    this._server = http.Server(this._app)
    this._io = SocketIO(this._server, { path: '/api/socket.io/' })

    this._io.on('connection', socket => {
      console.log('Socket connected')

      socket.on('hello', () => {
        console.log('hello')
      })
    })

    this.server = this._server.listen(8085, error => {
      if (error) {
        console.error({ error })
        process.exit()
      }
      console.log('Started server...')
    })
  }
}