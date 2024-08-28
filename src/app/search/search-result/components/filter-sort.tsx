import { Select } from '@mantine/core'
interface FilterProps {
  title: string
  onChangeFilter: (e: any) => void
  widthZ?: any
  showTitle?: any
  css?: string
}
function FilterSort({
  title,
  onChangeFilter,
  widthZ,
  showTitle,
  css
}: FilterProps) {
  const handleOnChangeFilter = (e: any) => {
    onChangeFilter(e)
  }
  return (
    <div className={`flex flex-col gap-6 ${widthZ ? 'w-full' : 'w-44'}`}>
      {showTitle && <div className={css}>{title}</div>}
      <Select
        placeholder="Sắp xếp theo"
        variant="unstyled"
        data={[
          { label: 'Liên quan', value: 'relation' },
          { label: 'Bán chạy', value: 'topSales' },
          { label: 'Giá từ thấp đến cao', value: 'true' },
          { label: 'Giá từ cao đến thấp', value: 'false' }
        ]}
        defaultValue=""
        onChange={value => {
          handleOnChangeFilter(value)
        }}
        // clearable
      />
    </div>
  )
}

export default FilterSort
