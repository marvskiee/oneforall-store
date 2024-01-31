import { useShoppingCart } from '../../context/CartContext'
import { useProduct } from '../../context/ProductContext'
import usePriceFormatter from '../../hooks/usePriceFormatter'
import { Item } from '../../interfaces/storeInterfaces'
import ModalSection from '../Section/ModalSection'

interface ItemModalProps {
    data: string
}

const ItemModal = (props: ItemModalProps) => {
    const { rawProductItems, setModalProduct } = useProduct()
    const { formatAmount } = usePriceFormatter();
    const item = rawProductItems?.filter(item => item.id === props?.data)[0]
    const { increaseCartQuantity } = useShoppingCart()
    if (!item) return null
    const { id, productName, category, description, unitPrice, imageUrl } = item
    return (
        <ModalSection>
            <div className='bg-white p-4 rounded-md flex items-center gap-4 '>
                <div className='w-full p-2 rounded-md flex flex-col max-w-[30rem] items-start gap-2'>
                    <img src={imageUrl} className='aspect-square w-[10rem] object-contain' />
                    <div className='flex flex-col h-full gap-2 justify-between w-full'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold  text-gray-900'>{productName}</p>
                            <div>
                                <span className='p-1 px-2 rounded-md bg-gray-200 text-gray-700 text-sm font-semibold capitalize'>{category}</span>
                            </div>
                            <p className='  text-gray-900'>{description}</p>

                            {/* <p>{description}</p> */}
                            <p className='font-bold text-lg'>{formatAmount(unitPrice)}</p>
                        </div>
                        <div className='flex gap-4'>
                            <button
                                className='w-full bg-gray-200  rounded-md font-semibold p-2 px-4'
                                onClick={() => setModalProduct("")}>Close</button>
                            <button
                                className='w-full bg-violet-800 text-white rounded-md font-semibold p-2 px-4'
                                onClick={() => increaseCartQuantity(id)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalSection>
    )
}

export default ItemModal