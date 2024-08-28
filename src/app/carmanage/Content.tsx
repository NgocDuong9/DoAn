import { Box, Button, Flex, Image, Stack, Text } from '@mantine/core'
import React from 'react'
import classes from './manage.module.css'
import BoxChat from '@/components/header/boxChat'
import { IconArrowUpRight } from '@tabler/icons-react'
import Link from 'next/link'
import classNames from 'classnames'
import ProdService from '../component/prod-service'
const Content = () => {
  return (
    <>
      <ProdService />
    </>
  )
}

export default Content
