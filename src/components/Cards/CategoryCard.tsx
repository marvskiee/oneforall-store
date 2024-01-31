import { useProduct } from '../../context/ProductContext'

interface CategoryProps {
    name: string
}

const CategoryCard = ({ name }: CategoryProps) => {
    const { changeCategory } = useProduct()

    return (
        <div className="rounded-md border cursor-pointer p-4 hover:bg-violet-800 hover:text-white hover:scale-105 delay-75 transition-all " onClick={() => changeCategory(name)}>
            <p className='capitalize font-semibold'>{name}</p>
        </div>
    )
}

export default CategoryCard