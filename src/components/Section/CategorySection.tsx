import { CategoryCard } from "..";
import { useProduct } from "../../context/ProductContext";


const CategorySection = () => {
  const { categories } = useProduct()

  return (
    <div className="flex items-center flex-wrap w-full gap-4 p-2 ">
      {categories.map(item => (
        <CategoryCard name={item} key={item} />))
      }
    </div>
  );
};

export default CategorySection; 
