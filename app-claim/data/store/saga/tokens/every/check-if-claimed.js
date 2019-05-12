import { put, call } from 'redux-saga/effects'
import { ethers } from 'ethers'
import { factory } from 'config'
import { defineNetworkName } from 'linkdrop-commons'
import FactoryMock from 'contracts/TokenMock.json'

const generator = function * ({ payload }) {
  try {
    yield put({ type: 'USER.SET_LOADING', payload: { loading: true } })
    const { senderAddress, linkKey, networkId } = payload
    const networkName = defineNetworkName({ networkId })
    const provider = yield ethers.getDefaultProvider(networkName)
    const linkWallet = yield new ethers.Wallet(linkKey, provider)
    const linkId = yield linkWallet.address
    const factoryContract = yield new ethers.Contract(factory, FactoryMock.abi, provider)
    console.log({ factoryContract, linkId, senderAddress })
    const claimed = yield factoryContract.isClaimedLink(senderAddress, linkId)
    yield put({ type: 'USER.SET_ALREADY_CLAIMED', payload: { alreadyClaimed: true } })

    yield put({ type: 'USER.SET_READY_TO_CLAIM', payload: { readyToClaim: true } })
    yield put({ type: 'USER.SET_LOADING', payload: { loading: false } })
  } catch (e) {
    console.error(e)
  }
}

export default generator
