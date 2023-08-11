import { useEffect } from "react";

type Product = {
  id: number;
  title: string;
  image: string;
};
type ProductListsProps = {
    selectedProductIndex: number
    products: Product[];
    handleProductClick: (product: Product) => void
};
export default function ProductLists({ products ,selectedProductIndex, handleProductClick }: ProductListsProps) {

    function scrollActiveProductView(index: number){
        const activeProduct = document.getElementById(`product-${index}`);
        if(activeProduct){
            activeProduct.scrollIntoView({
                block: 'nearest',
                inline: 'start',
                behavior: 'smooth'
            })
        }
    }

    useEffect(()=>{
        if(selectedProductIndex !== -1){
            scrollActiveProductView(selectedProductIndex)
        }
    },[selectedProductIndex])
  return (
    <div className=" bg-white max-h-96 overflow-y-scroll resultProductContainer">
      {products.map((product, index) => (
        <div
          key={product.id}
          id={`product-${index}`}
          className={`${selectedProductIndex === index ? 'bg-gray-500' : ''}  py-2 px-4 flex items-center justify-between gap-8 hover:bg-gray-200 cursor-pointer`}
          onClick={()=> handleProductClick(product)}
        >
          <p>{product.title}</p>
          <img src={product.image} alt={product.title} className="w-8" />
        </div>
      ))}
    </div>
  );
}
