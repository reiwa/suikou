import clsx from 'clsx'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { FunctionComponent } from 'react'
import { HeadingPage } from '../../core/HeadingPage'
import { List } from '../../core/List'
import { Main } from '../../core/Main'
import { CardBook } from '../../post/CardBook'
import { Book } from '../../types/book'

type Props = { posts: Book[] }

const ArticlesIndex: FunctionComponent<Props> = ({ posts }) => {
  return (
    <Main>
      <Head>
        <title>{'書籍'}</title>
      </Head>
      <HeadingPage>{'書籍'}</HeadingPage>
      <List>
        {posts.map((post, i) => (
          <li className={clsx(i !== 0 && 'pt-4 md:pt-8')} key={post.id}>
            <CardBook book={post} />
          </li>
        ))}
      </List>
    </Main>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { readMdFiles } = await import('../../helpers/readMdFiles')

  const posts = await readMdFiles<Book>('books')

  return { props: { posts } }
}

export default ArticlesIndex
