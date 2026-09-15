import { Link } from 'react-router-dom'
import heroImage from './assets/hero.jpeg'

function Home() {

  const services = [
    {
      title: 'Seeds & Nurseries',
      description: 'Find quality seeds, crop varieties and nursery services.',
      link: '/seeds'
    },
    {
      title: 'Fertilizers & Inputs',
      description: 'Find fertilizers and agricultural crop inputs.',
      link: '/fertilizers'
    },
    {
      title: 'Irrigation',
      description: 'Find irrigation equipment, systems and maintenance services.',
      link: '/irrigation'
    },
    {
      title: 'Machinery Rental',
      description: 'Find tractors, harvesters and other farm machinery.',
      link: '/machinery'
    },
    {
      title: 'Labour',
      description: 'Find workers for sowing, harvesting and other farm activities.',
      link: '/labour'
    },
    {
      title: 'Logistics',
      description: 'Find transport services for agricultural produce.',
      link: '/logistics'
    },
    {
      title: 'Collection Centres',
      description: 'Find nearby collection and aggregation facilities.',
      link: '/collection-centers'
    },
    {
      title: 'Pack Houses',
      description: 'Find cleaning, sorting, grading and packing services.',
      link: '/pack-houses'
    },
    {
      title: 'Processing',
      description: 'Find processing and value addition services.',
      link: '/processing'
    }
  ]

  return (
    <div>

      {/* ================= HERO SECTION ================= */}

      <section
        className="text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,80,40,0.65), rgba(0,80,40,0.65)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          minHeight: '550px'
        }}
      >

        <div className="container py-5">

          <div className="row">

            <div className="col-lg-7">

              <h1 className="display-4 fw-bold mb-4">
                One Platform for Agriculture Services
              </h1>

              <p className="lead mb-4">
                FarmBridge helps farmers find agricultural services,
                sell their produce and connect with suitable buyers.
              </p>

              <div className="d-flex flex-wrap gap-3">

                <Link
                  to="/sell-produce"
                  className="btn btn-success btn-lg"
                >
                  Sell Produce
                </Link>

                <Link
                  to="/find-buyers"
                  className="btn btn-light btn-lg"
                >
                  Find Buyers
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= QUICK OPTIONS ================= */}

      <section className="container py-5">

        <div className="text-center mb-5">

          <h2 className="text-success fw-bold">
            What Can You Do?
          </h2>

          <p className="text-muted">
            Access important agricultural services and market opportunities.
          </p>

        </div>

        <div className="row g-4">

          <div className="col-md-4">

            <div className="card h-100 border-0 shadow-sm p-4 text-center">

              <h4 className="text-success fw-bold">
                Agricultural Services
              </h4>

              <p className="text-muted">
                Find seeds, fertilizers, irrigation, machinery,
                labour and other agricultural services.
              </p>

              <Link
                to="/services"
                className="btn btn-success"
              >
                Explore Services
              </Link>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card h-100 border-0 shadow-sm p-4 text-center">

              <h4 className="text-success fw-bold">
                Sell Produce
              </h4>

              <p className="text-muted">
                List your agricultural produce with quantity,
                quality, price and location details.
              </p>

              <Link
                to="/sell-produce"
                className="btn btn-success"
              >
                Sell Produce
              </Link>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card h-100 border-0 shadow-sm p-4 text-center">

              <h4 className="text-success fw-bold">
                Find Buyers
              </h4>

              <p className="text-muted">
                Search for buyers based on crop, quantity,
                quality and location.
              </p>

              <Link
                to="/find-buyers"
                className="btn btn-success"
              >
                Find Buyers
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SERVICES ================= */}

      <section className="bg-light py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="text-success fw-bold">
              Agricultural Services
            </h2>

            <p className="text-muted">
              Find the services you need for different stages of farming.
            </p>

          </div>


          <div className="row g-4">

            {services.map((service, index) => (

              <div
                className="col-md-6 col-lg-4"
                key={index}
              >

                <div className="card h-100 border-0 shadow-sm p-4">

                  <h4 className="text-success fw-bold">
                    {service.title}
                  </h4>

                  <p className="text-muted">
                    {service.description}
                  </p>

                  <Link
                    to={service.link}
                    className="text-success fw-bold text-decoration-none"
                  >
                    View Service →
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= SMART AGGREGATION ================= */}

      <section className="container py-5">

        <div className="row align-items-center">

          <div className="col-lg-7">

            <h2 className="text-success fw-bold mb-3">
              Smart Produce Aggregation
            </h2>

            <p className="text-muted">
              FarmBridge helps identify compatible produce from
              multiple farmers and combine it into larger marketable lots.
            </p>

            <p className="text-muted">
              Produce can be compared based on crop, variety,
              quantity, quality and location.
            </p>

            <Link
              to="/aggregation"
              className="btn btn-success"
            >
              Explore Aggregation
            </Link>

          </div>


          <div className="col-lg-5 mt-4 mt-lg-0">

            <div className="card border-0 shadow-sm p-4">

              <h4 className="text-success fw-bold mb-3">
                How It Helps
              </h4>

              <p className="text-muted">
                Farmers can combine compatible produce to create
                larger quantities that may better match buyer requirements.
              </p>

              <p className="text-muted mb-0">
                This can make selling larger marketable lots easier.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CREATE ACCOUNT ================= */}

      <section className="container pb-5">

        <div className="bg-success text-white rounded p-5 text-center">

          <h2 className="fw-bold mb-3">
            Create Your Account
          </h2>

          <p className="mb-4">
            Join FarmBridge and access agricultural services,
            buyers and market opportunities.
          </p>

          <Link
            to="/register"
            className="btn btn-light btn-lg"
          >
            Register Now
          </Link>

        </div>

      </section>

    </div>
  )
}

export default Home