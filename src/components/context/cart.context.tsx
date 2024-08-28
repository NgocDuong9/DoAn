'use client'

import {
  addProdToCart,
  deleteProdInCart,
  getProdInCart,
  updateCart as _updateCart
} from '@/apis/client/cart'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react'

interface ActionsCart {
  onError?: () => void
  onSuccess?: () => void
}

interface CartContextType {
  cartItems: any[]
  totalCart: number
  changeCartItems: React.Dispatch<React.SetStateAction<any>>
  fetchCartItems: () => Promise<void>
  addToCart: (productDetails: any, actions?: ActionsCart) => Promise<void>
  removeFromCart: (
    productId: string | string[],
    actions?: ActionsCart
  ) => Promise<void>
  updateCart: (newData: any, id: string, actions?: ActionsCart) => Promise<void>
  loading: boolean
  changeLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const fetchCartItems = useCallback(async () => {
    try {
      if (loading) {
        return
      }
      setLoading(true)
      const { data, status }: any = await getProdInCart()

      if (status === 200) {
        let formattedData: any[] = []
        data.reverse().forEach((item: any) => {
          const index = formattedData.findIndex(
            i => i.garage?.id === item.garage_id
          )
          if (index >= 0) {
            formattedData[index].products.push(item)
          } else {
            formattedData.push({
              garage: item.garage,
              products: [item]
            })
          }
        })
        setCartItems(formattedData)
      }
    } catch (error) {
      console.error('Failed to fetch cart items:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const addToCart = async (productDetails: any, actions?: ActionsCart) => {
    if (loading) return
    try {
      const result: any = await addProdToCart(productDetails)
      if (result?.status < 400) {
        fetchCartItems()
        actions?.onSuccess?.()
        return result
      } else {
        actions?.onError?.()
      }
    } catch (error) {
      console.error('Failed to add product to cart:', error)
      actions?.onError?.()
    }
  }

  const updateCart = async (
    newData: { count?: number; [key: string]: any },
    id: string,
    actions?: ActionsCart
  ) => {
    if (loading) return
    try {
      const { status }: any = await _updateCart({ data: newData, id })
      if (status < 400) {
        fetchCartItems()
        actions?.onSuccess?.()
      } else {
        actions?.onError?.()
      }
    } catch (error) {
      console.error(error)
      actions?.onError?.()
    }
  }
  const removeFromCart = async (
    productId: string | string[],
    actions?: ActionsCart
  ) => {
    if (loading) return
    try {
      const params = Array.isArray(productId) ? productId : [productId]
      const { status }: any = await deleteProdInCart(params)
      if (status < 400) {
        fetchCartItems()
        actions?.onSuccess?.()
      } else {
        actions?.onError?.()
      }
    } catch (error) {
      console.error('Failed to remove product from cart:', error)
      actions?.onError?.()
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  const totalCart = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + (item.products.length ?? 0)
    }, 0)
  }, [cartItems])

  const valueData = {
    cartItems,
    fetchCartItems,
    loading,
    totalCart,
    changeCartItems: setCartItems,
    changeLoading: setLoading,
    addToCart,
    removeFromCart,
    updateCart
  }

  return (
    <CartContext.Provider value={valueData}>{children}</CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
