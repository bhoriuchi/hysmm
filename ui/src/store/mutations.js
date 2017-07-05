import { mutations as socketMutations } from './stores/socket'
import { extendMutation as extendVueSetMutation } from 'vue-deepset'

export default extendVueSetMutation(Object.assign(
  {},
  socketMutations
))
