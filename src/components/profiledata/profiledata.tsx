import {
  Center,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'

import IAddress, { initIAddress } from '../../interfaces/iaddress'
import { initITransaction } from '../../interfaces/itransaction'
import Address from '../address/address'

const ENTER_KEY = 13

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
        toast({
          title: 'Invalid address.',
          status: 'error',
          isClosable: true,
          position: 'top-right',
        })
        return
      }

      // Create a new address object and save it to the state
      const newAddress = initIAddress({
        hash: inputAddress,
        transactions: [
          initITransaction({ hash: '1' }),
          initITransaction({ hash: '2' }),
          initITransaction({ hash: '3' }),
        ],
      })
      setAddresses([...addresses, newAddress])
    }
  }

  // Determine which elements to display depending on the number of addresses
  let addressElems: any = <NoAddresses />
  if (addresses.length) {
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
