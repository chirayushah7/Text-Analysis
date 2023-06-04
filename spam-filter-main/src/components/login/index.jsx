import {
    Anchor, Button, Checkbox, Container,
    Group, Paper, PasswordInput, Tabs, TextInput
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api, { is_logged_in } from '../services/api';



export function Login() {
    const router = useLocation();
    const navigate = useNavigate();
    const active = (router.pathname === '/login') ? 0 : 1

    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        },
        validationRules: {
            username: (val) => val.length >= 6,
            password: (val) => val.length >= 6
        },
        errorMessages: {
            username: 'Should be more than 6 characters',
            password: 'Incorrect password'
        }
    })
    const signup = useForm({
        initialValues: {
            username: '',
            password: '',
            email: '',
            confirmPassword: ''
        },
        validationRules: {
            username: (val) => val.length >= 6,
            password: (val) => val.length >= 6,
            email: (val) => val.length >= 6,
            confirmPassword: (confirmpassword, values) => confirmpassword === values.password
        },
        errorMessages: {
            username: 'Should be more than 6 characters',
            password: 'Incorrect password',
            email: 'Incorrect email',
            confirmPassword: 'password mismatched'
        }
    })

    const handleRegister = (register) => {
        showNotification({
            id: 'register',
            loading: true,
            title: 'Registering...',
            message: 'Submitting your registration...',
            autoClose: false,
            disallowClose: true,
        })
        api.post('/users/register', {
            username: register.username,
            password: register.password,
            email: register.email
            }).then(res => {
                const data = {
                    title: 'Success',
                    message: 'Registration successful',
                    color: 'green',
                }
                if (res.data?.message) {
                    data.message = res.data.message
                    signup.reset()
                    navigate('/login')
                } else {
                    data.message = res.data.error
                    data.title = 'Error'
                    data.color = 'red'
                }
                updateNotification({
                    id: 'register',
                    ...data
                })
            }).catch(err => {
                updateNotification({
                    id: 'register',
                    title: 'Error',
                    message: err?.response?.data?.error ?? err?.message ?? 'Error submitting data',
                    color: 'red'
                })
            })
    }

    const handleLogin = (values) => {
        showNotification({
            id: 'login',
            title: 'Logging in...',
            message: 'Submitting your login...',
            autoClose: false,
            disallowClose: true,
            loading: true
        })
        api.post('/users/login', {
            username: values.username,
            password: values.password
        }).then(res => {
            console.log(res)
            const data = {
                title: 'Success',
                message: 'Login successful',
                color: 'green',
            }
            if (res.data?.message) {
                data.message = res.data.message
                form.reset()
                api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
                sessionStorage.setItem('auth_token', res.data.token)
                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                navigate('/')
            } else {
                data.message = res.data.error
                data.title = 'Error'
                data.color = 'red'
            }
            updateNotification({
                id: 'login',
                ...data
            })
        }).catch(err => {
            updateNotification({
                id: 'register',
                title: 'Error',
                message: err?.response?.data?.error ?? err?.message ?? 'Error submitting data',
                color: 'red'
            })
        })
    }

    useEffect(() => {
        if(is_logged_in()){
            navigate(-1)
            showNotification({ message: 'You are already logged in', color: 'green' })
        }
    }, [navigate])

    return (
        <Container sx={{ margin: 'auto' }} style={{minWidth: '350px'}}>
            <Tabs tabPadding="sm" grow active={active} onTabChange={(ind) => navigate((ind === 1) ? '/signup' : '/login')}>
                <Tabs.Tab label='Login'>
                    <form onSubmit={form.onSubmit(values => form.validate && handleLogin(values))}>
                        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                            <TextInput label="Username" placeholder="username" {...form.getInputProps('username')} required />
                            <PasswordInput label="Password" placeholder="password" {...form.getInputProps('password')} required mt="md" />
                            <Group position="apart" mt="md">
                                <Checkbox label="Remember me" />
                                {/* TODO: add route */}
                                <Anchor onClick={(event) => event.preventDefault()} href="#" size="sm">
                                    Forgot password?
                                </Anchor>
                            </Group>
                            <Button type='submit' fullWidth mt="xl">
                                Login
                            </Button>
                        </Paper >
                    </form>
                </Tabs.Tab>

                <Tabs.Tab label='SignUp'>
                    <form onSubmit={signup.onSubmit(values => signup.validate && handleRegister(values))}>
                        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                            <TextInput label="Username" placeholder="username" {...signup.getInputProps('username')} required />
                            <TextInput label="Email" type='email' placeholder="email" {...signup.getInputProps('email')} required mt="md" />
                            <PasswordInput label="Password" placeholder="password" {...signup.getInputProps('password')} required mt="md" />
                            <PasswordInput label="Confirm Password" placeholder="password" {...signup.getInputProps('confirmPassword')} required mt="md" />
                            <Button type='submit' fullWidth mt="xl">
                                SignUp
                            </Button>
                        </Paper >
                    </form>
                </Tabs.Tab>
            </Tabs>
        </Container >
    );
}
