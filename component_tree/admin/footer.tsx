import {Footer, Group, Button} from '@mantine/core'
import { IconPhoneCalling, IconMail } from '@tabler/icons'
import { showNotification } from '@mantine/notifications'

const Page = () =>{

    const copyPhoneNumber= () =>{
        navigator.clipboard.writeText('+639275407826')
        showNotification({
            title: 'Text copied',
            message: 'The phone number has been copied to your clipboard',
        })
    }

    const copyEmail= () =>{
        navigator.clipboard.writeText('alidejando@gmail.com')
        showNotification({
            title: 'Text copied',
            message: 'The email has been copied to your clipboard'
        })
    }

    return(
        <Footer height={50}  p="xs" style={{backgroundColor: 'black', border: '0', color:'white', alignItems: 'center', justifyContent:'center'}}>
            <Group position='center'>
                <Button size='xs' variant='subtle' leftIcon={<IconPhoneCalling size={14}/>} onClick={()=>copyPhoneNumber()} >&#43;639275407826</Button>
                <Button size='xs' variant='subtle' leftIcon={<IconMail size={14}/>} onClick={()=>copyEmail()} >alidejando&#64;gmail.com</Button>
            </Group>
        </Footer>
    )
}

export default Page