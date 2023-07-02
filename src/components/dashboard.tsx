import { ChangeEvent, FormEvent, useState } from "react"
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"

import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'

// import { useUser } from "@clerk/nextjs";


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

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A dummy Text that will go here' }],
  },
];

const theme = extendBaseTheme({
    components: {
      Button,
    },
  })

export default function Dashboard(){
    // const [editor] = useState(() => withReact(createEditor()))
    const myuser = useUser();
    const [postTitle, setPostTitle] = useState<string>('')
    const [postContent, setPostContent] = useState<string>('')

    const createNewPost = api.posts.create.useMutation();

    async function handleCreatePost(e:FormEvent){
        e.preventDefault()
        console.log("Post created")
        // check for empty string from user in title or content
        if(postTitle===null || postTitle==='' || postTitle===undefined){
            console.log("NOO")
            return;
        }
        if(postContent===null || postContent==='' || postContent===undefined){
            console.log("WHATTT")
            return;
        }

        console.log(postContent)
        console.log(postTitle)
        if (!clerkUser.user?.id) {
          console.log("User is not defined");
          return;
        }
        createNewPost.mutate({
            title: postTitle,
            content: postContent,
            userId: clerkUser.user.id,
            skillTag: '',
        })

        


    }

    // const {data} = api.profile.getAll.useQuery(myuser.user?.id);
    // console.log(data)

    // const FetchDetails = api.profile.create();
    // console.log(FetchDetails.mutate({
    //     userId: myuser.user?.id,
    // }));

    const details = api.profile.getData.useQuery();
    // console.log(details.data)

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
