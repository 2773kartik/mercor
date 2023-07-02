import { ChangeEvent, FormEvent, useState } from "react"
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'


import { Center, Grid, AbsoluteCenter, ChakraBaseProvider, extendBaseTheme, GridItem } from '@chakra-ui/react'


import {
  Avatar,
  Box,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import chakraTheme from '@chakra-ui/theme'
import { relative } from "path";

const { Button } = chakraTheme.components


const theme = extendBaseTheme({
  colors: {
    orange : '#F56565',
  },
  styles: {
    global: {
      body: {        
        
      }
    }
  },
  components: {
      Button,
    },
  })

export default function Dashboard(){
    const myuser = useUser();

    const details = api.profile.getData.useQuery();

    const totalLikes = api.profile.getTotalLikes.useQuery();

    return (
        <ChakraBaseProvider theme={theme}>
          <Box position='relative' h='45rem' w='100%' bgGradient="linear(to-r, #766DFF, #88F3FF)">
            <AbsoluteCenter axis='both' p={8} w='50%' bg={'gray.200'} borderRadius='lg'>
                <Grid templateColumns='repeat(2, 1fr)' gap={0}>
                  <GridItem w='100%' h='20%'>
                    <Box p={4} textAlign='center' >
                        <Avatar src={myuser.user?.profileImageUrl} size="xs" m={10} />
                    </Box>
                  </GridItem>
                  <GridItem w='100%' h='20%' verticalAlign='center'>
                    <Box alignContent={'center'} m={'10'}>
                      <Heading fontSize={30} fontWeight={'bold'} fontFamily='"Heebo", sans-serif'>{myuser.user?.fullName}</Heading>
                      <Box fontSize={13} fontWeight={'bold'} mt={3} fontFamily="'Roboto', sans-serif">{myuser.user?.emailAddresses[0]?.emailAddress}</Box>
                      
                      <Box fontFamily={'Roboto'} mt={4}> Total Likes: {totalLikes.data}</Box>
                      <Box fontFamily={'Roboto'} mt={4}> Karma Points: {details.data?.karma}</Box>
                      <Box fontFamily={'Roboto'} mt={4}> Rating: {details.data?.rating}</Box>
                    
                    </Box>
                  </GridItem>
                </Grid>
            </AbsoluteCenter>
          </Box>
        </ChakraBaseProvider>


    )

}
