import type { NextPage } from 'next'
import AdminProper from '../component_tree/admin/adminproper'
import { Container} from '@mantine/core'

const Home: NextPage = () => {

  return (
    <Container fluid p={0} >
      <AdminProper />
    </Container>
  )
}

export default Home
