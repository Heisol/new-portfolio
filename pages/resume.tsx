import type { NextPage } from 'next'
import Header from '../component_tree/admin/header'
import { Container, Text, AppShell } from '@mantine/core'

const Page: NextPage = () => {
  return (
    <>
    <AppShell
      header={<Header />}
      padding={0}
    >
      <Container style={{backgroundColor: 'white', height: '100%', width: '100%'}} fluid>
        <Text color={'black'} >Hello</Text>
      </Container>
    </AppShell>
    </>
  )
}

export default Page
