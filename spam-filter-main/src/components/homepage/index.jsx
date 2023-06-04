import React from 'react';
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'black' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  

  highlight: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}));

export function Homepage() {
  const { classes } = useStyles();
  return (
    <div >
      
      <Container>
        
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Chat Analysis
            </Title>
            <Text color="dimmed" mt="md">
              This project is based on Text Sentiment Analysis.
              It is a prototype for a real system.
              We can use this to detect Sentiment of reviews.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <Check size={12} />
                </ThemeIcon>
              }
            >
              {/* <List.Item>
                <b>React(JS) based</b> – build type safe applications, all components and hooks
                export types
              </List.Item>
              <List.Item>
                <b>Django based</b> – backend is based on Django Rest Framework
              </List.Item>
              <List.Item>
                <b>Free and open source</b> – all packages have MIT license, you can use Mantine in
                any project
              </List.Item> */}
            </List>

            <Group mt={30}>
              <Button component={Link} to='/products' radius="xl" size="md" className={classes.control}>
                Get started
              </Button>
              {/* <Button component="a"  variant="default" radius="xl" size="md" className={classes.control}>
                Source code
              </Button> */}
            </Group>
          </div>
          <Image src="https://miro.medium.com/max/1400/1*oOySIQv43WCy9TyZA0tmmw.jpeg" radius="md" className={classes.image} />
        </div>
      </Container>
    </div>
  );
}