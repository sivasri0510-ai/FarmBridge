import { useState } from 'react'

function Seeds() {

  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  const seeds = [
    {
      icon: '🌾',
      name: 'Paddy Seeds',
      category: 'Food Crop',
      provider: 'GreenGrow Seeds',
      location: 'Eluru',
      price: '₹65 / kg',
      available: '500 kg'
    },
    {
      icon: '🌽',
      name: 'Maize Seeds',
      category: 'Food Crop',
      provider: 'FarmFresh Seeds',
      location: 'Guntur',
      price: '₹80 / kg',
      available: '350 kg'
    },
    {
      icon: '🥕',
      name: 'Vegetable Seeds',
      category: 'Vegetables',
      provider: 'GreenLeaf Nursery',
      location: 'Vijayawada',
      price: '₹120 / packet',
      available: '200 packets'
    },
    {
      icon: '🌿',
      name: 'Nursery Plants',
      category: 'Nursery',
      provider: 'GreenLeaf Nursery',
      location: 'Rajahmundry',
      price: '₹25 / plant',
      available: '1000 plants'
    }
  ]

  const filteredSeeds = seeds.filter((seed) => {

    const searchMatch =
      seed.name.toLowerCase().includes(search.toLowerCase()) ||
      seed.category.toLowerCase().includes(search.toLowerCase())

    const locationMatch =
      seed.location.toLowerCase().includes(location.toLowerCase())

    return searchMatch && locationMatch
  })


  return (
    <div>

      {/* ================= PAGE HEADER ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Seeds & Nursery
          </h1>

          <p className="text-muted">
            Find quality seeds, crop varieties and healthy nursery plants.
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
              placeholder="Search crop or seed"
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

            <button
              className="btn btn-success w-100"
              onClick={() => {}}
            >
              Search
            </button>

          </div>

        </div>

      </section>


      {/* ================= AVAILABLE SEEDS ================= */}

      <section className="container py-4">

        <h2 className="text-success fw-bold mb-4">
          Available Seeds & Plants
        </h2>


        <div className="row g-4">

          {filteredSeeds.length > 0 ? (

            filteredSeeds.map((seed, index) => (

              <div
                className="col-md-6 col-lg-4"
                key={index}
              >

                <div className="card h-100 p-4 shadow-sm">

                  <div className="fs-1 mb-3">
                    {seed.icon}
                  </div>


                  <h4 className="text-success">
                    {seed.name}
                  </h4>


                  <p>
                    Quality {seed.name.toLowerCase()}
                    suitable for agricultural cultivation.
                  </p>


                  <hr />


                  <p className="mb-2">
                    <strong>Category:</strong> {seed.category}
                  </p>


                  <p className="mb-2">
                    <strong>Provider:</strong> {seed.provider}
                  </p>


                  <p className="mb-2">
                    <strong>Location:</strong> {seed.location}
                  </p>


                  <p className="mb-2">
                    <strong>Price:</strong> {seed.price}
                  </p>


                  <p className="mb-3">
                    <strong>Available:</strong> {seed.available}
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

                No seeds or nursery plants found.

              </div>

            </div>

          )}

        </div>

      </section>


      {/* ================= PROVIDER SECTION ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h2 className="text-success fw-bold">
            Looking for a Seed Provider?
          </h2>

          <p className="text-muted">
            FarmBridge helps farmers discover suitable
            seed and nursery providers.
          </p>

          <button className="btn btn-success px-4">
            Find Providers
          </button>

        </div>

      </section>


      {/* ================= FOOTER NOTE ================= */}

      <section className="py-4">

        <div className="container text-center">

          <p className="text-muted mb-0">
            More seed varieties and providers can be added
            when the backend and database are connected.
          </p>

        </div>

      </section>

    </div>
  )
}

export default Seeds