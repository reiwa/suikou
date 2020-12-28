import clsx from 'clsx'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { FunctionComponent } from 'react'
import { CardClassPost } from '../../components/CardClassPost'
import { HeadingPage } from '../../components/HeadingPage'
import { List } from '../../components/List'
import { Main } from '../../components/Main'
import { ClassPost } from '../../types/classPost'
import { SiteConfig } from '../../types/sitePage'

type Props = {
  posts: ClassPost[]
  site: SiteConfig
}

const FeedbacksIndex: FunctionComponent<Props> = ({ posts, site }) => {
  return (
    <Main>
      <Head>
        <title>{`講義の感想 | ${site.title}`}</title>
        <meta content={site.description} name={'description'} />
      </Head>
      <HeadingPage>{'講義の感想'}</HeadingPage>
      <List>
        {posts.map((post, i) => (
          <li className={clsx(i !== 0 && 'pt-4 md:pt-8')} key={post.id}>
            <CardClassPost post={post} />
          </li>
        ))}
      </List>
    </Main>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { readMdFiles } = await import('../../utils/readMdFiles')

  const unsortedPosts = await readMdFiles<ClassPost>('feedbacks')

  const posts = unsortedPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const { readMdFile } = await import('../../utils/readMdFile')

  const site = await readMdFile<SiteConfig>('configs', 'site')

  return { props: { posts, site } }
}

export default FeedbacksIndex
