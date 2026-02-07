import Header from './components/Header'
import Hero from './components/Hero'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <Hero />
        <InfoSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
