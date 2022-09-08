import type { NextPage, NextComponentType } from 'next'
import { Container, Stack } from '@mantine/core'
import { v4 as uuidv4 } from 'uuid'
import PostComponent from './post'
import {Post} from '../../local_types/post'
import PostForm from './postform'

// add editing on admin path

const Page = ({posts}:{posts: Array<Post>}) => {
  return (
    <Stack align={'center'} spacing="xl" >
        {posts?.map((e:any)=><PostComponent key={uuidv4()} post={e} />)}
    </Stack>
  )
}

export default Page
