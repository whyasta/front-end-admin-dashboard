'use client'

// React Imports
// import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// Component Imports
import { CircularProgress } from '@mui/material'

import { Controller, useForm } from 'react-hook-form'

import { toast } from 'react-toastify'

import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import type { RcType } from '@/types/pages/rcType'
import { addData, editData } from '@/app/server/masterRcActions'
import type { RcAddEdit } from '@/types/apis/rcRequest'

type EditRcInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void,
  setRefresh: (refresh: boolean) => void
  data?: RcType
}

const initialData: EditRcInfoProps['data'] = {
  id: -1,
  http_code: '',
  svc_code: '',
  rc_code: '',
  rc_desc: '',
  user_desc: '',
  add_info: '',
}

const DialogEditRc = ({ open, setOpen, setRefresh, data }: EditRcInfoProps) => {
  const isEdit = data ? true : false

  // Hooks
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    formState: { errors }
  } = useForm<RcAddEdit>({
    defaultValues: data || initialData
  })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = async (data: RcAddEdit) => {
    const requestData = {
      ...data,
      userdesc: data.user_desc,
      desc: data.user_desc,
    } as any

    const response = isEdit ? await editData(requestData) : await addData(requestData);

    if (response.rc === '00') {
      setOpen(false)
      setRefresh(true)
      toast.success(response.rc_desc)
    } else {
      toast.error(response.rc_desc)
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {isEdit ? 'Edit' : 'Add'} Rc
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16' >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Controller
                name='http_code'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='HTTP Code'
                    placeholder='HTTP Code'
                    onChange={e => {
                      field.onChange(e.target.value)
                    }}
                    {...(errors.http_code && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='svc_code'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='SVC Code'
                    placeholder='SVC Code'
                    onChange={e => {
                      field.onChange(e.target.value)
                    }}
                    {...(errors.svc_code && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='rc_code'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='RC Code'
                    placeholder='RC Code'
                    onChange={e => {
                      field.onChange(e.target.value)
                    }}
                    {...(errors.rc_code && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='rc_desc'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='RC Desc'
                    placeholder='RC Desc'
                    onChange={e => {
                      field.onChange(e.target.value)
                    }}
                    {...(errors.rc_desc && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='user_desc'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='User Desc'
                    placeholder='User Desc'
                    onChange={e => {
                      field.onChange(e.target.value)
                    }}
                    {...(errors.user_desc && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='add_info'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Add Info'
                    placeholder='Add Info'
                    onChange={e => {
                      field.onChange(e.target.value)
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit' className='gap-2'>
            {isSubmitting && <CircularProgress size={20} color='inherit' />}
            Submit
          </Button>
          {/* <Button variant='contained' onClick={handleSubmit} type='submit'>
            Submit
          </Button> */}
          <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogEditRc
