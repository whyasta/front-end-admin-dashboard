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
import { addData, editData } from '@/app/server/masterStatusActions'
import type { StatusType } from '@/types/pages/statusType'
import type { StatusRequestType } from '@/types/apis/statusRequest'

type EditStatusInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void,
  setRefresh: (refresh: boolean) => void
  data?: StatusType
}

const initialData: EditStatusInfoProps['data'] = {
  id: -1,
  status_id: '',
  status_desc: '',
  fin_rc: '',
}

const DialogAddEditStatus = ({ open, setOpen, setRefresh, data }: EditStatusInfoProps) => {
  const isEdit = data ? true : false

  // Hooks
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    formState: { errors }
  } = useForm<StatusRequestType>({
    defaultValues: data || initialData
  })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = async (data: StatusRequestType) => {
    const requestData = {
      ...data,
      statusid: data.status_id,
      statusdesc: data.status_desc,
      finrc: data.fin_rc,
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
        {isEdit ? 'Edit' : 'Add'} Status
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16' >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Controller
                name='status_id'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Status ID'
                    placeholder='Status ID'
                    onChange={e => {
                      field.onChange(e.target.value)
                    }}
                    {...(errors.status_id && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='status_desc'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    rows={4}
                    multiline
                    value={field.value || ''}
                    label='Status Desc'
                    placeholder='Status Desc'
                    onChange={e => {
                      field.onChange(e.target.value)
                    }}
                    {...(errors.status_desc && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='fin_rc'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Fin RC'
                    placeholder='Fin RC'
                    onChange={e => {
                      field.onChange(e.target.value)
                    }}
                    {...(errors.fin_rc && { error: true, helperText: 'This field is required.' })}
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

export default DialogAddEditStatus
