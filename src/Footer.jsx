import { Link } from 'react-router-dom'

function Footer() {

  return (
    <footer className="bg-dark text-light mt-5">

      <div className="container py-5">

        <div className="row g-4">

          {/* FarmBridge */}

          <div className="col-lg-4">

            <h3 className="text-success fw-bold">
              FarmBridge
            </h3>

            <p className="text-light">
              FarmBridge is an agricultural service and market
              platform that helps farmers find services, sell
              produce and connect with buyers.
            </p>

          </div>


          {/* Quick Links */}

          <div className="col-md-4 col-lg-2">

            <h5 className="text-success fw-bold mb-3">
              Quick Links
            </h5>

            <div className="d-flex flex-column gap-2">

              <Link
                to="/services"
                className="text-light text-decoration-none"
              >
                Services
              </Link>

              <Link
                to="/sell-produce"
                className="text-light text-decoration-none"
              >
                Sell Produce
              </Link>

              <Link
                to="/find-buyers"
                className="text-light text-decoration-none"
              >
                Find Buyers
              </Link>

              <Link
                to="/aggregation"
                className="text-light text-decoration-none"
              >
                Aggregation
              </Link>

            </div>

          </div>


          {/* Support */}

          <div className="col-md-4 col-lg-3">

            <h5 className="text-success fw-bold mb-3">
              Support
            </h5>

            <div className="d-flex flex-column gap-2">

              <Link
                to="/contact"
                className="text-light text-decoration-none"
              >
                Contact Us
              </Link>

              <Link
                to="/faq"
                className="text-light text-decoration-none"
              >
                FAQ
              </Link>

              <Link
                to="/how-it-works"
                className="text-light text-decoration-none"
              >
                How It Works
              </Link>

              <Link
                to="/site-map"
                className="text-light text-decoration-none"
              >
                Site Map
              </Link>

            </div>

          </div>


          {/* Legal */}

          <div className="col-md-4 col-lg-3">

            <h5 className="text-success fw-bold mb-3">
              Legal
            </h5>

            <div className="d-flex flex-column gap-2">

              <Link
                to="/privacy"
                className="text-light text-decoration-none"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-light text-decoration-none"
              >
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>

      </div>


      {/* Copyright */}

      <div className="border-top border-secondary">

        <div className="container py-3 text-center">

          <p className="mb-0 text-light">
            © 2026 FarmBridge. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer