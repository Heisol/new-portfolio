import type { NextPage } from 'next'
import Header from '../component_tree/admin/header'
import Footer from '../component_tree/admin/footer'
import { Container, Text, AppShell, Timeline, Button, Group, Paper, Center, Avatar, Stack, Box, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import styles from '../styles/global.module.css'
import { IconBrandJavascript, IconAB2, IconBrandAsana, IconBooks, IconLocation, IconBrandPython, IconBrandNextjs, IconBrandReact, IconServer } from '@tabler/icons'
import MePicture from '../public/Me.jpg'
import Image from 'next/image'

const Page: NextPage = () => {

  const theme = useMantineTheme()
  const [active, setActive] = useState<number>(0)
  const minusActive = () => setActive(active>0?active-1:0)
  const plusActive = () => setActive(active<5?active+1:active)
  const [shownAll, setShownAll] = useState<boolean>(false)

  return (
    <AppShell
      header={<Header />}
      padding={0}
      footer={<Footer/>}
    >
      <Container style={{backgroundColor: theme.colors.gray[0], height: '100%', width: '100%', color: 'black', paddingTop: '0.5%'}} fluid>
        {/* make this a stepper timeline of info */}
        
        {/* add icons */}
        <Group position='apart' >
        <Center style={{height: '100%', width: '30%'}} >
          <Stack justify={'center'} align='center' >
            <Avatar radius={75} size={150} >
              <Image
                alt="Its actualy me"
                src={MePicture}
                placeholder="blur"
                layout='fill'
              />
            </Avatar>          
            <Text size={24} color='blue'>Ali D. Andrada</Text>
            <Group position='center' >
              <Button onClick={minusActive} >Previous</Button>
              <Button onClick={plusActive} >Next</Button>
            </Group>
          </Stack>
        </Center>
        <Box p={'md'} style={{width: '65%'}} >
        <Timeline active={active} bulletSize={35} lineWidth={3}>
          <Timeline.Item title="Javascript, HTML and CSS" bullet={<IconBrandJavascript />}>
            <Text size={'sm'}>I am a Javascript developer mostly familiar in using NextJs <IconBrandNextjs color='blue' />, React <IconBrandReact color='blue' /> and NodeJs <IconServer color='blue' /></Text>
            <Text size="xs" color={'dimmed'} mt={4}>See Projects</Text>
          </Timeline.Item>
          <Timeline.Item title="Quality Assurance" className={`${active>0?styles.fadeIn:styles.fadeOut}`} bullet={<IconAB2/>}>
            <Text size={'sm'}>I have also worked as a Quality Assurance Intern for my past 2 internships</Text>
            <Text size="xs" color={'dimmed'} mt={4}>
              I worked at Eastvantage and Quipper Philippines Inc. during my internships. Manual quality assurance testing was done during my time at those two companies
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Project Management and Agile" className={`${active>1?styles.fadeIn:styles.fadeOut}`} bullet={<IconBrandAsana/>}>
            <Text size={'sm'}>I have also finished the course of Google Project Management in Coursera and earned the certificate for it. <a target={'_blank'} rel='noreferrer' style={{color: 'blue'}} href="https://www.credly.com/badges/d82cae5a-359f-4da7-ba85-cee7e328d62a/public_url">Verify Certificate at credly</a></Text>
            <Text size="xs" color={'dimmed'} mt={4}>
              The program consisted of 6 courses, all done online and is designed to be finished within 6 months.
              The first 5 courses prepared me on how to become a project manager and the final course was kind of a capstone project where you act as the project manager for the a whole project.
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Educational Background" className={`${active>2?styles.fadeIn:styles.fadeOut}`} bullet={<IconBooks/>}>
            <Text size={'sm'}>I graduate from the Polytechnic University of the Philippines with the course of Bachelor of Science in Computer Engineering</Text>
          </Timeline.Item>
          <Timeline.Item title="Location" className={`${active>3?styles.fadeIn:styles.fadeOut}`} bullet={<IconLocation/>}>
            <Text size={'sm'}>I currently live at Makati, Philippines</Text>
          </Timeline.Item>
          <Timeline.Item title="Python" className={`${active>4?styles.fadeIn:styles.fadeOut}`} bullet={<IconBrandPython/>}>
            <Text size={'sm'}>Have some experience with python specifically micropython for embedded systems simulation in Wokwi </Text>
          </Timeline.Item>
        </Timeline>
        </Box>
        </Group>
      </Container>
    </AppShell>
  )
}

export default Page
