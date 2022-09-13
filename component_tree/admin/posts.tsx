import type { NextPage, NextComponentType } from 'next'
import { Container, Stack } from '@mantine/core'
import { v4 as uuidv4 } from 'uuid'
import PostComponent from './post'
import {Post} from '../../local_types/post'
import PostForm from './postform'
import { SetStateAction } from 'react'
import { Post as PostType } from '../../local_types/post'
import { Dispatch } from 'react'

// add editing on admin path

const Page = ({posts, setPosts}:{posts: Array<Post>, setPosts: Dispatch<SetStateAction<Array<PostType>| null>>}) => {
  return (
    <Stack align={'center'} spacing="xl" >
        {posts?.map((e:any)=><PostComponent key={uuidv4()} post={e} setPosts={setPosts} />)}
    </Stack>
  )
}

export default Page
