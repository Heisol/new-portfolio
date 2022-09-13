import { Header, Group, useMantineTheme, Button, Modal } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import styles from '../../styles/global.module.css'
import { useState, useEffect } from 'react'
import { IconPlus } from '@tabler/icons'
import PostForm from './postform'

const Page = ({posts, setPosts}:any) => {
  const router = useRouter()
  const theme = useMantineTheme()
  const [onAdminPage, setOnAdminPage] = useState<boolean>(false)
  const [onPage, setOnPage] = useState<string>('')
  const [postFormModal, setPostFormModal] = useState<boolean>(false)

  useEffect(()=>{
    try {
        if (!router.isReady) return
        setOnAdminPage(router.pathname.split('/').includes('admin'))
        setOnPage(router.pathname.split('/')[1])
    } catch (error:any) {
        showNotification({
            title: 'Error',
            message: error.message || ''
        })
        setTimeout(()=>{return}, 3000)
    }
}, [router])

  return (
    <Header height={60} p="xs" style={{backgroundColor: 'black', border: '0', color:'white', alignItems: 'center', justifyContent:'center'}} fixed >
      <Group position='apart' spacing={'xl'} style={{height: '100%', flexDirection: 'row-reverse'}} >
        <Group position='right' style={{flexDirection: 'row-reverse'}} spacing={'xl'} >
          <button id={'headerAboutMe'} className={`${styles.navButton} ${onPage=='aboutme' && styles.disabled} ${styles.header}`} disabled={onPage == 'aboutme' && true} onClick={()=>router.push('/aboutme')} >About Me</button>
          <button id={'headerProjects'} className={`${styles.navButton} ${onPage=='' && styles.disabled} ${styles.header}`} disabled={onPage == '' && true} onClick={()=>router.push('/')}>Projects</button>
        </Group>
          {onAdminPage && <Button leftIcon={<IconPlus size={14}/>} onClick={()=>setPostFormModal(true)} id="addPostButton" >Add Post</Button>}   
      </Group>
      <Modal
          opened={postFormModal}
          onClose={()=>setPostFormModal(false)}
          withCloseButton={false}
          padding={'xs'}
          size={'60%'}
          overlayOpacity={0.8}
          overlayBlur={0.25}
      >
          <PostForm posts={posts} setPosts={setPosts} setPostFormModal={setPostFormModal} />
      </Modal>
    </Header>
  )
}

export default Page
