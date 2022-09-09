import { useState} from 'react'
import {Container, Group, Stack, Text, Paper, TextInput, Center, Button, Badge, useMantineTheme} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { Post } from '../../local_types/post'
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@mantine/rte'), {
ssr: false,
})
import { v4 as uuidv4 } from 'uuid';
import { IconPencilPlus } from '@tabler/icons'
import crypto from 'crypto'

const Page = ({posts, setPosts, setPostFormModal}:any) =>{
    const theme = useMantineTheme()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postTitle, setPostTitle] = useState<string>('')
    const [postUrl, setPostUrl] = useState<string>('')
    const [postDescription, setPostDescription] = useState<string>('')
    const [postTags, setPostTags] = useState<Array<string>>([''])
    const addPost = () =>{
        if (!postTitle) {
            showNotification({
                title: 'Error',
                message: 'Post title is required',
                color: 'red'
            })
            return
        }
        const newPost: Post = {
            id: crypto.randomBytes(8).toString('hex'),
            title: postTitle,
            url: postUrl || 'none',
            tags: postTags,
            description: postDescription,
            dateCreated: new Date(),
            lastModified: new Date()
        }
        try {
            setIsLoading(true)
            fetch('/api/newpost', {
                method: 'post',
                body: JSON.stringify(newPost)
            }).then(res=>res.json()).then(resJson=>{
                if (resJson.status == 'success' && resJson.post) {
                    if (!posts) setPosts([newPost])
                    else if (posts) setPosts([...posts, newPost].sort((a,b)=>a.dateCreated>b.dateCreated?-1:1))
                    showNotification({
                        title: 'Success',
                        message: 'Post added'
                    })
                    setPostFormModal(false)
                }
                setIsLoading(false)
            })
        } catch (error:any) {
            showNotification({
                title: 'Error',
                message: error.message || 'Please try again.',
                color: 'red'
            })
            setIsLoading(false)
        }
    }

    return(
            <Container fluid >
                <Paper p={'md'} shadow={'md'} radius={'md'} style={{minHeight: '80vh', maxWidth: '70vw'}}>
                    <Stack justify={'space-between'} >
                    <TextInput label='Title' value={postTitle} onChange={e=>setPostTitle(e.target.value)} required />
                    <TextInput label='Url' value={postUrl} onChange={e=>setPostUrl(e.target.value)} />
                    <TextInput label='Tags' value={postTags} onChange={e=>{
                        if (e.target.value.includes(',')) {
                            let toSplit = e.target.value
                            if (toSplit[0] == ',' && toSplit.length>=2) toSplit = toSplit.slice(1,-1)
                            const splitTags = toSplit.split(',')
                            const trimmedTags = splitTags.map(e=>e.trim())
                            if (trimmedTags.length >= 10 ) {
                                let splicedTags = trimmedTags.splice(0, 9)
                                showNotification({
                                    title: 'Alert',
                                    message: 'You can ony use up to ten(10) tags per post',
                                    color: 'blue'
                                })
                                setPostTags(splicedTags)
                                return
                            }
                            setPostTags(trimmedTags)
                            return
                        } else setPostTags([e.target.value])
                    }} />
                    <Group position='left' >
                    {(postTags[0] !== '' && postTags.length !== 1) && postTags.map((e,index)=>{
                        const keys = Object.keys(theme.colors)
                        const randomColor = theme.colors[keys[ keys.length * Math.random() << 0]]
                        return(
                            <Badge key={uuidv4()} color={randomColor[5] || 'black'} variant={'dot'} >{e}</Badge>
                        )
                    })}
                    </Group>
                    <RichTextEditor value={postDescription} onChange={e=>setPostDescription(e)} controls={[
                    ['bold', 'italic', 'underline', 'link', 'strike', 'blockquote', 'code', 'codeBlock','clean'],
                    ['unorderedList'],
                    ['sup', 'sub'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                    ]}  />
                    <Button loading={isLoading} leftIcon={<IconPencilPlus size={14}/>} onClick={addPost} >Post it</Button>
                    </Stack>
                </Paper>
            </Container>
    )
}

export default Page