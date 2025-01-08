'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Image from 'next/image'

// import useMediaQuery from '@mui/material/useMediaQuery'
// import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import type { InferInput } from 'valibot';
import { object, minLength, string, pipe, nonEmpty } from 'valibot'

// Type Imports

import { signIn } from 'next-auth/react'

// import { toast } from 'react-toastify'

import { Alert } from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'

import type { SystemMode } from '@core/types'

// Component Imports
import Link from '@components/Link'

// import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
// import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Styled Custom Components
// const LoginIllustration = styled('img')(({ theme }) => ({
//   zIndex: 2,
//   blockSize: 'auto',

//   // maxBlockSize: 680,
//   maxBlockSize: '100%',
//   maxInlineSize: '100%',
//   margin: theme.spacing(12),
//   [theme.breakpoints.down(1536)]: {
//     // maxBlockSize: 550
//     maxBlockSize: '100%'
//   },
//   [theme.breakpoints.down('lg')]: {
//     // maxBlockSize: 450
//     maxBlockSize: '100%'
//   }
// }))

// const MaskImg = styled('img')({
//   blockSize: 'auto',
//   maxBlockSize: 355,
//   inlineSize: '100%',
//   position: 'absolute',
//   insetBlockEnd: 0,
//   zIndex: -1
// })

// Util Imports
// import { getLocalizedUrl } from '@/utils/i18n'
// import type { Locale } from '@/configs/i18n'

type ErrorType = {
  message: string[]
}

const Login = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const [errorState, setErrorState] = useState<ErrorType | null>(null)
  const [errorAlert, setErrorAlert] = useState<ErrorType | null>(null)

  // Vars
  // const darkImg = '/images/pages/auth-mask-dark.png'
  // const lightImg = '/images/pages/auth-mask-light.png'

  // const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  // const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  // const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  // const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  const darkIllustration = '/images/illustrations/auth/login-pattern.svg'
  const lightIllustration = '/images/illustrations/auth/login-pattern.svg'
  const borderedDarkIllustration = '/images/illustrations/auth/login-pattern.svg'
  const borderedLightIllustration = '/images/illustrations/auth/login-pattern.svg'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const searchParams = useSearchParams()

  // const { lang: locale } = useParams()

  // const theme = useTheme()
  // const hidden = useMediaQuery(theme.breakpoints.down('md'))
  // const authBackground = useImageVariant(mode, lightImg, darkImg)

  type FormData = InferInput<typeof schema>

  const schema = object({
    email: pipe(string(), nonEmpty('This field is required'), minLength(4, 'Username must be at least 4 characters long')),
    password: pipe(
      string(),
      nonEmpty('This field is required'),
      minLength(5, 'Password must be at least 5 characters long')
    )
  })

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res && res.ok && res.error === null) {
      // Vars
      const redirectURL = searchParams.get('redirectTo') ?? '/dashboard'

      //router.replace(getLocalizedUrl(redirectURL, locale as Locale))
      router.replace(redirectURL)
    } else {
      if (res?.error) {
        const error = JSON.parse(res.error)

        // setErrorState(error)
        setErrorAlert(error)

        // toast.error(error.message)
      }
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )
        }
      >
        <div className="flex bs-full flex-1 flex-col"
          style={{
            backgroundColor: '#061F5C',
            backgroundImage: `url(${characterIllustration})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '25% 25%',
            height: '100%'
          }}>
          <div className="absolute top-[23%] w-full">
            <div className="text-center justify-center w-100">
              <a href="https://sandbox.finpay.id/dashboard/">
                {/* <img alt="Logo" src="https://sandbox.finpay.id/dashboard/demo1/media/logos/logo-finnet-white.png"></a> */}
                <Image src="/images/logo-finnet-white.png" alt="Logo" width={300} height={200} />
                <p className="mb-10 font-bold text-3xl"
                  style={{
                    color: '#FFFFFF'
                  }}>Finpay for your business <br />payment solutions</p>
              </a>
            </div>
          </div>
        </div>
        {/* <LoginIllustration src={characterIllustration} alt='character-illustration' /> */}
        {/* <Image src={characterIllustration} alt='character-illustration' fill={true} className='mt-24' /> */}
        {/* {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )} */}
      </div>
      <div className='flex flex-col items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-6 md:is-[50vw]'>
        {/* <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-10 rounded relative w-[70%]" role="alert">
          <strong className="font-bold">Holy smokes!</strong>
          <span className="block sm:inline">{errorAlert?.message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div> */}
        <div className='basis-1/5 align-middle mt-2'>
          {errorAlert && <Alert variant='outlined' severity='error' onClose={e => {
            e.preventDefault()
            setErrorAlert(null)
          }}>
            {errorAlert?.message}
          </Alert>
          }
        </div>
        <div className="mx-auto w-full max-w-screen-sm flex flex-col gap-6 p-8 bg-white border border-gray-200 rounded-lg shadow">
          {/* <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'> */}
          <div className='flex flex-col gap-1'>
            <h2 className='text-finpay-tosca'>{`Log In`}</h2>
          </div>
          <hr className="h-0.5 border-t-0 bg-neutral-100" />
          <form
            noValidate
            autoComplete='off'
            action={() => { }}
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5'
          >
            <Controller
              name='email'
              disabled={isSubmitting}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  autoFocus
                  fullWidth
                  label='Username or Email'
                  placeholder='Enter your username or email'
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  {...((errors.email || errorState !== null) && {
                    error: true,
                    helperText: errors?.email?.message || errorState?.message[0]
                  })} />
              )}
            />
            <Controller
              name='password'
              control={control}
              disabled={isSubmitting}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Password'
                  placeholder='············'
                  id='outlined-adornment-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  {...(errors.password && { error: true, helperText: errors.password.message })}
                />
              )}
            />
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              {/* <FormControlLabel control={<Checkbox />} label='Remember me' /> */}
              <Typography className='text-end text-finpay-tosca' color='primary' component={Link}>
                Forgot password?
              </Typography>
            </div>
            <LoadingButton loading={isSubmitting} fullWidth variant='contained' type='submit' size='large' loadingPosition="end">
              Login
            </LoadingButton>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>{`Don't have an account?`}</Typography>
              <Typography component={Link} color='primary' className='text-finpay-tosca'>
                Sign Up
              </Typography>
              Now
            </div>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <p>For more information, see our documentation <Link className='text-finpay-tosca' href="https://hub.finpay.id/">here</Link>.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
