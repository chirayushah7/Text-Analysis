import React, { useEffect } from 'react';
import { createStyles, Header, Container, Group, Button, Burger, Anchor, Image, Avatar, Menu } from '@mantine/core';
import { useBooleanToggle, useHash } from '@mantine/hooks';
import links from './links';
import { Link } from 'react-router-dom';
import { is_logged_in } from '../services/api';

const HEADER_HEIGHT = 65;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));


export default function Navbar() {
  const { classes } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [hash, setHash] = useHash('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    if (user.email) {
      setHash(user.email);
    }
  }, [setHash])

  const items = links.map((link) => {
    return (
      <Anchor key={link.label} className={classes.link} component={Link} to={link.link} >
        {link.label}
      </Anchor>
    );
  });

  return (
    <Header sx={{ background: '#fff' }} >
      <Container className={classes.inner} fluid>
        <Group>
          <Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />
          <Image width='23%' src='https://dynamic.brandcrowd.com/asset/logo/efc518ab-0a4c-4810-a3f8-2efa2ed81c8b/logo-search-grid-1x?v=636678474478470000&text=detector' alt="App Logo" withPlaceholder/>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        {
          is_logged_in()
          ? <Menu control={<Avatar style={{cursor: 'pointer'}} src={`https://www.gravatar.com/avatar/${hash}`} />}>
              <Menu.Item children={<Anchor component={Link} to='/logout' >Log Out</Anchor>} />
            </Menu>
          : <Button component={Link} to='/login' radius="xl" sx={{ height: 30 }}>
              Login
            </Button>
        }
      </Container>
    </Header>
  );
}
