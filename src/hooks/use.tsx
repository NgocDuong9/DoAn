import { useCallback, useState } from 'react'

function use<Result, Args extends any[] = []>(
  callback: (...args: Args) => Promise<Result>,
  ...args: Args
) {
  const [data, setData] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const fetchCallback = useCallback(() => {
    setLoading(true)
    callback(...args)
      .then(data => setData(data))
      .finally(() => {
        setLoading(false)
      })
  }, [...args, callback])
  return { fetchCallback, data, loading }
}

export default use
