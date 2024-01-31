import { CartItem, Item } from '../../interfaces/storeInterfaces'
import { useShoppingCart } from '../../context/CartContext'
import { useProduct } from '../../context/ProductContext'
import usePriceFormatter from '../../hooks/usePriceFormatter'
import { FaTrashAlt } from "react-icons/fa";

interface CartCardProps {
  data: CartItem,
}

const CartCard = (props: CartCardProps) => {
  const { formatAmount } = usePriceFormatter();
  const { id, quantity } = props.data
  const { rawProductItems } = useProduct()
  const item = rawProductItems?.filter(item => item.id === id)[0]
  const { removeItem, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()
  if (!item) return null

  return (
    <tr className='border p-2'>
      <td className='flex gap-4 p-2'>
        <img src={item.imageUrl} className='aspect-square w-[5rem] object-contain' />
        <div className='flex-row md:flex-col gap-4'>
          <p>{item.productName}</p>
          <p>{formatAmount(item.unitPrice)}</p>
          <div>
            <button onClick={() => removeItem(id)} className='p-2 rounded-md border'>
              <FaTrashAlt className='text-rose-600' />
            </button>
          </div>
        </div>
      </td>
      <td>
        <div className='flex flex-col items-center'>
          <div className='flex gap-4 items-center'>
            <button className='w-[2rem] aspect-square font-semibold bg-violet-800 text-white  border' disabled={quantity <= 1} onClick={() => decreaseCartQuantity(id)}>-</button>
            <p className='text-center'>{quantity}</p>
            <button className='w-[2rem] aspect-square font-semibold bg-violet-800 text-white  border' onClick={() => increaseCartQuantity(id)}>+</button>
          </div>
        </div>
      </td>
      <td className='text-center'>{formatAmount((quantity * item?.unitPrice))}
      </td>
    </tr>
  )
}

export default CartCard