import { useShoppingCart } from '../../context/CartContext'
import CartCard from '../Cards/CartCard'
import { useProduct } from '../../context/ProductContext'
import useNumberFormatter from '../../hooks/useNumberFormatter'
import ModalSection from '../Section/ModalSection'
import usePriceFormatter from '../../hooks/usePriceFormatter'
import { IoMdClose } from 'react-icons/io'

const CartModal = () => {
    const { formatNumber } = useNumberFormatter()
    const { formatAmount } = usePriceFormatter()
    const { cartItems, removeAll, showCheckOutModal, totalItems, closeCheckOutModal, showFinishModal } = useShoppingCart()
    const { rawProductItems } = useProduct()
    const cartHeaders = [
        "product details",
        "quantity",
        "total"
    ]
    const totalAmount = cartItems.reduce((total, cartItem) => {
        const product = rawProductItems?.find((p) => p.id === cartItem.id);

        if (product) {
            total += product.unitPrice * cartItem.quantity;
        }
        return total;
    }, 0);

    const checkOutModal = () => {
        removeAll()
        closeCheckOutModal()
        showFinishModal()
    }
    return (
        <ModalSection>
            <div className='max-w-[60rem] bg-white overflow-hidden rounded-md w-full flex flex-col'>
                <div className=''>
                    <div className='flex items-center justify-between w-full p-4 border-b'>
                        <p className='font-bold text-xl  bg-white sticky top-0'>Shopping Cart</p>
                        <button onClick={closeCheckOutModal}>
                            <IoMdClose />
                        </button>
                    </div>
                    <div className='overflow-auto h-[20rem] p-4'>
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    {cartHeaders.map((item) => <td className={`${item == "product details" ? "text-center" : ""}text-center uppercase font-bold p-2 text-sm`}>{item}</td>)}
                                </tr>
                            </thead>
                            <tbody>

                                {cartItems?.map(item =>
                                    <CartCard
                                        data={item}
                                        key={item?.id} />)}
                                {cartItems?.length == 0 && <tr>
                                    <td colSpan={3} className='text-center'>No Items</td></tr>}
                            </tbody>
                        </table>
                        {cartItems?.length > 0 &&
                            <button onClick={removeAll} className='float-right mt-4 p-2 px-4 text-center rounded-md text-white bg-rose-600 font-semibold'>Remove All</button>
                        }
                    </div>
                </div>
                {cartItems.length > 0 &&
                    <div className='flex flex-col gap-2 border-t p-4 justify-between'>
                        <div className='font-semibold flex items-center justify-between'>
                            <p>Total Items:</p>
                            <p>{formatNumber(totalItems)}</p>
                        </div>
                        <div className='font-semibold flex items-center justify-between'>
                            <p>Total Amount:</p>
                            <p>{formatAmount(totalAmount)}</p>
                        </div>
                        <button onClick={checkOutModal} className='p-2 text-center w-full rounded-md text-white bg-violet-800 font-semibold'>CheckOut</button>
                    </div>
                }
            </div>
        </ModalSection>
    )
}

export default CartModal