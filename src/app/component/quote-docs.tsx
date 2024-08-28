import { Box, Flex, Image, Stack, Text } from '@mantine/core'
import classes from './quote-docs.module.css'
import BtnSubmit from '@/components/custom/button/button.submit'
import classNames from 'classnames'
import FormSellBody from '../carmanage/form/form-shell-body'
import FormEngine from '../carmanage/form/form-engine'
import FormOther from '../carmanage/form/form-other'

const QuoteDocs = () => {
  return (
    <div
      className={classNames(
        classes.main,
        'pd-[60px] md:pb-[100px] max-w-main mx-auto'
      )}
    >
      <Flex direction="column" align="center">
        <div className="text-2xl md:text-5xl font-bold text-main">
          Báo giá theo yêu cầu{' '}
        </div>
        <div className="text-main text-base md:text-2xl font-semibold mt-3 text-center md:text-start">
          Vấn đề của bạn được lắng nghe và phản hồi tức thì
        </div>
      </Flex>

      <Flex className="lg:max-w-main flex-col lg:flex-row mx-auto gap-4 mt-12 md:px-6 px-3">
        <Box className="lg:flex-1 ">
          <FormSellBody />
        </Box>
        <Box className="flex-1">
          <FormEngine />
        </Box>
        <Box className="flex-1">
          <FormOther />
        </Box>
      </Flex>
    </div>
  )
}
export default QuoteDocs
