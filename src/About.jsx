import { Link } from 'react-router-dom'

function About() {

  return (
    <div>

      {/* ================= HEADER ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            About FarmBridge
          </h1>

          <p className="text-muted">
            An integrated agricultural service and market platform
          </p>

        </div>

      </section>


      {/* ================= WHAT IS FARMBRIDGE ================= */}

      <section className="container py-5">

        <div className="row align-items-center">

          <div className="col-lg-6">

            <h2 className="text-success fw-bold mb-3">
              What is FarmBridge?
            </h2>

            <p className="text-muted">
              FarmBridge is an agricultural service and market
              platform designed to help farmers find the services
              they need and connect with suitable market opportunities.
            </p>

            <p className="text-muted">
              The platform brings farmers, agricultural service
              providers and buyers together in one place.
            </p>

            <p className="text-muted mb-0">
              Farmers can find agricultural services, sell their
              produce, search for buyers and use produce aggregation
              to create larger marketable lots.
            </p>

          </div>


          <div className="col-lg-6 mt-4 mt-lg-0">

            <div className="card border-0 shadow-sm p-4">

              <h4 className="text-success fw-bold mb-3">
                Our Purpose
              </h4>

              <p className="text-muted mb-0">
                To make agricultural services and market
                opportunities easier to find and access by
                connecting different participants of the
                agricultural supply chain.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= PROBLEMS ================= */}

      <section className="bg-light py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="text-success fw-bold">
              Problems We Address
            </h2>

            <p className="text-muted">
              Farmers may face several difficulties while managing
              services and selling agricultural produce.
            </p>

          </div>


          <div className="row g-4">

            <div className="col-md-6 col-lg-3">

              <div className="card h-100 border-0 shadow-sm p-4">

                <h5 className="text-success fw-bold">
                  Finding Services
                </h5>

                <p className="text-muted mb-0">
                  Finding suitable seeds, fertilizers, machinery,
                  labour and irrigation services can be difficult.
                </p>

              </div>

            </div>


            <div className="col-md-6 col-lg-3">

              <div className="card h-100 border-0 shadow-sm p-4">

                <h5 className="text-success fw-bold">
                  Selling Produce
                </h5>

                <p className="text-muted mb-0">
                  Farmers may not always have easy access to
                  suitable buyers for their produce.
                </p>

              </div>

            </div>


            <div className="col-md-6 col-lg-3">

              <div className="card h-100 border-0 shadow-sm p-4">

                <h5 className="text-success fw-bold">
                  Transportation
                </h5>

                <p className="text-muted mb-0">
                  Arranging transportation for agricultural
                  produce can increase time and cost.
                </p>

              </div>

            </div>


            <div className="col-md-6 col-lg-3">

              <div className="card h-100 border-0 shadow-sm p-4">

                <h5 className="text-success fw-bold">
                  Post-Harvest Services
                </h5>

                <p className="text-muted mb-0">
                  Collection, grading, packing, storage and
                  processing services may not be easy to locate.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHAT FARMBRIDGE PROVIDES ================= */}

      <section className="container py-5">

        <div className="text-center mb-5">

          <h2 className="text-success fw-bold">
            What FarmBridge Provides
          </h2>

          <p className="text-muted">
            A single platform for important agricultural services
            and market activities.
          </p>

        </div>


        <div className="row g-4">

          <div className="col-md-6 col-lg-4">

            <div className="card h-100 border-0 shadow-sm p-4">

              <h5 className="text-success fw-bold">
                Agricultural Services
              </h5>

              <p className="text-muted mb-0">
                Farmers can find seeds, fertilizers, irrigation
                equipment, machinery, labour and logistics services.
              </p>

            </div>

          </div>


          <div className="col-md-6 col-lg-4">

            <div className="card h-100 border-0 shadow-sm p-4">

              <h5 className="text-success fw-bold">
                Post-Harvest Services
              </h5>

              <p className="text-muted mb-0">
                Collection centres, pack houses and processing
                services help manage produce after harvesting.
              </p>

            </div>

          </div>


          <div className="col-md-6 col-lg-4">

            <div className="card h-100 border-0 shadow-sm p-4">

              <h5 className="text-success fw-bold">
                Market Opportunities
              </h5>

              <p className="text-muted mb-0">
                Farmers can list their produce and search for
                buyers based on their requirements.
              </p>

            </div>

          </div>


          <div className="col-md-6 col-lg-4">

            <div className="card h-100 border-0 shadow-sm p-4">

              <h5 className="text-success fw-bold">
                Market Prices
              </h5>

              <p className="text-muted mb-0">
                Farmers can view market price information to
                support better selling decisions.
              </p>

            </div>

          </div>


          <div className="col-md-6 col-lg-4">

            <div className="card h-100 border-0 shadow-sm p-4">

              <h5 className="text-success fw-bold">
                Buyer Requirements
              </h5>

              <p className="text-muted mb-0">
                Buyers can specify the crop, quantity, quality
                and location they require.
              </p>

            </div>

          </div>


          <div className="col-md-6 col-lg-4">

            <div className="card h-100 border-0 shadow-sm p-4">

              <h5 className="text-success fw-bold">
                Produce Aggregation
              </h5>

              <p className="text-muted mb-0">
                Compatible produce from multiple farmers can be
                combined into larger marketable lots.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SMART AGGREGATION ================= */}

      <section className="bg-light py-5">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-7">

              <h2 className="text-success fw-bold mb-3">
                Smart Produce Aggregation
              </h2>

              <p className="text-muted">
                FarmBridge supports aggregation by comparing
                important produce details such as crop, variety,
                quantity, quality and location.
              </p>

              <p className="text-muted mb-0">
                Compatible produce from different farmers can be
                combined to form a larger lot that can better match
                buyer requirements.
              </p>

            </div>


            <div className="col-lg-5 mt-4 mt-lg-0">

              <div className="card border-success shadow-sm">

                <div className="card-body">

                  <h5 className="text-success fw-bold">
                    Aggregation Process
                  </h5>

                  <p className="mb-2">
                    1. Farmers list their produce
                  </p>

                  <p className="mb-2">
                    2. Produce details are compared
                  </p>

                  <p className="mb-2">
                    3. Compatible produce is identified
                  </p>

                  <p className="mb-2">
                    4. Produce is combined into a larger lot
                  </p>

                  <p className="mb-0">
                    5. The lot can be offered to buyers
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CALL TO ACTION ================= */}

      <section className="container py-5">

        <div className="text-center">

          <h2 className="text-success fw-bold">
            Explore FarmBridge
          </h2>

          <p className="text-muted">
            Explore agricultural services and market opportunities
            available through FarmBridge.
          </p>

          <div className="d-flex justify-content-center gap-2 flex-wrap">

            <Link
              to="/services"
              className="btn btn-success"
            >
              Explore Services
            </Link>

            <Link
              to="/sell-produce"
              className="btn btn-outline-success"
            >
              Sell Produce
            </Link>

            <Link
              to="/find-buyers"
              className="btn btn-outline-success"
            >
              Find Buyers
            </Link>

          </div>

        </div>

      </section>

    </div>
  )
}

export default About