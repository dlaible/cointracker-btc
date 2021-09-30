import {
  Heading,
  Text,
  Box,
  Stack,
  Divider,
  Spacer,
} from '@chakra-ui/react'

import IAddress from '../../interfaces/iaddress'
import TransactionTable from '../transactiontable/transactiontable'

const Address = (props: { address: IAddress }) => {
  return (
    <Box p='5' bg='gray.900' borderRadius='md'>
      <Stack>
        <Stack direction='row' mb='3'>
          <Stack spacing='1'>
            <Heading size='sm'>{props.address.hash}</Heading>
            <Text as='span' fontWeight='light' fontSize='sm'>Updated 25s ago</Text>
          </Stack>
          <Spacer />
          <Stack spacing='0' textAlign='right'>
            <Heading size='sm'>{props.address.balanceBTC.toFixed(8)} BTC</Heading>
            <Text as='span' fontWeight='light' fontSize='sm'>Balance</Text>
          </Stack>
        </Stack>
        <Heading size='sm'>Transactions</Heading>
        <Divider />
        <TransactionTable transactions={props.address.transactions} />
      </Stack>
    </Box>
  )
}

export default Address
