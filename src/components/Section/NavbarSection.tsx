import React from 'react'
import { useProduct } from '../../context/ProductContext'
import { IoMdCart } from "react-icons/io";
import { useShoppingCart } from '../../context/CartContext';

const Navbar = () => {
  const { searchProduct } = useProduct()
  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchProduct(event.target.value);
  };

  const { showCheckOutModal, totalItems } = useShoppingCart()
  return (
    <div className='sticky top-0 shadow-sm p-4 bg-white z-10'>
      <div className='max-w-[70rem] flex flex-col mx-auto bg-white   gap-4'>
        <div className='items-center justify-between flex'>
          <div className="flex items-center gap-2">
            <img src='/brand-logo.png' className='aspect-square w-[2.5rem]' />
            <p className='font-semibold flex-shrink-0'>One for All</p>
          </div>
          <button className='p-2 relative border rounded-md' onClick={showCheckOutModal}>
            <IoMdCart className='text-violet-800' />
            <span className='absolute -top-2 px-2 rounded-full  text-xs bg-emerald-500 text-white p-1 font-semibold -right-4'>{totalItems}</span>
          </button>
        </div>
        <input type='text' className='border rounded-md w-full px-4 py-2 max-w-[70rem] mx-auto items-center' placeholder='Search Product' onChange={searchHandler} />
      </div>
    </div >
  )
}

export default Navbar