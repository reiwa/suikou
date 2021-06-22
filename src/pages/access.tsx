import { GetStaticProps } from 'next'
import Head from 'next/head'
import { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import { Article } from '../components/Article'
import { HeadingPage } from '../components/HeadingPage'
import { Main } from '../components/Main'
import { Page } from '../types/page'
import { SiteConfig } from '../types/sitePage'
import { readMdFile } from '../utils/readMdFile'
import { Box, HStack, Text } from '@chakra-ui/react'

type Props = {
  page: Page
  site: SiteConfig
}

const Access: FunctionComponent<Props> = ({ page, site }) => {
  return (
    <Main>
      <Head>
        <title>{`${page.title} | ${site.title}`}</title>
        <meta content={site.description} name={'description'} />
      </Head>
      <Article>
        <HeadingPage>{page.title}</HeadingPage>
        <Box
          className={'markdown'}
          whiteSpace={'pre-wrap'}
          pt={{ base: 4, md: 8 }}
          as={ReactMarkdown}
        >
          {page.content}
        </Box>
      </Article>
    </Main>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const page = await readMdFile<Page>('pages', 'access')

  const site = await readMdFile<SiteConfig>('configs', 'site')

  return { props: { page, site } }
}

export default Access
