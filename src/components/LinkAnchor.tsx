import clsx from 'clsx'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Text } from '@chakra-ui/react'

type Props = {
  href: string
  active: boolean
}

export const LinkAnchor: FunctionComponent<Props> = ({
  active,
  children,
  href,
}) => {
  return (
    <Link href={href}>
      <Text textColor={active ? 'blue' : null}>{children}</Text>
    </Link>
  )
}
