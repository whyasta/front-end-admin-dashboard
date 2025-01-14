'use client'

import { useEffect, useMemo, useState } from 'react';

import { Button, Card, CardContent, IconButton, InputAdornment, MenuItem, Skeleton, TablePagination } from "@mui/material"


// Style Imports

// Third-party Imports
import classnames from 'classnames'
import type {
  ColumnDef,
  FilterFn
} from '@tanstack/react-table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'

import { toast } from 'react-toastify';

import tableStyles from '@core/styles/table.module.css'
import type { RcType } from "@/types/pages/rcType"


import CustomTextField from "@/@core/components/mui/TextField";
import TablePaginationComponent from "@/components/TablePaginationComponent";
import { deleteData, getData } from "@/app/server/masterRcActions";
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick';
import DialogAddEditRc from '../components/DialogAddEditRc';
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog';

type RcTypeWithAction = RcType & {
  action?: string
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({
    itemRank
  })

  return itemRank.passed
}

// Column Definitions
const columnHelper = createColumnHelper<RcTypeWithAction>()

const RcListTable = ({ tableData }: { tableData?: RcType[] }) => {
  const [data, setData] = useState(...[tableData])
  const [filteredData] = useState(data)
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    if (refresh) {
      getTableData()
      setRefresh(false)
    }
  }, [refresh])

  const getTableData = async () => {
    setIsLoading(true)
    const data = await getData();

    setData(data)
    setIsLoading(false)
  }

  const onConfirmDelete = async (value: boolean, data: any) => {
    if (data) {
      const response = await deleteData(data.id)

      if (response.rc === '00') {
        toast.success(response.rc_desc)
        getTableData()
      } else {
        toast.error(response.rc_desc)
      }
    }
  }


  // console.log(data);

  const columns = [
    columnHelper.accessor('id', {
      header: 'Id',
      cell: ({ row }) => (
        <div className='flex items-center gap-4'>
          {row.index + 1}
        </div>
      )
    }),
    columnHelper.accessor('http_code', {
      header: 'HTTP Code',
      cell: ({ row }) => (
        <div className='flex items-center gap-4'>
          {row.original.http_code}
        </div>
      )
    }),
    columnHelper.accessor('svc_code', {
      header: 'SVC Code',
      cell: ({ row }) => (
        <div className='flex items-center w-auto text-pretty'>
          {row.original.svc_code}
        </div>
      )
    }),
    columnHelper.accessor('rc_code', {
      header: 'RC Code',
      cell: ({ row }) => (
        <div className='items-center w-auto text-pretty'>
          {row.original.rc_code}
        </div>
      )
    }),
    columnHelper.accessor('rc_desc', {
      header: 'RC Desc',
      cell: ({ row }) => (
        <div className='flex items-center w-auto text-pretty'>
          {row.original.rc_desc}
        </div>
      )
    }),
    columnHelper.accessor('user_desc', {
      header: 'User Desc',
      cell: ({ row }) => (
        <div className='flex items-center w-auto text-pretty'>
          {row.original.user_desc}
        </div>
      )
    }),
    columnHelper.accessor('add_info', {
      header: 'Add Info',
      cell: ({ row }) => (
        <div className='flex items-center gap-4'>
          {row.original.add_info}
        </div>
      )
    }),
    columnHelper.accessor('action', {
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center'>
          {/* <IconButton>
            <Link className='flex'>
              <i className='tabler-pencil text-textSecondary' />
            </Link>
          </IconButton> */}
          <OpenDialogOnElementClick element={IconButton} elementProps={{
            'children': <i className='tabler-pencil text-textSecondary' />
          }} dialog={DialogAddEditRc} dialogProps={{ data: row.original, setRefresh: setRefresh }} />
          {/* <IconButton>
            <i className='tabler-trash text-textSecondary' />
          </IconButton> */}
          <OpenDialogOnElementClick
            element={IconButton}
            elementProps={{
              'children': <i className='tabler-trash text-textSecondary' />
            }}
            dialog={ConfirmationDialog}
            dialogProps={{ type: 'delete', data: row.original, onConfirm: onConfirmDelete }}
          />
        </div>
      ),
      enableSorting: false
    })
  ]

  const tableColumns = useMemo<ColumnDef<RcTypeWithAction, any>[]>(
    () =>
      isLoading
        ? columns.map((column) => ({
          ...column,
          cell: () => (
            <Skeleton className="w-[70%] rounded-sm" />
          ),
        }))
        : columns,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, data, filteredData, columns]
  )

  const table = useReactTable({
    data: data as RcType[],
    columns: tableColumns,
    filterFns: {
      fuzzy: fuzzyFilter
    },

    // filterFns: {
    //   fuzzy: fuzzyFilter
    // },
    state: {
      // rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: false, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,

    // onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return <>

    <Card>
      <CardContent className='flex flex-col justify-between sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
        <div className='flex items-center gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[90px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <CustomTextField
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder='Search'
            className='max-sm:is-full sm:is-[250px]'
            InputProps={{
              endAdornment: globalFilter ? (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={() => setGlobalFilter('')}>
                    <i className={'tabler-x'} />
                  </IconButton>
                </InputAdornment>
              ) : null
            }}
          />
        </div>
        <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
          <Button
            color='secondary'
            variant='tonal'
            startIcon={<i className='tabler-refresh' />}
            className='max-sm:is-full'
            onClick={() => getTableData()}
          >
            Refresh
          </Button>
          <OpenDialogOnElementClick element={Button} elementProps={{
            'variant': 'contained',
            'startIcon': <i className='tabler-plus' />,
            'className': 'max-sm:is-full',
            'children': 'Add'
          }} dialog={DialogAddEditRc} dialogProps={{ setRefresh: setRefresh }} />
          <Button
            variant='contained'
            startIcon={<i className='tabler-upload' />}
            className='max-sm:is-full'
          >
            Export
          </Button>
        </div>
      </CardContent>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table + ' table-auto'}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, table.getState().pagination.pageSize)
              .map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  </>
}

export default RcListTable
