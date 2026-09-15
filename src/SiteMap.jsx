import { Link } from 'react-router-dom'

function SiteMap() {

  return (
    <div>

      {/* Page Header */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Site Map
          </h1>

          <p className="text-muted">
            Explore all pages and features available on FarmBridge.
          </p>

        </div>

      </section>


      {/* Site Map Content */}

      <section className="container py-5">

        <div className="row">

          {/* Main Pages */}

          <div className="col-md-6 mb-5">

            <h3 className="text-success fw-bold mb-3">
              Main Pages
            </h3>

            <div className="d-flex flex-column gap-2">

              <Link to="/" className="text-decoration-none text-dark">
                Home
              </Link>

              <Link to="/about" className="text-decoration-none text-dark">
                About
              </Link>

              <Link to="/services" className="text-decoration-none text-dark">
                Services
              </Link>

              <Link to="/sell-produce" className="text-decoration-none text-dark">
                Sell Produce
              </Link>

              <Link to="/find-buyers" className="text-decoration-none text-dark">
                Find Buyers
              </Link>

              <Link to="/aggregation" className="text-decoration-none text-dark">
                Aggregation
              </Link>

              <Link to="/market-prices" className="text-decoration-none text-dark">
                Market Prices
              </Link>

              <Link to="/login" className="text-decoration-none text-dark">
                Login
              </Link>

              <Link to="/register" className="text-decoration-none text-dark">
                Register
              </Link>

            </div>

          </div>


          {/* Agricultural Services */}

          <div className="col-md-6 mb-5">

            <h3 className="text-success fw-bold mb-3">
              Agricultural Services
            </h3>

            <div className="d-flex flex-column gap-2">

              <Link to="/seeds" className="text-decoration-none text-dark">
                Seeds & Nurseries
              </Link>

              <Link to="/fertilizers" className="text-decoration-none text-dark">
                Fertilizers & Crop Inputs
              </Link>

              <Link to="/irrigation" className="text-decoration-none text-dark">
                Irrigation
              </Link>

              <Link to="/machinery" className="text-decoration-none text-dark">
                Machinery Rental
              </Link>

              <Link to="/labour" className="text-decoration-none text-dark">
                Labour
              </Link>

              <Link to="/logistics" className="text-decoration-none text-dark">
                Logistics & Transport
              </Link>

            </div>

          </div>


          {/* Post-Harvest & Market */}

          <div className="col-md-6 mb-5">

            <h3 className="text-success fw-bold mb-3">
              Post-Harvest & Market
            </h3>

            <div className="d-flex flex-column gap-2">

              <Link
                to="/collection-centers"
                className="text-decoration-none text-dark"
              >
                Collection Centres
              </Link>

              <Link
                to="/pack-houses"
                className="text-decoration-none text-dark"
              >
                Pack Houses
              </Link>

              <Link
                to="/processing"
                className="text-decoration-none text-dark"
              >
                Processing & Value Addition
              </Link>

              <Link
                to="/find-buyers"
                className="text-decoration-none text-dark"
              >
                Buyer Marketplace
              </Link>

              <Link
                to="/market-prices"
                className="text-decoration-none text-dark"
              >
                Market Prices
              </Link>

              <Link
                to="/aggregation"
                className="text-decoration-none text-dark"
              >
                Smart Produce Aggregation
              </Link>

            </div>

          </div>


          {/* FarmBridge Features */}

          <div className="col-md-6 mb-5">

            <h3 className="text-success fw-bold mb-3">
              FarmBridge Features
            </h3>

            <div className="d-flex flex-column gap-2">

              <Link
                to="/aggregation"
                className="text-decoration-none text-dark"
              >
                Smart Aggregation
              </Link>

              <Link
                to="/market-prices"
                className="text-decoration-none text-dark"
              >
                Market Price Information
              </Link>

              <Link
                to="/contact"
                className="text-decoration-none text-dark"
              >
                Contact Us
              </Link>

              <Link
                to="/faq"
                className="text-decoration-none text-dark"
              >
                Frequently Asked Questions
              </Link>

              <Link
                to="/site-map"
                className="text-decoration-none text-dark"
              >
                Site Map
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default SiteMap