import { Text, Tooltip } from '@mantine/core'

function RenderIcon({ type, showLabel, label }: any) {
  return (
    <div>
      <Tooltip label="Cứu hộ">
        <div>{type === 'CUU_HO' && <img src="/icons/rescue.png" />}</div>
      </Tooltip>
      <Tooltip label="Bảo dưỡng, sửa chữa điều hoà">
        <div>
          {type === 'DIEU_HOA' && (
            <img src="/icons/air-conditioner-maintenance-and-repair.png" />
          )}
        </div>
      </Tooltip>

      <Tooltip label="Bảo dưỡng, sửa chữa thân vỏ">
        <div>
          {type === 'THAN_VO' && (
            <img src="/icons/body-maintenance-and-repair.png" />
          )}
        </div>
      </Tooltip>

      <Tooltip label="Độ xe">
        <div>
          {type === 'DO_XE' && <img src="/icons/car-modification.png" />}
        </div>
      </Tooltip>

      <Tooltip label="Bảo dưỡng, sửa chữa điện">
        <div>
          {type === 'DIEN' && (
            <img src="/icons/maintenance-and-electrical-repair.png" />
          )}
        </div>
      </Tooltip>

      <Tooltip label="Bảo dưỡng, sửa chữa gầm">
        <div>
          {type === 'GAM' && (
            <img src="/icons/maintenance-and-undercarriage-repair.png" />
          )}
        </div>
      </Tooltip>

      <Tooltip label="Bảo dưỡng, sửa chữa khác">
        <div>{type === 'KHAC' && <img src="/icons/other.png" />}</div>
      </Tooltip>

      <Tooltip label="Bảo dưỡng, sửa chữa phụ thùng phụ kiện nội ngoại thất">
        <div>
          {type === 'PHU_TUNG_PHU_KIEN_NOI_NGOAI_THAT' && (
            <img src="/icons/spare-parts-and-accessories.png" />
          )}
        </div>
      </Tooltip>

      <Tooltip label="Lốp">
        <div>{type === 'LOP' && <img src="/icons/tire.png" />}</div>
      </Tooltip>

      <Tooltip label="Bảo dưỡng, sửa chữa máy">
        <div>
          {type === 'MAY' && (
            <img src="/icons/machine-maintenance-and-repair.png" />
          )}
        </div>
      </Tooltip>

      <Tooltip label="Ắc quy">
        <div>{type === 'AC_QUY' && <img src="/icons/acquy.png" />}</div>
      </Tooltip>

      <div className="flex flex-col">
        {type === 'acquy-bw' && <img src="/icons/acquy-black-white.png" />}
        {type === 'acquy-bw' && showLabel && (
          <Text className="text-white text-sm">{label}</Text>
        )}
      </div>
      
      <div>
        {type === 'car-wash' && <img src="/icons/car-wash-black-white.png" />}
        {type === 'car-wash' && showLabel && (
          <Text className="text-white text-sm">{label}</Text>
        )}
      </div>
      <div className="flex flex-col">
        {type === 'tire-bw' && <img src="/icons/tire-black-white.png" />}
        {type === 'tire-bw' && showLabel && (
          <Text className="text-white text-sm">{label}</Text>
        )}
      </div>
      <div>
        {type === 'undercarriage' && <img src="/icons/undercarriage.png" />}
        {type === 'undercarriage' && showLabel && (
          <Text className="text-white text-sm">{label}</Text>
        )}
      </div>
      <div>{type === 'momo' && <img src="/icons/momo.png" />}</div>
      <div>{type === 'zalopay' && <img src="/icons/zalo.png" />}</div>
      <div>{type === 'vnpay' && <img src="/icons/vnpay.png" />}</div>
    </div>
  )
}

export default RenderIcon
