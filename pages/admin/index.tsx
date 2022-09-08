import { useState, useEffect } from 'react'
import {Container, Group, Stack, Text, Paper, TextInput, MantineProvider, Center, Button} from '@mantine/core'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { useElementSize } from '@mantine/hooks';
import { IconAt, IconLock } from '@tabler/icons';
import AdminProper from '../../component_tree/admin/adminproper'
import Header from '../../component_tree/admin/header'

const Page = () =>{

    useEffect(()=>{
        const sessionCheck:(string | null) = localStorage.getItem('9028442d3b9e91eaf0601f6f8bc33167')
        if (sessionCheck) {
            fetch('/api/sessioncheck', {
                method: 'post',
                body: JSON.stringify({session: sessionCheck})
            })
            .then(res=>res.json())
            .then(resJson=>{
                if (resJson.sessionCheck) setAuthorized(true)
            })
            .catch((error:any)=>{
                console.log(error.message|| error || 'error')
            })
        }
    },[])

    const [authorized, setAuthorized] = useState<boolean>(false)
    const {ref, width, height} = useElementSize()

    const [emailField, setEmailField] = useState<string>('')
    const [passwordField, setPasswordField] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const Login = () =>{
        if (!emailField || !passwordField) {
            showNotification({
                title: 'Missing credentials field',
                message: 'Please fill in the required fields',
                color: 'red'
            })
            return
        }
        setIsLoading(true)
        try {
            const formBody = new FormData()
            formBody.append('email', emailField.trim())
            formBody.append('password', passwordField.trim())
            fetch('/api/login', {
                method: 'post',
                body: formBody
            })
            .then(res=>res.json())
            .then(resJson=>{
                if (resJson.emailCheck && resJson.passwordCheck && resJson.hash) {
                    localStorage.setItem('9028442d3b9e91eaf0601f6f8bc33167', resJson.hash)
                    setAuthorized(true)
                    showNotification({
                        title: 'Success',
                        message: 'Logging in...',
                        color: 'blue'
                    })
                } else {
                    setAuthorized(false)
                    showNotification({
                        title: 'Invalid credentials',
                        message: 'Please enter the correct credentials',
                        color: 'red',

                    })
                }
                setIsLoading(false)
            })
        } catch(e:any) {
            showNotification({
                title: 'Error',
                message: e.message || '',
                color: 'red'
            })
            setIsLoading(false)
        }
    }

    return(
        <MantineProvider withNormalizeCSS withGlobalStyles>
        <NotificationsProvider>
            <Container fluid style={{background: `linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(41,41,41,1) 25%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%)`}} >
            <Center style={{minHeight: '100vh'}}>
                {!authorized && <Paper shadow="xl" p="md" radius={'xl'} style={{minHeight: 300, minWidth: 300}} ref={ref} >
                    <Center style={{height: height, width: width}} >
                        <Stack justify={'center'} align={'center'} spacing='xl'>
                            <TextInput value={emailField} onChange={(e)=>setEmailField(e.target.value)} label='Email' icon={<IconAt size={14}/>} />
                            <TextInput type='password' value={passwordField} onChange={(e)=>setPasswordField(e.target.value)} label='Password' icon={<IconLock size={14}/>} />
                            <Button type='button' onClick={Login} loading={isLoading ? true : false} >{isLoading? 'Signing In' : 'Sign In'}</Button>
                        </Stack>
                    </Center>
                </Paper>}
                {authorized && <AdminProper/>}
            </Center>
            </Container>
        </NotificationsProvider>
        </MantineProvider>
    )
}

export default Page