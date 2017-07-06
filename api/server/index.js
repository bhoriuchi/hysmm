import _ from 'lodash'
import BodyParser from 'body-parser'
import Bunyan from 'bunyan'
import EventEmitter from 'events'
import Express from 'express'
import ExpressGraphQL from 'express-graphql'
import http from 'http'
import Levelup from 'levelup'
import Passport from 'passport'
import path from 'path'
import SocketIO from 'socket.io'

export default class APIServer extends EventEmitter {
  constructor () {
    super()

    this.log = Bunyan.createLogger({
      name: 'hysmm',
      streams: [
        {
          stream: process.stdout
        },
        {
          path: path.resolve(__dirname, '../../logs/server.log')
        }
      ]
    })

    this.db = Levelup(path.resolve(__dirname, 'config'), { db: require('localdown') })
    this.port = 8085
    this._app = Express()
    this._app.use(BodyParser.urlencoded({ extended: false }))
    this._app.use(BodyParser.json())

    this._server = http.Server(this._app)
    this._io = SocketIO(this._server, { path: '/api/socket.io/' })

    this._io.on('connection', socket => {
      this.log.info('Socket connected')

      socket.on('BACKEND_STATE', () => {
        this.db.get('config', (err, value) => {
          socket.emit('BACKEND_STATE', (err || !value) ? 'uninitialized' : 'initialized')
        })
      })
    })

    this.server = this._server.listen(this.port, err => {
      if (err) {
        this.log.fatal(err)
        process.exit()
      }
      this.log.info('Started server...')
    })
  }
}