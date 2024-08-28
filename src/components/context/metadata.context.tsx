'use client'
import { getAllTags, getTopSearch, historySearch } from '@/apis/client/auth'
import { getUniqueObjects } from '@/utils'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { useAuth } from './auth.context'

import { unionBy } from 'lodash'
import { ICategory } from '@/apis/client/interface'
interface IMetaDataContext {
  popularSearch: any[]
  newestSearches: any[]
  tireTags: any[]
  bateryTags: any[]
  serviceTags: any[]
  handleUpdateSearchHistory: (query: string, isDelete?: boolean) => void
}

const MetaDataContext = createContext<IMetaDataContext>({
  popularSearch: [],
  newestSearches: [],
  handleUpdateSearchHistory: () => {},
  tireTags: [],
  bateryTags: [],
  serviceTags: []
})

const MetaDataProvider = ({ children }: { children: ReactNode }) => {
  const { user, authId } = useAuth()
  const [popularSearch, setPopularSearch] = useState<any>([])
  const [newestSearches, setNewestSearches] = useState<any[]>([])
  const [tireTags, setTireTags] = useState<any[]>([])
  const [bateryTags, setBateryTags] = useState<any[]>([])
  const [serviceTags, setServiceTags] = useState<any[]>([])

  // popular search
  const getPopularSearch = async () => {
    const topSearch = await getTopSearch()
    setPopularSearch(topSearch?.data)
  }

  // all tags
  const getAllSearchTags = async () => {
    const data = await getAllTags()

    const allTireTags = data?.filter(item => item.type === ICategory.TIRE) ?? []
    const allBateryTags =
      data?.filter(item => item.type === ICategory.BATTERY) ?? []
    const allServiceTags =
      data?.filter(item => item.type === ICategory.EXCEPTION) ?? []

    setTireTags(allTireTags)
    setBateryTags(allBateryTags)
    setServiceTags(allServiceTags)
  }

  useEffect(() => {
    getAllSearchTags()
  }, [])

  // init
  useEffect(() => {
    if (!user || !authId) return

    getPopularSearch()

    getHistory()
  }, [user, authId])

  const getHistory = async () => {
    const history = await historySearch(authId)
    const data = history?.data

    setNewestSearches(getUniqueObjects(data))
  }

  const handleUpdateSearchHistory = (newQuery: string, isDelete?: boolean) => {
    if (!isDelete) {
      const news = [
        {
          key: newQuery,
          id: new Date().getTime()
        },
        ...newestSearches
      ]

      setNewestSearches(unionBy(news, item => item.key))
      return
    }

    const newSearches = newestSearches.filter(item => item.key != newQuery)
    setNewestSearches(newSearches)
  }

  return (
    <MetaDataContext.Provider
      value={{
        popularSearch,
        newestSearches,
        handleUpdateSearchHistory,
        tireTags,
        bateryTags,
        serviceTags
      }}
    >
      {children}
    </MetaDataContext.Provider>
  )
}

export default MetaDataProvider

export const useMetaDataContext = () => {
  const context = useContext(MetaDataContext)

  if (!context) {
    throw Error('Forgot wrap page by MetaDataProvider')
  }

  return context
}
