import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { Item } from "../interfaces/storeInterfaces";

enum ProductFilter {
    ProductNameAZ,
    ProductNameZA,
    UnitPriceHighToLow,
    UnitPriceLowToHigh
}

interface ProductProviderProps {
    children: ReactNode
}

interface ProductContext {
    selectedProduct: string,
    setModalProduct: (id: string) => void,
    searchProduct: (product_name: string) => void,
    clearSearch: () => void,
    productFilter: (sortBy: ProductFilter) => void,
    changeCategory: (category: string) => void,
    productItems: Item[],
    rawProductItems: Item[],
    categories: string[],
    search: string
}

// create context
const ProductContext = createContext({} as ProductContext)

export const useProduct = () => {
    return useContext(ProductContext)
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
    const [productItems, setProductItems] = useState<Item[]>([])
    const [search, setSearch] = useState<string>("")
    const productsRef = useRef<Item[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [selectedProduct, setSelectedProduct] = useState<string>("")
    useEffect(() => {
        const load = async () => {
            const response = await fetch('items.json');
            const data = await response.json();
            setProductItems(data)
            productsRef.current = data
            let category_list: string[] = Array.from(new Set(
                data.map((item: Item) => item?.category ? item.category as string : 'No Category')
            ))
            setCategories(["All", ...category_list])
        }
        load()
    }, [])

    const searchProduct = (product_name: string) => {
        setSearch(product_name)
        setProductItems(
            productsRef.current?.filter((item) => item.productName.toLowerCase().includes(product_name.toLowerCase()))
        )
    }
    const clearSearch = () => {
        setSearch("");
        searchProduct("")
    }

    const changeCategory = (category: string) => {
        let temp: Item[];
        if (category == "All") {
            temp = productsRef.current
        } else {
            temp = productsRef.current?.filter((item) => item.category.toLowerCase().includes(category.toLowerCase()))
        }
        setProductItems(temp)
    }

    const productFilter = (sortBy: ProductFilter) => {
        switch (sortBy) {
            case ProductFilter.ProductNameAZ:
                setProductItems(currItems => {
                    return currItems?.slice().sort((a, b) => a.productName.localeCompare(b.productName))
                }
                );
                break;
            case ProductFilter.ProductNameZA:
                setProductItems(currItems => {
                    return currItems?.slice().sort((a, b) => a.productName.localeCompare(b.productName)).reverse()
                }
                );
                break;
            case ProductFilter.UnitPriceHighToLow:
                setProductItems(currItems => {
                    return currItems?.slice().sort((a, b) => b.unitPrice - a.unitPrice)
                }
                );
                break;
            case ProductFilter.UnitPriceLowToHigh:
                setProductItems(currItems => {
                    return currItems?.slice().sort((a, b) => a.unitPrice - b.unitPrice)
                }
                );
                break;
            default:
                return []
        }

    }
    const setModalProduct = (id: string) => {
        setSelectedProduct(id)
    }
    return (
        <ProductContext.Provider
            value={{
                selectedProduct,
                setModalProduct,
                searchProduct,
                clearSearch,
                productFilter,
                changeCategory,
                productItems,
                rawProductItems: productsRef.current,
                categories,
                search
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}