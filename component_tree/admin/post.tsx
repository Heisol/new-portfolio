import { useState, useEffect } from 'react'
import {Container, Group, Stack, Text, Paper, Badge, useMantineTheme,
} from '@mantine/core'
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@mantine/rte'), {
ssr: false,
})
import { v4 as uuidv4 } from 'uuid';
import { cScheme } from '../../local_types/colorscheme';

const Page = ({post}:any) =>{
    const theme = useMantineTheme()
    const [isHover, setIsHover] = useState<boolean>(false)
    
    const [colors, setColors] = useState<Array<string>>(Object.entries(theme.colors).map((e)=>e[0]))

    return(
        <Container fluid >
            {post &&<Paper radius={'md'} shadow={'md'} p={'md'} style={{
            minWidth: '400px',
            maxWidth: '60vw',
            minHeight: '500px',
            color: 'white',
            opacity: isHover ? 1 : 0.9,
            transform: isHover ? 'scale(1.0005,1)': '',
            border: isHover ? '1px groove #00FFE0' : ''
             }}
                onMouseEnter={()=>setIsHover(true)}
                onMouseLeave={()=>setIsHover(false)}
            >
                <Stack>
                    <Text color={cScheme.main} weight={500} size={'lg'} >{post.title}</Text>
                    {(post.tags && !post.tags.includes('')) && <Group position='left' >
                        {post.tags.map((e:any, index:number)=>{
                            return <Badge key={uuidv4()} variant={'dot'} color={colors[index]} >{e}</Badge>
                        })}
                    </Group>}
                    <RichTextEditor value={post.description} readOnly onChange={()=>{}}/>
                </Stack>
            </Paper>}
        </Container>
    )
}

export default Page