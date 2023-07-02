import { ChangeEvent, FormEvent, useState } from "react"
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"

import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'


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

const { Button } = chakraTheme.components


const theme = extendBaseTheme({
    components: {
      Button,
    },
  })

export default function Dashboard(){
    const myuser = useUser();

    const details = api.profile.getData.useQuery();

    const totalLikes = api.profile.getTotalLikes.useQuery();
    console.log(totalLikes)

    return (
        <ChakraBaseProvider theme={theme}>
          <Box p={8}>
            <Flex alignItems="center" mb={6}>
                <Box p={10}>
                    <Avatar src={myuser.user?.profileImageUrl} size="xs" mr={20} />
                </Box>
              <Box>
                <Heading>{myuser.user?.fullName}</Heading>
                <Box>{myuser.user?.emailAddresses[0]?.emailAddress}</Box>
              </Box>
            </Flex>

            <Flex justifyContent="space-between" mb={8}>
              <Stat>
                <StatLabel>Total Likes</StatLabel>
                <StatNumber>{totalLikes.data}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Karma Points</StatLabel>
                <StatNumber>{details.data?.karma}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Rating</StatLabel>
                <StatNumber>{details.data?.rating}</StatNumber>
              </Stat>

            </Flex>

          </Box>
        </ChakraBaseProvider>


    )

}
