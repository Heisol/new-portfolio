import { useState, useEffect } from 'react'
import {Container, Group, Stack, Text, Paper, Badge, useMantineTheme, Drawer, Button, Modal,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@mantine/rte'), {
ssr: false,
})
import { v4 as uuidv4 } from 'uuid';
import { cScheme } from '../../local_types/colorscheme';
import { useRouter } from 'next/router';
import PostEditForm from './postformEdit'
import { IconEditCircle, IconTrash } from '@tabler/icons';
import styles from '../../styles/global.module.css'
import { FetchPosts } from './adminproper';

export const randomSort: any = (InputArray: Array<any>)=>{
    if (!Array) return
    let tempArray:Array<any> = []
    while (tempArray.length!==InputArray.length) {
        const getRandomElement = InputArray[Math.floor(Math.random()*InputArray.length-1)]
        if (!tempArray.includes(getRandomElement)) tempArray.push(getRandomElement)
    }
    return tempArray
}

const Page = ({post, setPosts}:any) =>{
    const theme = useMantineTheme()
    const router = useRouter()
    const [isHover, setIsHover] = useState<boolean>(false)
    
    const [colors, setColors] = useState<Array<string>>(randomSort(Object.entries(theme.colors).map((e)=>e[0])))
    console.log(colors)
    const [formEditModal, setFormEditModal] = useState<boolean>(false)
    const [deletePostModal, setDeletePostModal] = useState<boolean>(false)
    const [onAdmin, setOnAdmin] = useState<boolean>(false)

    useEffect(()=>{
        if (!router.isReady) return
        setOnAdmin(router.pathname.split('/').includes('admin'))
    },[router])

    const deleteThisPost = () =>{
        fetch(`/api/deletepost/${post.id}`).then(res=>res.json()).then(resJson=>{
            if (resJson.status == 'success') {
                FetchPosts()
                .then((fetchRes:any)=>{
                    if (!fetchRes) {
                        showNotification({
                            title: 'Error',
                            message: 'Failed to delete. Reloading page in 3 seconds',
                            color: 'red'
                        })
                        setTimeout(()=>location.reload(), 3000)
                        return
                    }
                    setPosts(fetchRes)
                })
                showNotification({
                    title: 'Success',
                    message: 'Post deleted'
                })
                setDeletePostModal(false)
            }
        })
    }

    return(
        <Container fluid >
            {post &&<Paper radius={'md'} shadow={'md'} p={'md'} className={'post'} style={{
            minWidth: '60vw',
            maxWidth: '60vw',
            color: 'white',
            opacity: isHover ? 1 : 0.9,
            transform: isHover ? 'scale(1.0005,1)': '',
            border: isHover ? '1px groove #00FFE0' : ''
             }}
                onMouseEnter={()=>setIsHover(true)}
                onMouseLeave={()=>setIsHover(false)}
            >
                <Stack className='postStack' >
                    <Modal opened={formEditModal} onClose={()=>setFormEditModal(false)} size={'60%'}   >
                        <PostEditForm post={post} setPosts={setPosts} />
                    </Modal>
                    <Modal opened={deletePostModal} onClose={()=>setDeletePostModal(false)} size={'sm'}   >
                        <Text >Are you sure you want to delete this Post?</Text>
                        <Group position='center' mt={10} >
                            <Button id='deletePostConfirm'  variant='outline' color={'red'} leftIcon={<IconTrash/>} onClick={deleteThisPost} >Delete this post</Button>
                            <Button variant='outline' color={'blue'} onClick={()=>setDeletePostModal(false)} >No</Button>
                        </Group>
                    </Modal>
                    <Group position='apart'>
                        <Text color={cScheme.main} weight={500} size={'lg'} className='postTitle' >{post.title}</Text>
                        <Text size='xs' color='dimmed' className='postId' >{post.id}</Text>
                        {onAdmin && <Group position='right' >
                            <IconEditCircle id='editPost' color='blue' className={styles.editButton} onClick={()=>setFormEditModal(true)} />
                            <IconTrash id='deletePostButton' color='blue' className={styles.editButton} onClick={()=>setDeletePostModal(true)} />
                        </Group> }
                    </Group>
                    {(post.tags && !post.tags.includes('')) && <Group position='left' >
                        {post.tags.map((e:any, index:number)=>{
                            return <Badge key={uuidv4()} variant={'dot'} color={colors[index]} >{e}</Badge>
                        })}
                    </Group>}
                    <RichTextEditor value={post.description} readOnly onChange={()=>{}} style={{border: 'none'}} />
                </Stack>
            </Paper>}
        </Container>
    )
}

export default Page