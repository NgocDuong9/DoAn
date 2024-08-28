'use client'

import { Box, Checkbox, Text } from '@mantine/core'
import { IconChevronDown, IconPlus } from '@tabler/icons-react'

import { CustomCheckbox } from './custom-checkbox'
import { useState } from 'react'

export const NestedCheckboxes = ({
  data,
  title,
  onChange,
  checkedItems,
  filterKey = 'key',
  type = 'checkbox'
}: any) => {
  const [showCategory, setShowCategory] = useState(true)
  const handleCheckboxChange = (item: any, isChecked: any) => {
    onChange(item, isChecked)
  }

  const chunkArray = (array: any, size: number) => {
    const result = []
    for (let i = 0; i < array?.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

  const renderCheckboxes = (items: any, parentKey = null) => {
    const columns = chunkArray(items, Math.ceil(items?.length) ?? 8)

    return (
      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '8px' }}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} style={{ flex: 1, marginRight: '20px' }}>
            {column.map((item: any, index: any) => {
              const isChecked = checkedItems?.includes(item[filterKey])

              return (
                <div key={index} style={{ marginLeft: parentKey ? 20 : 0 }}>
                  {type === 'checkbox' ? (
                    <Checkbox
                      className="pb-4"
                      label={item.name ?? item.title}
                      checked={isChecked}
                      onChange={e =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      color="#51C2A7"
                      size="sm"
                    />
                  ) : (
                    <CustomCheckbox
                      className="pb-4 rounded-full"
                      label={item.name ?? item.title}
                      checked={isChecked}
                      onChange={(e: any) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      color="#51C2A7"
                      size="sm"
                    />
                  )}
                  {item.children &&
                    renderCheckboxes(item.children, item.key ?? item.id)}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )

    // return items?.map((item: any) => {
    //   const isChecked = checkedItems?.includes(item[filterKey]);

    //   return (
    //     <div key={item.id} style={{ marginLeft: parentKey ? 20 : 0 }}>
    //       {type === "checkbox" ? (
    //         <Checkbox
    //           className="pb-4"
    //           label={item.name ?? item.title}
    //           checked={isChecked}
    //           onChange={(e) => handleCheckboxChange(item, e.target.checked)}
    //           color="#51C2A7"
    //         />
    //       ) : (
    //         <Radio
    //           checked={isChecked}
    //           onChange={(event) =>
    //             handleCheckboxChange(item, event.target.checked)
    //           }
    //           className="pb-4"
    //           label={item.name ?? item.title}
    //           color="#51C2A7"
    //         />
    //       )}
    //       {item.children && renderCheckboxes(item.children, item.id)}
    //     </div>
    //   );
    // });
  }

  return (
    <Box className="flex-col">
      <Box
        className={`flex justify-between items-center gap-2 ${
          !showCategory ? '4' : '2'
        }`}
        onClick={() => {
          setShowCategory(!showCategory)
        }}
      >
        {title ? <Text className="text-lg font-medium">{title}</Text> : <></>}
        {!title ? (
          ''
        ) : !showCategory ? (
          <IconPlus size={18} />
        ) : (
          <IconChevronDown size={18} />
        )}
      </Box>

      {showCategory && renderCheckboxes(data)}
    </Box>
  )
}
