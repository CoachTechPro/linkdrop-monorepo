import reducers from './reducers'

const initialState = {
  tokens: [],
  loading: false
}

export default (state = initialState, action = {}) => {
  const newState = { ...state }
  const { type } = action
  const actionMethod = ACTIONS[type]
  if (!actionMethod) return newState

  return actionMethod(newState, action)
}

const ACTIONS = {
  'NFT_TOKENS.SET_TOKENS': reducers.setTokens,
  'NFT_TOKENS.SET_LOADING': reducers.setLoading
}