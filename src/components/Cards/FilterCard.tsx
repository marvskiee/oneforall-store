import { useProduct } from '../../context/ProductContext'

interface FilterCardProps {
    data: string,
    index: number
}

const FilterCard = (props: FilterCardProps) => {
    return (
        <option className='p-4'>{props?.data}</option>
    )
}

export default FilterCard