import { useState } from 'react'

function Irrigation() {

  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  const services = [
    {
      icon: '💧',
      name: 'Drip Irrigation System',
      category: 'Drip Irrigation',
      provider: 'JalAgri Solutions',
      location: 'Guntur',
      price: '₹18,000 / acre',
      available: 'Available'
    },
    {
      icon: '🚿',
      name: 'Sprinkler Irrigation',
      category: 'Sprinkler',
      provider: 'GreenWater Systems',
      location: 'Vijayawada',
      price: '₹15,000 / acre',
      available: 'Available'
    },
    {
      icon: '⚙️',
      name: 'Water Pump',
      category: 'Water Pump',
      provider: 'AgriFlow Equipment',
      location: 'Eluru',
      price: '₹22,000 / unit',
      available: '25 units'
    },
    {
      icon: '🔧',
      name: 'Irrigation Pipes',
      category: 'Pipes',
      provider: 'FarmTech Supplies',
      location: 'Rajahmundry',
      price: '₹120 / metre',
      available: '5000 metres'
    },
    {
      icon: '🚰',
      name: 'Water Filter',
      category: 'Filter',
      provider: 'PureAgri Systems',
      location: 'Kakinada',
      price: '₹8,500 / unit',
      available: '30 units'
    },
    {
      icon: '🛠️',
      name: 'Irrigation Maintenance',
      category: 'Maintenance',
      provider: 'AgriCare Services',
      location: 'Vijayawada',
      price: '₹1,500 / service',
      available: 'Available'
    }
  ]

  const filteredServices = services.filter((service) => {

    const searchMatch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.category.toLowerCase().includes(search.toLowerCase())

    const locationMatch =
      service.location.toLowerCase().includes(location.toLowerCase())

    return searchMatch && locationMatch
  })

  return (
    <div>

      {/* ================= PAGE HEADER ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Irrigation Services
          </h1>

          <p className="text-muted">
            Find irrigation systems, equipment and maintenance services.
          </p>

        </div>

      </section>


      {/* ================= SEARCH ================= */}

      <section className="container py-4">

        <div className="row g-3">

          <div className="col-md-5">

            <input
              type="text"
              className="form-control"
              placeholder="Search irrigation service"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <div className="col-md-4">

            <input
              type="text"
              className="form-control"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

          </div>


          <div className="col-md-3">

            <button className="btn btn-success w-100">
              Search
            </button>

          </div>

        </div>

      </section>


      {/* ================= IRRIGATION SERVICES ================= */}

      <section className="container py-4">

        <h2 className="text-success fw-bold mb-4">
          Available Irrigation Services
        </h2>


        <div className="row g-4">

          {filteredServices.length > 0 ? (

            filteredServices.map((service, index) => (

              <div
                className="col-md-6 col-lg-4"
                key={index}
              >

                <div className="card h-100 p-4 shadow-sm">

                  <div className="fs-1 mb-3">
                    {service.icon}
                  </div>


                  <h4 className="text-success">
                    {service.name}
                  </h4>


                  <p>
                    Reliable irrigation solution for
                    agricultural water management.
                  </p>


                  <hr />


                  <p className="mb-2">
                    <strong>Type:</strong> {service.category}
                  </p>


                  <p className="mb-2">
                    <strong>Provider:</strong> {service.provider}
                  </p>


                  <p className="mb-2">
                    <strong>Location:</strong> {service.location}
                  </p>


                  <p className="mb-2">
                    <strong>Price:</strong> {service.price}
                  </p>


                  <p className="mb-3">
                    <strong>Availability:</strong> {service.available}
                  </p>


                  <button className="btn btn-outline-success">
                    View Details
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="col-12">

              <div className="alert alert-warning text-center">
                No irrigation services found.
              </div>

            </div>

          )}

        </div>

      </section>


      {/* ================= PROVIDER SECTION ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h2 className="text-success fw-bold">
            Need Irrigation Support?
          </h2>

          <p className="text-muted">
            Find suitable irrigation providers and
            maintenance services through FarmBridge.
          </p>

          <button className="btn btn-success px-4">
            Find Providers
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="bg-success text-white py-4">

        <div className="container text-center">

          <h5 className="fw-bold">
            🌱 FarmBridge
          </h5>

          <p className="mb-0">
            Connecting Farmers to Services & Markets
          </p>

        </div>

      </footer>

    </div>
  )
}

export default Irrigation