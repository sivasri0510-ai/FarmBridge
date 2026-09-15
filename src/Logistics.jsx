import { useState } from 'react'

function Logistics() {

  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  const logistics = [
    {
      icon: '🚚',
      name: 'Truck Transport',
      category: 'Truck',
      provider: 'AgriMove Logistics',
      location: 'Guntur',
      price: '₹25 / km',
      available: 'Available'
    },
    {
      icon: '🚛',
      name: 'Mini Truck',
      category: 'Mini Truck',
      provider: 'Farm Transport Services',
      location: 'Vijayawada',
      price: '₹18 / km',
      available: 'Available'
    },
    {
      icon: '🚜',
      name: 'Tractor Trolley',
      category: 'Tractor Trolley',
      provider: 'Rural Transport Group',
      location: 'Eluru',
      price: '₹15 / km',
      available: 'Available'
    },
    {
      icon: '❄️',
      name: 'Refrigerated Vehicle',
      category: 'Cold Transport',
      provider: 'FreshMove Logistics',
      location: 'Kakinada',
      price: '₹35 / km',
      available: 'Available'
    },
    {
      icon: '📦',
      name: 'Produce Transportation',
      category: 'Farm Produce',
      provider: 'AgriRoute Services',
      location: 'Rajahmundry',
      price: '₹22 / km',
      available: 'Available'
    },
    {
      icon: '🚐',
      name: 'Small Goods Vehicle',
      category: 'Goods Vehicle',
      provider: 'FarmLink Transport',
      location: 'Guntur',
      price: '₹16 / km',
      available: 'Available'
    }
  ]

  const filteredLogistics = logistics.filter((item) => {

    const searchMatch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())

    const locationMatch =
      item.location.toLowerCase().includes(location.toLowerCase())

    return searchMatch && locationMatch
  })

  return (
    <div>

      {/* PAGE HEADER */}

      <section className="bg-light py-5">
        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Logistics & Transport
          </h1>

          <p className="text-muted">
            Find reliable transportation for agricultural produce and farm materials.
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
              placeholder="Search transport service"
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


      {/* TRANSPORT SERVICES */}

      <section className="container py-4">

        <h2 className="text-success fw-bold mb-4">
          Available Transport Services
        </h2>


        <div className="row g-4">

          {filteredLogistics.length > 0 ? (

            filteredLogistics.map((item, index) => (

              <div
                className="col-md-6 col-lg-4"
                key={index}
              >

                <div className="card h-100 p-4 shadow-sm">

                  <div className="fs-1 mb-3">
                    {item.icon}
                  </div>


                  <h4 className="text-success">
                    {item.name}
                  </h4>


                  <p>
                    Reliable transportation service for
                    agricultural needs through FarmBridge.
                  </p>


                  <hr />


                  <p className="mb-2">
                    <strong>Type:</strong> {item.category}
                  </p>


                  <p className="mb-2">
                    <strong>Provider:</strong> {item.provider}
                  </p>


                  <p className="mb-2">
                    <strong>Location:</strong> {item.location}
                  </p>


                  <p className="mb-2">
                    <strong>Price:</strong> {item.price}
                  </p>


                  <p className="mb-3">
                    <strong>Availability:</strong> {item.available}
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
                No transport services found.
              </div>

            </div>

          )}

        </div>

      </section>


      {/* SUPPORT SECTION */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h2 className="text-success fw-bold">
            Need Transportation?
          </h2>

          <p className="text-muted">
            Find suitable vehicles for transporting farm produce
            and agricultural materials.
          </p>

          <button className="btn btn-success px-4">
            Find Transport
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

export default Logistics