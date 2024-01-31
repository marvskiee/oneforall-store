import './App.css';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Home from './pages/Home';

function App() {

  return (
    <div className="App">
      <ProductProvider>
        <CartProvider>
          <Home />
        </CartProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
