import '@/styles/globals.css'
import Link from 'next/link'


export default function App({ Component, pageProps }) {
  function MyApp({ Component, pageProps }) {
    useEffect(() => {
      return () => {
        second
      }
    }, [])
    const [cart, setcart] = useState([])
    const addToCart = (item, qty) => {
      let newCart = cart
      newCart.push(item)
      setcart(newCart)
    }
    const removeFromCart = (item, qty) => {
      const newCart = cart
      let index = newCart.indexOf(item)
      newCart.splice(index)
      setcart(newCart)
    }
    const clearCart = (item, qty) => {
      setcart([])
    }

    return <><header class="text-gray-400 bg-gray-900 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href='/'> <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <img className='w-8' src='/logo.svg' alt='scart' />
          <span class="ml-3 text-xl">MyShop</span>
        </a> </Link>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" class="mr-5 hover:text-white">Home</Link>
          <Link href="/about" class="mr-5 hover:text-white">About</Link>
          <Link href="/products" class="mr-5 hover:text-white">Products</Link>
          <Link href="/contact" class="mr-5 hover:text-white">Contact Us</Link>
          <Link href="/cart" class="mr-5 hover:text-white">Cart(0)</Link>
        </nav>
        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </div>
    </header> <Component removeFromCart={removeFromCart} addToCart={addToCart} clearCart={clearCart}{...pageProps} /></>
  }
}
