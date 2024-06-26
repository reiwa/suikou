import { Box, Stack, Text } from "@chakra-ui/react"
import { FC } from "react"

export const BoxHome: FC = () => {
  return (
    <Box>
      {/* <DivisionBackground /> */}
      <Stack spacing={1}>
        <Text fontWeight={"bold"}>
          {"沖縄/科学 : 海岸・河川・環境・防災 新力学研究"}
        </Text>
        <Text fontWeight={"bold"} fontSize={"4xl"}>
          {"仲座栄三　新力学研究所"}
        </Text>
      </Stack>
    </Box>
  )
}
