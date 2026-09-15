import { Link } from 'react-router-dom'

function HowItWorks() {

  return (
    <div>

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            How It Works
          </h1>

          <p className="text-muted">
            FarmBridge makes agricultural services and market connections simple.
          </p>

        </div>

      </section>


      {/* Farmers */}

      <section className="container py-5">

        <h2 className="text-success fw-bold text-center mb-5">
          For Farmers
        </h2>

        <div className="row g-4">

          <div className="col-md-6 col-lg-3">
            <div className="bg-light rounded p-4 h-100">
              <h4 className="text-success fw-bold">
                1. Register
              </h4>
              <p className="mb-0">
                Create a FarmBridge account and provide your basic
                details.
              </p>
            </div>
          </div>


          <div className="col-md-6 col-lg-3">
            <div className="bg-light rounded p-4 h-100">
              <h4 className="text-success fw-bold">
                2. Find Services
              </h4>
              <p className="mb-0">
                Find seeds, fertilizers, irrigation, machinery,
                labour and other agricultural services.
              </p>
            </div>
          </div>


          <div className="col-md-6 col-lg-3">
            <div className="bg-light rounded p-4 h-100">
              <h4 className="text-success fw-bold">
                3. List Produce
              </h4>
              <p className="mb-0">
                Add your crop, quantity, quality, price and
                location to sell your produce.
              </p>
            </div>
          </div>


          <div className="col-md-6 col-lg-3">
            <div className="bg-light rounded p-4 h-100">
              <h4 className="text-success fw-bold">
                4. Find Buyers
              </h4>
              <p className="mb-0">
                Search for suitable buyers based on crop and
                location.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* Service Providers */}

      <section className="container pb-5">

        <h2 className="text-success fw-bold text-center mb-5">
          For Service Providers
        </h2>

        <div className="row g-4 justify-content-center">

          <div className="col-md-6 col-lg-4">

            <div className="bg-light rounded p-4 h-100">

              <h4 className="text-success fw-bold">
                1. Register
              </h4>

              <p>
                Create an account as an agricultural service
                provider.
              </p>

              <h4 className="text-success fw-bold">
                2. List Your Service
              </h4>

              <p>
                Add service details, location, availability and
                pricing information.
              </p>

              <h4 className="text-success fw-bold">
                3. Connect with Farmers
              </h4>

              <p className="mb-0">
                Farmers can find your services and contact you
                through FarmBridge.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Buyers */}

      <section className="container pb-5">

        <h2 className="text-success fw-bold text-center mb-5">
          For Buyers
        </h2>

        <div className="row g-4 justify-content-center">

          <div className="col-md-6 col-lg-4">

            <div className="bg-light rounded p-4 h-100">

              <h4 className="text-success fw-bold">
                1. Register
              </h4>

              <p>
                Create a buyer account on FarmBridge.
              </p>

              <h4 className="text-success fw-bold">
                2. Search Produce
              </h4>

              <p>
                Find agricultural produce based on crop,
                quantity, quality and location.
              </p>

              <h4 className="text-success fw-bold">
                3. Connect with Farmers
              </h4>

              <p className="mb-0">
                View buyer and produce details and contact
                suitable users.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Smart Aggregation */}

      <section className="container pb-5">

        <div className="bg-light rounded p-4 p-md-5">

          <h2 className="text-success fw-bold mb-4 text-center">
            Smart Produce Aggregation
          </h2>

          <p className="text-center mb-4">
            FarmBridge can combine compatible produce from
            multiple farmers into a larger marketable lot.
          </p>


          <div className="row g-4">

            <div className="col-md-4">

              <div className="bg-white rounded p-4 h-100">

                <h5 className="text-success fw-bold">
                  Farmer A
                </h5>

                <p className="mb-0">
                  Paddy - 3000 kg
                  <br />
                  Grade A
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="bg-white rounded p-4 h-100">

                <h5 className="text-success fw-bold">
                  Farmer B
                </h5>

                <p className="mb-0">
                  Paddy - 2500 kg
                  <br />
                  Grade A
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="bg-white rounded p-4 h-100">

                <h5 className="text-success fw-bold">
                  Farmer C
                </h5>

                <p className="mb-0">
                  Paddy - 4500 kg
                  <br />
                  Grade A
                </p>

              </div>

            </div>

          </div>


          <div className="text-center mt-4">

            <h4 className="text-success fw-bold">
              Aggregated Lot: 10,000 kg
            </h4>

            <p className="mb-0">
              Compatible produce can be combined to meet larger
              buyer requirements.
            </p>

          </div>


          <div className="text-center mt-4">

            <Link
              to="/aggregation"
              className="btn btn-success"
            >
              Try Smart Aggregation
            </Link>

          </div>

        </div>

      </section>


      {/* Final CTA */}

      <section className="container pb-5">

        <div className="bg-success text-white rounded p-4 p-md-5 text-center">

          <h2 className="fw-bold mb-3">
            Get Started with FarmBridge
          </h2>

          <p className="mb-4">
            Join FarmBridge to find agricultural services,
            sell produce and connect with buyers.
          </p>

          <Link
            to="/register"
            className="btn btn-light"
          >
            Create Your Account
          </Link>

        </div>

      </section>

    </div>
  )
}

export default HowItWorks