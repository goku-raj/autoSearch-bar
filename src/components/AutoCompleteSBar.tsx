import axios from "axios";
import { ChangeEvent,KeyboardEvent, useEffect, useRef, useState } from "react";
import ProductLists from "./ProductLists";

type Product = {
  id: number;
  title: string;
  image: string;
};

export default function AutoCompleteSBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setProducts(data);
    };
    fetchData();
  }, []);

  // Searching for products by query
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSearchResults(
      products.filter((product) =>
        product.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === 'ArrowUp'){
        setSelectedProductIndex(prevIndex =>{
            return prevIndex === -1 ? searchResults.length - 1 : prevIndex - 1;
        })
    } else if (e.key === 'ArrowDown'){
        setSelectedProductIndex(prevIndex =>{
            return prevIndex >= searchResults.length?  0 : prevIndex + 1 ;
        })
    } else if(e.key === 'Enter'){
        if (selectedProductIndex !== -1) {
            const selectedProduct = searchResults[selectedProductIndex];
            alert(`You selected ${selectedProduct.title}`);
            setQuery("");
            setSelectedProductIndex(-1);
            setSearchResults([]);
          }
    }
  }

  function handleProductClick(product: Product){
    alert(`You have selected ${product.title}`)
    setQuery('');
    setSearchResults([]);
}

  return (
    <div className="font-FiraCode flex flex-col max-w-lg mx-auto mt-20">
      <input
        type="text"
        className="px-10 py-1 
                        border-gray-500 
                          shadow-sm 
                          focus:outline-none 
                          focus:ring-2 
                         focus:border-blue-500"
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        value= { query }
        ref={inputRef}
        placeholder="Search Product"
      />
      {query !== '' && searchResults.length > 0 && (
        <ProductLists products = {searchResults}  selectedProductIndex = {selectedProductIndex} handleProductClick = {handleProductClick}/>
      ) }
    </div>
  );
}
