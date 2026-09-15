import { Link } from 'react-router-dom'

function Services() {

  const services = [
    {
      icon: '🌱',
      name: 'Seeds & Nursery',
      text: 'Find quality seeds, crop varieties and healthy nursery plants.',
      link: '/seeds'
    },
    {
      icon: '🧪',
      name: 'Fertilizers & Inputs',
      text: 'Find fertilizers, crop inputs and crop protection products.',
      link: '/fertilizers'
    },
    {
      icon: '💧',
      name: 'Irrigation',
      text: 'Find drip systems, sprinklers, pumps, pipes and irrigation solutions.',
      link: '/irrigation'
    },
    {
      icon: '🚜',
      name: 'Machinery Rental',
      text: 'Rent tractors, harvesters, rotavators, seeders and sprayers.',
      link: '/machinery'
    },
    {
      icon: '👨‍🌾',
      name: 'Labour Services',
      text: 'Find workers for sowing, harvesting, weeding and other farm activities.',
      link: '/labour'
    },
    {
      icon: '🚚',
      name: 'Logistics & Transport',
      text: 'Arrange trucks, mini-trucks and tractor trolleys for farm produce.',
      link: '/logistics'
    },
    {
      icon: '🏪',
      name: 'Collection Centres',
      text: 'Find centres for weighing, grading and collecting agricultural produce.',
      link: '/collection-centers'
    },
    {
      icon: '📦',
      name: 'Pack Houses',
      text: 'Access cleaning, sorting, grading, packing and pre-cooling facilities.',
      link: '/pack-houses'
    },
    {
      icon: '🏭',
      name: 'Processing & Value Addition',
      text: 'Connect with facilities for processing and value-added products.',
      link: '/processing'
    }
  ]

  return (
    <div>

      {/* ================= PAGE HEADER ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Agricultural Services
          </h1>

          <p className="text-muted">
            Find the services and resources you need for farming.
          </p>

        </div>

      </section>


      {/* ================= SERVICE CARDS ================= */}

      <section className="container py-5">

        <div className="row g-4">

          {services.map((service, index) => (

            <div
              className="col-md-6 col-lg-4"
              key={index}
            >

              <div className="card h-100 p-4 text-center shadow-sm">

                <div className="fs-1 mb-3">
                  {service.icon}
                </div>

                <h4 className="text-success">
                  {service.name}
                </h4>

                <p>
                  {service.text}
                </p>

                {service.link === '#' ? (

                  <button
                    className="btn btn-outline-success"
                    disabled
                  >
                    Coming Soon
                  </button>

                ) : (

                  <Link
                    className="btn btn-outline-success"
                    to={service.link}
                  >
                    View Services
                  </Link>

                )}

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= BOTTOM SECTION ================= */}

      <section className="bg-success text-white py-5">

        <div className="container text-center">

          <h2 className="fw-bold">
            Need an Agricultural Service?
          </h2>

          <p>
            FarmBridge helps farmers find suitable services
            from different providers.
          </p>

          <button className="btn btn-light text-success px-4">
            Get Started
          </button>

        </div>

      </section>

    </div>
  )
}

export default Services