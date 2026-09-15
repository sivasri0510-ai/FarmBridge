import { useState } from 'react'

function Labour() {

  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  const labourServices = [
    {
      icon: '🌱',
      name: 'Sowing Labour',
      category: 'Sowing',
      provider: 'Sri Lakshmi Farm Workers',
      location: 'Guntur',
      price: '₹600 / day',
      available: 'Available'
    },
    {
      icon: '🌾',
      name: 'Harvesting Labour',
      category: 'Harvesting',
      provider: 'Green Field Workers',
      location: 'Eluru',
      price: '₹700 / day',
      available: 'Available'
    },
    {
      icon: '🌿',
      name: 'Weeding Labour',
      category: 'Weeding',
      provider: 'FarmCare Labour Group',
      location: 'Vijayawada',
      price: '₹550 / day',
      available: 'Available'
    },
    {
      icon: '💦',
      name: 'Spraying Labour',
      category: 'Crop Spraying',
      provider: 'AgriWork Services',
      location: 'Rajahmundry',
      price: '₹650 / day',
      available: 'Available'
    },
    {
      icon: '📦',
      name: 'Packing Labour',
      category: 'Packing',
      provider: 'Farm Support Group',
      location: 'Kakinada',
      price: '₹600 / day',
      available: 'Available'
    },
    {
      icon: '👨‍🌾',
      name: 'General Farm Labour',
      category: 'Farm Work',
      provider: 'Rural Farm Workers',
      location: 'Guntur',
      price: '₹650 / day',
      available: 'Available'
    }
  ]

  const filteredServices = labourServices.filter((service) => {

    const searchMatch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.category.toLowerCase().includes(search.toLowerCase())

    const locationMatch =
      service.location.toLowerCase().includes(location.toLowerCase())

    return searchMatch && locationMatch
  })

  return (
    <div>

      {/* PAGE HEADER */}

      <section className="bg-light py-5">
        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Labour Services
          </h1>

          <p className="text-muted">
            Find workers for different agricultural activities.
          </p>

        </div>
      </section>


      {/* SEARCH */}

      <section className="container py-4">

        <div className="row g-3">

          <div className="col-md-5">

            <input
              type="text"
              className="form-control"
              placeholder="Search labour service"
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


      {/* LABOUR SERVICES */}

      <section className="container py-4">

        <h2 className="text-success fw-bold mb-4">
          Available Labour Services
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
                    Skilled workers available for
                    agricultural activities through FarmBridge.
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
                No labour services found.
              </div>

            </div>

          )}

        </div>

      </section>


      {/* PROVIDER SECTION */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h2 className="text-success fw-bold">
            Need Farm Workers?
          </h2>

          <p className="text-muted">
            Find suitable workers for sowing, harvesting,
            weeding and other farm activities.
          </p>

          <button className="btn btn-success px-4">
            Find Workers
          </button>

        </div>

      </section>


      {/* FOOTER */}

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

export default Labour