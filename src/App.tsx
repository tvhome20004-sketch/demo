import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import contactData from './content/contact.json'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer companyName={contactData.company.name} />
    </div>
  )
}

export default App
