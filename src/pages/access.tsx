import { Box } from "@chakra-ui/react"
import { GetStaticProps } from "next"
import Head from "next/head"
import React, { FC } from "react"
import { Article } from "src/components/Article"
import { BoxMarkdown } from "src/components/BoxMarkdown"
import { HeadingPage } from "src/components/HeadingPage"
import { Main } from "src/components/Main"
import { Page } from "src/types/page"
import { SiteConfig } from "src/types/sitePage"
import { readMdFile } from "src/utils/readMdFile"

type Props = {
  page: Page
  site: SiteConfig
}

const Access: FC<Props> = ({ page, site }) => {
  return (
    <Main>
      <Head>
        <title>{`${page.title} | ${site.title}`}</title>
        <meta content={site.description} name={"description"} />
      </Head>
      <Article>
        <HeadingPage>{page.title}</HeadingPage>
        <Box>
          <BoxMarkdown>{page.content}</BoxMarkdown>
        </Box>
      </Article>
    </Main>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const page = await readMdFile<Page>("pages", "access")

  const site = await readMdFile<SiteConfig>("configs", "site")

  return { props: { page, site } }
}

export default Access
