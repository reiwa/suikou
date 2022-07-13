import { List, ListItem } from "@chakra-ui/react"
import { GetStaticProps } from "next"
import Head from "next/head"
import React, { FC } from "react"
import { CardBook } from "src/components/CardBook"
import { HeadingPage } from "src/components/HeadingPage"
import { Main } from "src/components/Main"
import { Book } from "src/types/book"
import { SiteConfig } from "src/types/sitePage"
import { readMdFile } from "src/utils/readMdFile"
import { readMdFiles } from "src/utils/readMdFiles"

type Props = {
  posts: Book[]
  site: SiteConfig
}

const ArticlesIndex: FC<Props> = ({ posts, site }) => {
  return (
    <Main>
      <Head>
        <title>{`書籍 | ${site.title}`}</title>
        <meta content={site.description} name={"description"} />
      </Head>
      <HeadingPage>{"書籍"}</HeadingPage>
      <List spacing={{ base: 4, md: 6 }}>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <CardBook book={post} />
          </ListItem>
        ))}
      </List>
    </Main>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await readMdFiles<Book>("books")

  const site = await readMdFile<SiteConfig>("configs", "site")

  return { props: { posts, site } }
}

export default ArticlesIndex
