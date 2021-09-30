import { randomInRange } from "../helpers/random"

export enum ETransactionType {
  SEND,
  RECEIVE,
}

interface ITransaction {
  hash: string,
  type: ETransactionType,
  timestamp: string,
  amountBTC: number,
}

export const initITransaction = (opts: Partial<ITransaction>): ITransaction => {
  return {
    hash: opts.hash || '',
    type: opts.type || ETransactionType.SEND,
    timestamp: opts.timestamp || new Date().toISOString(),
    amountBTC: opts.amountBTC || randomInRange(0.1, 500),
  }
}

export default ITransaction
