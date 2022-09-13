import type { NextPage } from 'next'
import Header from '../component_tree/admin/header'
import { Container, Text, AppShell, Timeline, Avatar, Stack, Box, useMantineTheme,
  Group, HoverCard
 } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useState, useRef } from 'react'
import styles from '../styles/global.module.css'
import { IconBrandJavascript, IconAB2, IconBrandAsana, IconBooks, IconLocation, IconBrandPython, IconBrandNextjs, IconBrandReact, IconServer, IconBrandPhp, IconBrandFacebook, IconPhoneCall, IconBrandGithub, IconMail, IconBrandGoogleDrive } from '@tabler/icons'
import MePicture from '../public/Me.jpg'
import Image from 'next/image'
import Head from 'next/head'

const Page: NextPage = () => {

  const theme = useMantineTheme()
  const scrollToElement = (elementId:string) =>{
    if (!elementId) return
    const targetElement = document.getElementById(elementId)
    targetElement && window.scrollTo({top: targetElement.getBoundingClientRect().top - (window.innerHeight*0.1), behavior: 'smooth'})
  }

  const openGithubLink = ()=>window.open('https://github.com/Heisol', '_blank')
  const openFacebookLink = ()=>window.open('https://facebook.com/aliandrda/', '_blank')
  const copyEmail = () =>{
    navigator.clipboard.writeText('alidejando@gmail.com')
    showNotification({
        title: 'Text copied',
        message: 'The email has been copied to your clipboard'
    })
  }

  const copyPhoneNumber= () =>{
    navigator.clipboard.writeText('+639275407826')
    showNotification({
        title: 'Text copied',
        message: 'The phone number has been copied to your clipboard',
    })
  }

  const seeResume = () =>{
    window.open('https://drive.google.com/file/d/19dmjzHtzYVO45RexeOBkHd0_FTBTqeo8/view?usp=sharing', '_blank')
  }

  return (
    <AppShell
      header={<Header />}
      padding={0}
    >
      <Container style={{backgroundColor: theme.colors.gray[0], height: '100%', width: '100%', color: 'black', padding: '2.5%'}} fluid>
        <Head>
          <title>About Me</title>
        </Head>
        <Stack justify={'center'} align='center' >

        <Box p={'md'} style={{width: '65%'}} >
        <Timeline active={7} bulletSize={35} lineWidth={3}>
          <Timeline.Item title="Javascript, HTML and CSS" id='node1' bullet={<IconBrandJavascript />} className={styles.timelineItem}>
            <Text size={'sm'}>I am a Javascript developer mostly familiar in using NextJs <IconBrandNextjs color='blue' />, React <IconBrandReact color='blue' /> and NodeJs <IconServer color='blue' />.</Text>
            <Text size="xs" color={'dimmed'} mt={4}>Why NextJs? NextJs also comes with API endpoints which are very convenient for development as you don&#39;t need to manage two repositories for a fullstack application.</Text>
          </Timeline.Item>
          <Timeline.Item title="Python" id='node2' bullet={<IconBrandPython/>} className={styles.timelineItem}>
            <Text size={'sm'}>Have some experience with python specifically micropython for embedded systems simulation in Wokwi.</Text>
          </Timeline.Item>
          <Timeline.Item title="Php and MySql" id='node3' bullet={<IconBrandPhp/>} className={styles.timelineItem}>
            <Text size={'sm'}>Have very little experience with Php as I only learned a bit of the language as it is a requirement for the web development subject. 
            Also have no experience of modern Php frameworks like laravel.</Text>
          </Timeline.Item>
          <Timeline.Item title="Quality Assurance" id='node4' bullet={<IconAB2/>} className={styles.timelineItem}>
            <Text size={'sm'}>I have also worked as a Quality Assurance Intern for my past 2 internships</Text>
            <Text size="xs" color={'dimmed'} mt={4}>
              I worked at Eastvantage and Quipper Philippines Inc. during my internships. Manual quality assurance testing was done during my time at those two companies
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Project Management and Agile" id='node5' bullet={<IconBrandAsana/>} className={styles.timelineItem}>
            <Text size={'sm'}>Google Project Management certification from Coursera . <a target={'_blank'} rel='noreferrer' style={{color: 'blue'}} href="https://www.credly.com/badges/d82cae5a-359f-4da7-ba85-cee7e328d62a/public_url">Verify Certificate at credly</a></Text>
            <Text size="xs" color={'dimmed'} mt={4}>
              The program consisted of 6 courses, all done online and is designed to be finished within 6 months.
              The first 5 courses prepared me on how to become a project manager and the final course was kind of a capstone project where you act as the project manager for the a whole project.
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Educational Background" id='node6' bullet={<IconBooks/>} className={styles.timelineItem}>
            <Text size={'sm'}>I graduated from the Polytechnic University of the Philippines with the course of Bachelor of Science in Computer Engineering</Text>
            <Text size="xs" color={'aqua'} mt={4}>2022</Text>
          </Timeline.Item>
          <Timeline.Item title="Location" id='node7' bullet={<IconLocation/>} className={styles.timelineItem}  >
            <Text size={'sm'} >Makati, Philippines</Text>
            <Text size="xs" color={'dimmed'} mt={4}>Last updated at September 2022</Text>
          </Timeline.Item>
          
        </Timeline>
        <Stack justify={'center'} align='center' >
          <Avatar radius={75} size={150}  onClick={()=>{}} >
            <Image
              alt="Its actualy me"
              src={MePicture}
              placeholder="blur"
              layout='fill'
            />
          </Avatar>          
          <Text size={24} color='blue' style={{fontFamily: 'Lucida Console, Courier New, monospace'}} >Ali D. Andrada</Text>
          <Group position='center' >
            <IconMail style={{cursor: 'pointer'}} onClick={copyEmail} className={`${styles.opacityChange} linkIcon`}/>
            <IconPhoneCall style={{cursor: 'pointer'}} onClick={copyPhoneNumber} className={`${styles.opacityChange} linkIcon`}/>
            <IconBrandFacebook style={{cursor: 'pointer'}} onClick={openFacebookLink} className={`${styles.opacityChange} linkIcon`}/>
            <IconBrandGithub style={{cursor: 'pointer'}} onClick={openGithubLink} className={`${styles.opacityChange} linkIcon`}/>
          </Group>
          <Group position='center' align={'center'} style={{cursor: 'pointer'}} onClick={seeResume} className={`${styles.opacityChange} linkIcon`} >
            <Text style={{fontFamily: 'Lucida Console, Courier New, monospace'}} >See resume at</Text>
            <IconBrandGoogleDrive/>
          </Group>
        </Stack>
        </Box>
        </Stack>
      </Container>
    </AppShell>
  )
}

export default Page
