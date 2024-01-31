import { useProduct } from '../../context/ProductContext'
import ProductCard from '../Cards/ProductCard'

const ProductSection = () => {
    const { productItems } = useProduct()

    return (
        <div className='grid lg:grid-cols-3 grid-cols-2 m-2 gap-2 flex-col'>
            {productItems?.map((item) => <ProductCard data={item} key={item?.id} />)}
        </div>
    )
}

export default ProductSection