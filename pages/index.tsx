import type { NextPage } from 'next'
import AdminProper from '../component_tree/admin/adminproper'
import { Container} from '@mantine/core'
import Head from 'next/head'

const Home: NextPage = () => {



  return (
    <Container fluid p={0} >
      <Head>
        <title>Projects</title>
      </Head>
      <AdminProper />
    </Container>
  )
}

export default Home
