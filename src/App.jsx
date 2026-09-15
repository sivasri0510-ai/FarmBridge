import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from 'react-router-dom'

import Home from './Home'
import Services from './Services'
import About from './About'
import Seeds from './Seeds'
import Fertilizers from './Fertilizers'
import Irrigation from './Irrigation'
import Machinery from './Machinery'
import Labour from './Labour'
import Logistics from './Logistics'
import CollectionCenter from './CollectionCenter'
import PackHouse from './PackHouse'
import Processing from './Processing'
import SellProduce from './SellProduce'
import FindBuyers from './FindBuyers'
import BuyerDetails from './BuyerDetails'
import ContactBuyer from './ContactBuyer'
import SmartAggregation from './SmartAggregation'
import MarketPrices from './MarketPrices'
import NetRealization from './NetRealization'
import HowItWorks from './HowItWorks'
import Contact from './Contact'
import FAQ from './FAQ'
import SiteMap from './SiteMap'
import PrivacyPolicy from './PrivacyPolicy'
import Terms from './Terms'
import Login from './Login'
import Register from './Register'
import Footer from './Footer'

function App() {
  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'text-success fw-bold' : 'text-dark'}`

  return (
    <BrowserRouter>

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">

          <NavLink
            to="/"
            className="navbar-brand text-success fw-bold"
          >
            🌱 FarmBridge
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={navLinkClass}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/services"
                  className={navLinkClass}
                >
                  Services
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/sell-produce"
                  className={navLinkClass}
                >
                  Sell Produce
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/find-buyers"
                  className={navLinkClass}
                >
                  Find Buyers
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/aggregation"
                  className={navLinkClass}
                >
                  Aggregation
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/market-prices"
                  className={navLinkClass}
                >
                  Market Prices
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/net-realization"
                  className={navLinkClass}
                >
                  Net Realization
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={navLinkClass}
                >
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={navLinkClass}
                >
                  Login
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/register"
                  className={navLinkClass}
                >
                  Register
                </NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/services" element={<Services />} />

        <Route path="/about" element={<About />} />

        <Route path="/seeds" element={<Seeds />} />

        <Route
          path="/fertilizers"
          element={<Fertilizers />}
        />

        <Route
          path="/irrigation"
          element={<Irrigation />}
        />

        <Route
          path="/machinery"
          element={<Machinery />}
        />

        <Route
          path="/labour"
          element={<Labour />}
        />

        <Route
          path="/logistics"
          element={<Logistics />}
        />

        <Route
          path="/collection-centers"
          element={<CollectionCenter />}
        />

        <Route
          path="/pack-houses"
          element={<PackHouse />}
        />

        <Route
          path="/processing"
          element={<Processing />}
        />

        <Route
          path="/sell-produce"
          element={<SellProduce />}
        />

        <Route
          path="/find-buyers"
          element={<FindBuyers />}
        />

        <Route
          path="/buyer-details"
          element={<BuyerDetails />}
        />

        <Route
          path="/contact-buyer"
          element={<ContactBuyer />}
        />

        <Route
          path="/aggregation"
          element={<SmartAggregation />}
        />

        <Route
          path="/market-prices"
          element={<MarketPrices />}
        />

        <Route
          path="/net-realization"
          element={<NetRealization />}
        />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/faq"
          element={<FAQ />}
        />

        <Route
          path="/site-map"
          element={<SiteMap />}
        />

        <Route
          path="/privacy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App