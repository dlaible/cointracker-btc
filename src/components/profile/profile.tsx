import {
  Center,
  Heading,
  Stack,
  Avatar,
  Badge,
} from '@chakra-ui/react'

const Profile = () => {
  return (
    <Stack spacing='1'>
      <Center>
        <Avatar size='xl' />
      </Center>
      <Center>
        <Heading size='md'>John Doe</Heading>
      </Center>
      <Center>
        <Heading size='xs' fontWeight='light'>
          john.doe@example.com <Badge colorScheme='green'>Verified</Badge>
        </Heading>
      </Center>
    </Stack>
  )
}

export default Profile
