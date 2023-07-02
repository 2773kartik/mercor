import { ChangeEvent, FormEvent, useState } from "react"
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'


import { Center, Grid, AbsoluteCenter, ChakraBaseProvider, extendBaseTheme, GridItem } from '@chakra-ui/react'
import { toast } from "react-toastify"; 


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

    // details of the user include karma, rating, skills
    const details = api.profile.getData.useQuery();
    console.log(details.data) 

    const totalLikes = api.profile.getTotalLikes.useQuery();

    const addSkill = api.users.addskill.useMutation();
    const {data} = api.skill.getApprovedSkills.useQuery();

    const [selectedOption, setSelectedOption] = useState<string>('');

    function handleSkillChange(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedOption(e.target.value);   
    }

    async function handleSkillAdd(e:FormEvent) {
      e.preventDefault();
      if(selectedOption==='' || selectedOption===null || selectedOption===undefined) {
        toast.warning("Select a tag please!");
        return;
      }
      if (!details.data?.id) {
        console.log("User is not defined");
        return;
      }
      addSkill.mutate({
        id: details.data?.id,
        skillTag: [selectedOption],
      })
    }

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
                  <Box fontFamily={'Roboto'} mt={4} alignItems={'center'} textAlign={'center'} > Add Skill</Box>

                  <form onSubmit={handleSkillAdd}>
                    <div className="w-4/5 mx-auto flex flex-col">
                        
                        <select
                            className="p-2 m-2 text-black border-2 shadow-md rounded outline-none cursor-pointer"
                            value={selectedOption}
                            onChange={handleSkillChange}
                            >
                            {data?.map((skill: { id: string; name: string, approved: boolean }) => (
                                <option key={skill.id} value={skill.id}>
                                {skill.name}
                                </option>
                            ))}
                        </select>
                        <button className="shadow-md bg-orange-400 w-1/2 mx-auto rounded m-2 p-2">Publish</button>

                    </div>
                </form>

                </Box>
              </GridItem>
            </Grid>
        </AbsoluteCenter>

            

          </Box>
        </ChakraBaseProvider>


    )

}
