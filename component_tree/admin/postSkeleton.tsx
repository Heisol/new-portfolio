import { Center, Paper, Skeleton, Group } from '@mantine/core'
import { v4 as uuidv4 } from 'uuid'

const Page = () => {
  return (
    <Center>
        <Paper radius={'md'} shadow={'md'} p={'md'} style={{minWidth: '60vw', minHeight: '700'}} key={uuidv4()} >
        <Skeleton height={30}  mb="md" width={'50%'} />
        <Group position='left' mb={'md'}>
            <Skeleton height={15} width="30%" radius="xl" />
            <Skeleton height={15} width="30%" radius="xl" />
            <Skeleton height={15} width="30%" radius="xl" />
        </Group>
        <Skeleton height={'50vh'} mt={6} radius="md" />
        </Paper>
    </Center>
  )
}

export default Page
