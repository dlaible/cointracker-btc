import {
  Center,
  Heading,
  Input,
  Stack,
  useToast,
  Skeleton,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

import IAddress, { initIAddress } from '../../interfaces/iaddress'
import { initITransaction } from '../../interfaces/itransaction'
import Address from '../address/address'

const ENTER_KEY = 13

const LoadingAddresses = () => {
  return (
    <Stack>
      <Skeleton height='20px' />
      <Skeleton height='20px' />
      <Skeleton height='20px' />
    </Stack>
  )
}

const NoAddresses = () => {
  return (
    <Center p='5' bg='gray.900' borderRadius='md'>
      No addresses 😢
    </Center>
  )
}

const ProfileData = () => {
  const toast = useToast()
  const [addAddressText, setAddAddressText] = useState('')
  const [addresses, setAddresses] = useState<IAddress[]>([])
  const [loading, setLoading] = useState(false)

  // Common error handler
  const handleError = (errorStr: string) => {
    toast({
      title: errorStr,
      status: 'error',
      isClosable: true,
      position: 'top-right',
    })
    console.error(errorStr)

    // Make sure loading is canceled
    setLoading(false)
  }

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value
    setAddAddressText(text)
  }

  const handleKeyPress = (e: any) => {
    // Perform logic when ENTER is pressed while the input is focused
    if (e.charCode === ENTER_KEY) {
      const inputAddress = e.target.value.trim()

      // Clear out the input
      setAddAddressText('')

      // Check that the address is valid. Note that an address can not be added
      // to the same user more than once
      if (inputAddress.length < 26 || inputAddress.length > 35 || addresses.find((a) => a.hash === inputAddress)) {
        handleError('Invalid address.')
        return
      }

      // Set the UI as loading data
      setLoading(true)

      // Get transaction data for the given address via blockchair
      axios.get(`https://api.blockchair.com/bitcoin/dashboards/address/${inputAddress}`)
        .then((resp) => {
          if (resp.status !== 200) {
            handleError('Invalid response.')
            return
          }

          // Retrieve the transaction data
          const transactions = resp.data && resp.data.data && resp.data.data[inputAddress] && resp.data.data[inputAddress].transactions
          const newTransactions = transactions.map((t: string) => initITransaction({
            hash: t,
          }))

          // Create a new address object and save it to the state
          const newAddress = initIAddress({
            hash: inputAddress,
            transactions: newTransactions,
          })
          setAddresses([...addresses, newAddress])
          setLoading(false)
        })
        .catch((e) => handleError('Request failure.'))
    }
  }

  // Determine which elements to display depending on the number of addresses
  let addressElems: any = <NoAddresses />

  if (loading) {
    addressElems = <LoadingAddresses />
  } else if (addresses.length) {
    addressElems = addresses.map((a) => <Address key={a.hash} address={a} />)
  }

  return (
    <>
      <Input
        mt='4'
        size='lg'
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder='Add address...'
        variant='filled'
        value={addAddressText}
      />
      <Heading size='md' mt='4'>Addresses</Heading>
      <Stack mt='1'>
        {addressElems}
      </Stack>
    </>
  )
}

export default ProfileData
