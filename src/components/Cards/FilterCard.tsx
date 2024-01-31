import { useProduct } from '../../context/ProductContext'

interface FilterCardProps {
    data: string,
    index: number
}

const FilterCard = (props: FilterCardProps) => {
    const { productFilter } = useProduct()

    return (
        <button key={props?.index} onClick={() => productFilter(props.index)}>{props?.data}</button>
    )
}

export default FilterCard