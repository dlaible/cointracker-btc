import {
  Center,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
  Badge,
} from '@chakra-ui/react'

import ITransaction, { ETransactionType } from '../../interfaces/itransaction'

const NoTransactions = () => {
  return (
    <Center p='3'>
      No transactions 😢
    </Center>
  )
}

const Transaction = (props: { transaction: ITransaction }) => {
  const typeBadge = props.transaction.type === ETransactionType.SEND ? <Badge>Send</Badge> : <Badge>Receive</Badge>

  return (
    <Tr>
      <Td isTruncated>{props.transaction.hash}</Td>
      <Td>{typeBadge}</Td>
      <Td>{props.transaction.timestamp}</Td>
      <Td isNumeric>{props.transaction.amountBTC.toFixed(8)}</Td>
    </Tr>
  )
}

const TransactionTable = (props: { transactions: ITransaction[] }) => {
  // Exit early if there are no transactions to display
  if (!props.transactions.length) {
    return <NoTransactions />
  }

  const transactionElems = props.transactions.map((t) => <Transaction key={t.hash} transaction={t} />)

  return (
    <Table size='sm'>
      <Thead>
        <Tr>
          <Th>Hash</Th>
          <Th>Type</Th>
          <Th>Timestamp</Th>
          <Th isNumeric>Amount (BTC)</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactionElems}
      </Tbody>
    </Table>
  )
}

export default TransactionTable
