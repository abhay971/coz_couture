import { CursorProvider } from './context/CursorContext'
import { LoadingProvider } from './context/LoadingContext'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { CustomCursor } from './components/ui/CustomCursor'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Preloader } from './components/sections/Preloader'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Categories } from './components/sections/Categories'
import { Process } from './components/sections/Process'
import { Capabilities } from './components/sections/Capabilities'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <LoadingProvider>
      <CursorProvider>
        <SmoothScroll>
          {/* Preloader */}
          <Preloader />

          {/* Custom Cursor */}
          <CustomCursor />

          {/* Header */}
          <Header />

          {/* Main Content */}
          <main>
            <Hero />
            <About />
            <Categories />
            <Process />
            <Capabilities />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </SmoothScroll>
      </CursorProvider>
    </LoadingProvider>
  )
}

export default App
