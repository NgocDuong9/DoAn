import { ActionIcon, Box, Group, Pagination, Text } from '@mantine/core'
import { IconArrowLeft, IconArrowRight, IconDots } from '@tabler/icons-react'

import { useMediaQuery, usePagination } from '@mantine/hooks'
import { useState } from 'react'
import classes from './customstyle.module.css'
import { divide } from 'lodash'

export default function CorePagination(props: any) {
  const { total, pageSize = 9, onChange: handleChangePage, activePage } = props

  const totalPage = Math.ceil(total / pageSize)

  const { setPage } = usePagination({
    total: Math.ceil(total / (pageSize ? +pageSize : 1)) || 1,
    siblings: 1,
    onChange(page) {
      handleChangePage(page)
    }
  })
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className={'py-4'}>
      <Pagination
        total={totalPage}
        siblings={1}
        defaultValue={activePage}
        onChange={setPage}
        classNames={{
          control: classes.control,
          root: isMobile ? classes.root : ''
        }}
        previousIcon={IconArrowLeft}
        nextIcon={IconArrowRight}
      />
    </div>
  )
}
