import ModalSection from '../Section/ModalSection'
import { useShoppingCart } from '../../context/CartContext'
import { FaCheckCircle } from "react-icons/fa";

const CheckoutModal = () => {
    const { closeFinishModal } = useShoppingCart()
    return (
        <ModalSection>
            <div className='bg-white p-4 rounded-md flex items-center flex-col gap-4 '>
                <FaCheckCircle className='text-emerald-500' size={60} />
                <p className='text-2xl font-semibold'>
                    Thank you for purchasing
                </p>
                <button className='p-2 text-center w-full rounded-md text-white bg-violet-800 font-semibold' onClick={closeFinishModal}>Close</button>
            </div>
        </ModalSection>
    )
}

export default CheckoutModal