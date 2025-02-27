/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { Container, NavItemContainer } from './styles'
import { ChartLineUp, Binoculars, User } from '@phosphor-icons/react'
import { useMemo } from 'react'
import { useSession } from 'next-auth/react'

const NAV_ITEMS = [
  {
    label: 'Início',
    href: '/',
    icon: <ChartLineUp size={24} />,
  },
  {
    label: 'Explorar',
    href: '/explore',
    icon: <Binoculars size={24} />,
  },
]

export const Navigation = () => {
  const router = useRouter()

  const { data: session } = useSession()

  const navItems = useMemo(() => {
    if (session) {
      return NAV_ITEMS.concat({
        label: 'PERFIL',
        href: `/profile/${session.user.id}`,
        icon: <User size={24} />,
      })
    }
    return NAV_ITEMS
  }, [session])

  return (
    <Container>
      {NAV_ITEMS.map(({ href, label, icon }) => (
        <NavItemContainer
          href={href}
          key={label}
          active={router.asPath === href}
        >
          {icon}
          {label}
        </NavItemContainer>
      ))}
    </Container>
  )
}
