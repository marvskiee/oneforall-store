import FilterCard from '../Cards/FilterCard'

const FilterSection = () => {
    const FILTER_LIST = [
        "Name (A to Z)",
        "Name (Z to A)",
        "Price (Highest to Lowest)",
        "Price (Lowest to Highest)",
    ]
    return (
        <div>
            {FILTER_LIST.map(((item, key) => <FilterCard data={item} key={key} index={key} />))}
        </div>
    )
}

export default FilterSection