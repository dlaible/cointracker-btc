import { randomInRange } from '../helpers/random'
import ITransaction from './itransaction'

interface IAddress {
  hash: string,
  balanceBTC: number,
  transactions: ITransaction[],
}

export const initIAddress = (opts: Partial<IAddress>): IAddress => {
  return {
    hash: opts.hash || '',
    balanceBTC: opts.balanceBTC || randomInRange(0, 100),
    transactions: opts.transactions || [],
  }
}

export default IAddress
