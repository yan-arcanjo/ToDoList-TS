import { Header } from "./components/Header"
import styles from "./App.module.css"
import './global.css'
import { InputItem } from "./components/InputItem"

function App() {
  return (
    <div>
      <Header /> 
    <div className={styles.principal}>
      <main>
        <InputItem />
      </main> 
    </div>  
    </div>
  )
}

export default App
