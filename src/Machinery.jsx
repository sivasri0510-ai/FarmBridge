import { useState } from 'react'

function Machinery() {

  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  const machines = [
    {
      icon: '🚜',
      name: 'Tractor',
      category: 'Tractor',
      provider: 'Sri Sai Machinery',
      location: 'Guntur',
      price: '₹1,200 / hour',
      available: 'Available'
    },
    {
      icon: '🌾',
      name: 'Combine Harvester',
      category: 'Harvester',
      provider: 'AgriTech Rentals',
      location: 'Eluru',
      price: '₹2,500 / hour',
      available: 'Available'
    },
    {
      icon: '⚙️',
      name: 'Rotavator',
      category: 'Tillage Equipment',
      provider: 'Farm Equipment Hub',
      location: 'Vijayawada',
      price: '₹900 / hour',
      available: 'Available'
    },
    {
      icon: '🌱',
      name: 'Seed Drill',
      category: 'Seeding Equipment',
      provider: 'GreenField Machinery',
      location: 'Rajahmundry',
      price: '₹1,000 / hour',
      available: 'Available'
    },
    {
      icon: '💦',
      name: 'Crop Sprayer',
      category: 'Sprayer',
      provider: 'AgriServe Rentals',
      location: 'Kakinada',
      price: '₹700 / hour',
      available: 'Available'
    },
    {
      icon: '🌾',
      name: 'Thresher',
      category: 'Threshing Equipment',
      provider: 'FarmTech Rentals',
      location: 'Vijayawada',
      price: '₹1,500 / hour',
      available: 'Available'
    }
  ]

  const filteredMachines = machines.filter((machine) => {

    const searchMatch =
      machine.name.toLowerCase().includes(search.toLowerCase()) ||
      machine.category.toLowerCase().includes(search.toLowerCase())

    const locationMatch =
      machine.location.toLowerCase().includes(location.toLowerCase())

    return searchMatch && locationMatch
  })

  return (
    <div>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="text-success fw-bold">
            Machinery Rental
          </h1>

          <p className="text-muted">
            Rent agricultural machinery and equipment from nearby providers.
          </p>
        </div>
      </section>


      <section className="container py-4">

        <div className="row g-3">

          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search machinery"
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


      <section className="container py-4">

        <h2 className="text-success fw-bold mb-4">
          Available Machinery
        </h2>

        <div className="row g-4">

          {filteredMachines.length > 0 ? (

            filteredMachines.map((machine, index) => (

              <div
                className="col-md-6 col-lg-4"
                key={index}
              >

                <div className="card h-100 p-4 shadow-sm">

                  <div className="fs-1 mb-3">
                    {machine.icon}
                  </div>

                  <h4 className="text-success">
                    {machine.name}
                  </h4>

                  <p>
                    Agricultural machinery available
                    for rental through FarmBridge providers.
                  </p>

                  <hr />

                  <p className="mb-2">
                    <strong>Type:</strong> {machine.category}
                  </p>

                  <p className="mb-2">
                    <strong>Provider:</strong> {machine.provider}
                  </p>

                  <p className="mb-2">
                    <strong>Location:</strong> {machine.location}
                  </p>

                  <p className="mb-2">
                    <strong>Rental Price:</strong> {machine.price}
                  </p>

                  <p className="mb-3">
                    <strong>Availability:</strong> {machine.available}
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
                No machinery found.
              </div>
            </div>

          )}

        </div>

      </section>


      <section className="bg-light py-5">

        <div className="container text-center">

          <h2 className="text-success fw-bold">
            Need Agricultural Machinery?
          </h2>

          <p className="text-muted">
            Find tractors, harvesters and other farm equipment
            from service providers.
          </p>

          <button className="btn btn-success px-4">
            Find Machinery
          </button>

        </div>

      </section>


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

export default Machinery