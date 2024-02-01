import { useProduct } from '../../context/ProductContext';
import FilterCard from '../Cards/FilterCard'

const FilterSection = () => {
    const FILTER_LIST = [
        "Name (A to Z)",
        "Name (Z to A)",
        "Price (Highest to Lowest)",
        "Price (Lowest to Highest)",
    ]
    const { productFilter } = useProduct()
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        productFilter(event.target.selectedIndex);
    };
    return (
        <div className='flex flex-col md:flex-row items-center gap-4 p-2 w-full md:justify-end'>
            <p>Sort By:</p>
            <select onChange={handleSelectChange} className='border rounded-md p-2 md:w-auto w-full'>
                {FILTER_LIST.map(((item, key) => <FilterCard data={item} key={key} index={key} />))}
            </select>
        </div>
    )
}

export default FilterSection