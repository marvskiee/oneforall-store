import { NavbarSection, ProductSection, CategorySection, FilterSection, CartModal, CheckoutModal } from '../components'
import ItemModal from '../components/Modals/ItemModal'
import { useShoppingCart } from '../context/CartContext'
import { useProduct } from '../context/ProductContext'

const Home = () => {
    const { search, selectedProduct } = useProduct()
    const { checkOutModal, finishModal } = useShoppingCart()
    return (
        <div>
            <NavbarSection />
            {search?.length > 0 ?
                <div className='flex gap-10 flex-row max-w-[70rem] mx-auto'>
                    <div>
                        <p className='mt-5 font-bold text-xl py-4 px-2'>Search Result: {search}</p>
                        <ProductSection />
                    </div>
                </div>
                :
                <div className='flex gap-10 flex-row max-w-[70rem] mx-auto'>
                    <div className='w-full'>
                        <p className='mt-3 font-bold text-xl py-4 px-2 text-center md:text-left'>Select Categories</p>
                        <CategorySection />
                        <div className='flex items-center justify-between flex-col md:flex-row'>
                            <p className='mt-3 font-bold text-xl py-4 flex-shrink-0 px-2'>Featured Products</p>
                            <FilterSection />
                        </div>
                        <ProductSection />

                    </div>
                </div>
            }
            {/* Modals  */}
            {checkOutModal && <CartModal />}
            {finishModal && <CheckoutModal />}
            {selectedProduct ? <ItemModal data={selectedProduct} /> : ""}

        </div>
    )
}

export default Home