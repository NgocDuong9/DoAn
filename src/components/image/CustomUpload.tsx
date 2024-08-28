// ** React Imports
import { getFileUrl } from '@/utils/images'
import { Box, Image, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react'

import { useDropzone } from 'react-dropzone'

interface FileProp {
  name: string
  type: string
  size: number
}

export interface PreviewImgs {
  url: string
  [key: string]: any
}

interface Props {
  label?: string
  sub?: string
  files: any | null
  setFiles: (file: any) => void
  setPreviewImgs?: Dispatch<SetStateAction<any[]>>
  previewImgs?: PreviewImgs[]
  readonly?: boolean
  size?: number
  placeholder?: string
  icon?: string
  acceptType: 'image' | 'video'
}

const MapAcceptType: Record<'image' | 'video', any> = {
  image: {
    accept: {
      'image/png': ['.png', '.PNG'],
      'image/jpg': ['.jpg', '.JPG'],
      'image/jpeg': ['.jpeg', '.JPEG']
    },
    size: 2 * 1024 * 1024,
    label: 'ảnh'
  },
  video: {
    accept: {
      'video/mp4': ['.mp4', '.MP4'],
      'video/mov': ['.mov', '.MOV']
    },
    size: 5 * 1024 * 1024,
    label: 'video'
  }
}

const CustomUpload = ({
  label,
  sub,
  files,
  setFiles,
  previewImgs = [],
  setPreviewImgs,
  readonly = false,
  size = 2,
  placeholder = 'Thêm hình ảnh',
  icon = '/svg/image-icon.svg',
  acceptType
}: Props) => {
  const ERROR_MESSAGE: Record<string, string> = {
    'too-many-files': `Bạn chỉ có thể thêm tối đa ${size} ảnh`,
    'file-too-large': `Kích thước file tối đa là ${
      MapAcceptType[acceptType].size / (1024 * 1024)
    }MB`,
    'file-invalid-type': 'File nên là .png, .jpg, .jpeg'
  }

  const [dragFileIndex, setDragFileIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  // ** State

  const MAX_FILE = useMemo(() => {
    return size - previewImgs.length
  }, [previewImgs])

  const customeValidateSize = (file: any) => {
    if (file.size > MapAcceptType[acceptType].size) {
      return {
        code: 'file-too-large',
        message: `Kích thước file tối đa là ${
          MapAcceptType[acceptType].size / (1024 * 1024)
        }MB`
      }
    }
    return null
  }

  // ** Hooks
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop: (acceptedFiles: any[]) => {
      const newFiles = [...files, ...acceptedFiles.map(file => file)]

      console.log(newFiles, 'newFiles')

      //   if (newFiles.length > MAX_FILE) {
      //     notifications.show({
      //       message: `Bạn chỉ có thể thêm tối đa ${size} ${MapAcceptType[acceptType].label}`
      //     })
      //     return
      //   }
      setFiles(newFiles)
    },
    maxFiles: 5,
    validator: customeValidateSize,
    accept: MapAcceptType[acceptType].accept
  })

  useEffect(() => {
    if (fileRejections.length === 0) return

    const error =
      ERROR_MESSAGE[fileRejections[0].errors[0].code] ||
      fileRejections[0].errors[0].message

    notifications.show({
      message: error
    })
  }, [fileRejections])

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          style={{
            width: '100%',
            objectFit: 'cover',
            aspectRatio: '1/1',
            margin: 'auto',
            borderRadius: '100%'
          }}
          alt={file.name}
          src={URL.createObjectURL(file as any)}
        />
      )
    } else {
      // return <Icon icon="mdi:file-document-outline" />;
      return (
        <div>
          <video
            src={URL.createObjectURL(file as any)}
            style={{
              width: '100%',
              objectFit: 'contain',
              aspectRatio: '1/1',
              margin: 'auto'
            }}
            autoPlay
          ></video>
        </div>
      )
    }
  }

  const handleRemoveFile = (index: number) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(
      (_: any, fileIndex: number) => fileIndex !== index
    )

    setFiles([...filtered])
  }

  const handleRemovePreviewImg = (id: number) => {
    if (!setPreviewImgs) return
    const filtered = previewImgs.filter(_img => _img.id !== id)
    setPreviewImgs([...filtered])
  }

  const handleDragStart = (index: number) => () => {
    if (readonly) return
    setDragFileIndex(index)
  }
  const handleDragOver = (index: number) => () => {
    if (readonly) return

    setDragOverIndex(index)
  }
  const handleDrop = () => {
    if (readonly) return
    const newFiles = swapElement(files, dragFileIndex!, dragOverIndex!)
    setFiles(newFiles)
  }
  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const fileList = files?.map((file: FileProp, index: any) => (
    <div
      key={index}
      onDragStart={handleDragStart(index)}
      onDragOver={handleDragOver(index)}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      draggable={!readonly}
      style={{
        // border: '1px solid #e0e0e0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="file-details">
        <div className="file-preview">{renderFilePreview(file)}</div>
      </div>
      <div
        className="close-btn"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '25px',
          height: '25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#fefefec1',
          cursor: 'pointer'
        }}
        onClick={() => handleRemoveFile(index)}
      >
        <Image src="/svg/trash.svg" />
      </div>
    </div>
  ))

  const savedImgsView = useMemo(() => {
    return previewImgs.map((img: PreviewImgs, index: number) => (
      <div
        key={img.id}
        onDragStart={handleDragStart(index)}
        onDragOver={handleDragOver(index)}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        style={{
          border: '1px solid #e0e0e0',
          width: '90px',
          height: '90px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#fff'
        }}
      >
        <div className="file-details">
          <div className="file-preview">
            <img
              style={{
                width: '100%',
                objectFit: 'contain',
                aspectRatio: '1/1',
                margin: 'auto'
              }}
              src={getFileUrl(img.url)}
            />
          </div>
        </div>
      </div>
    ))
  }, [previewImgs])

  return (
    <div
      style={{
        // display: "flex",
        columnGap: '20px'
      }}
    >
      {label && (
        <div
          style={{
            marginBottom: 2,
            textAlign: 'left'
          }}
        >
          {label}
        </div>
      )}

      <div
        style={{
          flex: 1
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: '10px',
            rowGap: '10px'
          }}
        >
          {/* {savedImgsView?.length > 0 && files.length  0 && (
            <Fragment>{savedImgsView}</Fragment>
          )} */}
          {files?.length > 0 && !readonly && <Fragment>{fileList}</Fragment>}
          {files?.length < size && !readonly && (
            <div {...getRootProps({ className: 'dropzone' })} className="fle">
              <div
                style={
                  {
                    //   position: 'absolute',
                    //   zIndex: 0,
                    //   top: '50%',
                    //   left: '50%',
                    //   transform: 'translate(-50%, -50%)'
                  }
                }
              >
                <div className="file-details">
                  <div className="file-preview">
                    <img
                      style={{
                        width: '100%',
                        objectFit: 'cover',
                        aspectRatio: '1/1',
                        margin: 'auto',
                        borderRadius: '100%'
                      }}
                      src={getFileUrl(previewImgs?.[0]?.url)}
                    />
                  </div>
                </div>
                <Text
                  className=" border-[#24CCD9] text-nowrap cursor-pointer py-[4px] px-[10px] text-center text-[14px] mt-2 border justify-center rounded-lg font-semibold flex gap-1"
                  style={{
                    background:
                      'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Chọn ảnh
                </Text>
              </div>
              <input {...getInputProps()} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomUpload
function swapElement(files: any, arg1: number, arg2: number) {
  throw new Error('Function not implemented.')
}
