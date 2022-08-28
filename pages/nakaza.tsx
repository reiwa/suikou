import { Heading, HStack, Stack, StackDivider, Text } from "@chakra-ui/react"
import { GetStaticProps } from "next"
import Head from "next/head"
import React, { FC } from "react"
import { Article } from "app/components/Article"
import { Main } from "app/components/Main"
import { NakazaPage } from "app/types/nakazaPage"
import { ProjectPage } from "app/types/projectPage"
import { SiteConfig } from "app/types/sitePage"
import { readMdFile } from "app/utils/readMdFile"

type Props = {
  nakazaPage: NakazaPage
  projectPage: ProjectPage
  site: SiteConfig
}

const Nakaza: FC<Props> = (props) => {
  return (
    <Main>
      <Head>
        <title>{`${props.nakazaPage.title} | ${props.site.title}`}</title>
        <meta content={props.site.description} name={"description"} />
      </Head>
      <Article>
        <Stack
          direction={{ base: "column", xl: "row" }}
          spacing={{ base: 4, md: 6 }}
        >
          <Stack spacing={{ base: 4, md: 6 }} flex={1}>
            <Stack p={6} rounded={"lg"} bg={"gray.100"}>
              <Text textColor={"gray.700"}>{"教授"}</Text>
              <Text>
                <HStack>
                  <Heading as={"h1"} fontWeight={"bold"} fontSize={"2xl"}>
                    {props.nakazaPage.name}
                  </Heading>
                  <Text fontSize={"sm"} pl={4}>
                    {props.nakazaPage.name_en}
                  </Text>
                </HStack>
              </Text>
              <Text>{props.nakazaPage.email}</Text>
            </Stack>
            <Stack rounded={"lg"} bg={"gray.100"} px={6} pt={6} pb={4}>
              <Heading as={"h2"} fontWeight={"bold"} fontSize={"lg"}>
                {"略歴"}
              </Heading>
              <Stack
                as={"ul"}
                divider={<StackDivider borderColor={"gray.300"} />}
              >
                {props.nakazaPage.histories.map((history, index) => (
                  <Stack py={2} key={index} spacing={0}>
                    <HStack>
                      <Text fontWeight={"bold"} fontSize={"2xl"}>
                        {history.year}
                      </Text>
                      <Text ml={2}>{history.text}</Text>
                    </HStack>
                    <Text pt={2}>{history.text_en}</Text>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
          <Stack flex={1} spacing={{ base: 4, md: 6 }}>
            <Stack
              p={6}
              rounded={"lg"}
              bg={"gray.100"}
              divider={<StackDivider borderColor={"gray.300"} />}
            >
              <Text pb={4} whiteSpace={"pre-wrap"}>
                {props.nakazaPage.description.trim()}
              </Text>
              <Text pt={4} whiteSpace={"pre-wrap"}>
                {props.nakazaPage.description_en.trim()}
              </Text>
            </Stack>
            <Stack
              rounded={"lg"}
              spacing={4}
              px={6}
              pt={6}
              pb={4}
              bg={"gray.100"}
            >
              <Heading as={"h2"} fontSize={"lg"} fontWeight={"bold"}>
                {"研究・プロジェクト"}
              </Heading>
              <Stack
                as={"ul"}
                divider={<StackDivider borderColor={"gray.300"} />}
              >
                {props.projectPage.projects.map((history, index) => (
                  <Stack as={"li"} key={index}>
                    <Text py={2} align={"left"}>
                      {history.title}
                    </Text>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Article>
    </Main>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const unsoetedNakazaPage = await readMdFile<NakazaPage>("pages", "nakaza")

  const histories = [...unsoetedNakazaPage.histories]

  histories.reverse()

  const nakazaPage = { ...unsoetedNakazaPage, histories }

  const projectPage = await readMdFile<ProjectPage>("pages", "project")

  const site = await readMdFile<SiteConfig>("configs", "site")

  return { props: { nakazaPage, projectPage, site } }
}

export default Nakaza
