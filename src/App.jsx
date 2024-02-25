import ProductList from './components/Table'
import logo from './assets/react.svg'

function App() {
  return (
    <div>
      <header>
        <img src={logo} alt="logo" /><h3 className='table_title'>Products Table</h3>
      </header>
      <ProductList />
    </div>
  )
}

export default App
