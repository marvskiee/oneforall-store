import { Item } from '../../interfaces/storeInterfaces'
import { useShoppingCart } from '../../context/CartContext'
import usePriceFormatter from '../../hooks/usePriceFormatter'

interface productCardProps {
  data: Item
}

const ProductCard = (props: productCardProps) => {
  const { formatAmount } = usePriceFormatter();
  const { id, productName, category, description, unitPrice, imageUrl } = props.data
  const { increaseCartQuantity } = useShoppingCart();
  return (
    <div className='w-full p-2 rounded-md border flex md:flex-row flex-col items-start gap-2'>
      <img src={imageUrl} className='aspect-square w-[10rem] object-contain' />
      <div className='flex flex-col h-full gap-2 justify-between w-full'>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold  text-gray-900'>{productName}</p>
          <div>
            <span className='p-1 px-2 rounded-md bg-gray-200 text-gray-700 text-sm font-semibold capitalize'>{category}</span>
          </div>
          {/* <p>{description}</p> */}
          <p>{formatAmount(unitPrice)}</p>
        </div>
        <button
          className='w-full bg-violet-800 text-white rounded-md font-semibold p-2 px-4'
          onClick={() => increaseCartQuantity(id)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard