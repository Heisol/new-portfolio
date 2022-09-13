import { useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import {
    Container, useMantineTheme, AppShell
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { Post } from '../../local_types/post' // interface type for posts
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@mantine/rte'), {
ssr: false,
})
import "react-activity/dist/library.css";
//components
import Header from './header'
import PostsComponent from './posts'
import PostSkeleton from './postSkeleton'

const fetchPosts:any = () =>{
    try {
        return fetch('/api/fetchposts')
        .then(res=>res.json())
        .then((resJson:any)=> {
            if (resJson.status == 'success' && resJson.posts) {
                const sortedPosts = resJson.posts.map((e:any)=>{
                    e.id = e._id
                    delete e._id
                    return e
                }).sort((a:Post,b:Post)=>a.dateCreated>b.dateCreated?-1:1)
                return sortedPosts
            } else return false
        })
    } catch (error) {
        return error   
    }
}

const Page = () =>{
    const router = useRouter()
    const theme = useMantineTheme()
    const [posts, setPosts] = useState<Array<Post> | null>(null)
    const [isReady, setIsReady] = useState<boolean>(false)
    const [onPage, setOnPage] = useState<string>('')

    useEffect(()=>{
        try {
            if (!router.isReady) return
            setOnPage(router.pathname.split('/')[1])
            fetchPosts()
            .then((res:any)=>{
                if (!res) return
                setPosts(res)
                setIsReady(true)
            })
        } catch (error:any) {
            showNotification({
                title: 'Error',
                message: error.message || ''
            })
            setTimeout(()=>{return}, 3000)
        }
    }, [router])

    return(
        <AppShell
         padding={0}
         styles={(theme) => ({
           main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
         })}
        >
        <>
        <Header posts={posts} setPosts={setPosts} />
        <Container fluid style={{ padding: '2.5%', margin: 0, paddingTop: '2.5%', backgroundColor: theme.colors.gray[3], minHeight: '100%'}}>
            { isReady && posts ?
            <>
                {
                    posts?.length==0 ? "The user hasn't posted anything yet": <PostsComponent posts={posts} setPosts={setPosts} />
                }
            </>
            : <PostSkeleton/>
            }
        </Container>
        </>
        </AppShell>
    )
}

export default Page
export const FetchPosts:Function = fetchPosts