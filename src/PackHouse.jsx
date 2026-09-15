import { useState } from 'react'

function PackHouse() {
  const [search, setSearch] = useState('')

  const packHouses = [
    {
      name: 'Fresh Produce Pack House',
      location: 'Guntur',
      services: 'Cleaning, Sorting, Packing',
      provider: 'FreshFarm Pack House',
      charge: '₹4 / kg'
    },
    {
      name: 'Vegetable Packing Centre',
      location: 'Vijayawada',
      services: 'Sorting, Grading, Packing',
      provider: 'GreenPack Services',
      charge: '₹3 / kg'
    },
    {
      name: 'Fruit Pack House',
      location: 'Eluru',
      services: 'Cleaning, Grading, Pre-cooling',
      provider: 'FreshCrop Facilities',
      charge: '₹5 / kg'
    },
    {
      name: 'Agri Pre-Cooling Centre',
      location: 'Kakinada',
      services: 'Pre-cooling, Storage, Packing',
      provider: 'AgriFresh Centre',
      charge: '₹6 / kg'
    }
  ]

  const filteredPackHouses = packHouses.filter((house) =>
    house.name.toLowerCase().includes(search.toLowerCase()) ||
    house.location.toLowerCase().includes(search.toLowerCase()) ||
    house.services.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="text-success fw-bold">
            Pack Houses
          </h1>

          <p className="text-muted">
            Find facilities for cleaning, sorting, grading, packing and pre-cooling.
          </p>
        </div>
      </section>

      <section className="container py-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search pack house or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="container py-4">

        <h2 className="text-success fw-bold mb-4">
          Available Pack Houses
        </h2>

        <div className="row g-4">

          {filteredPackHouses.length > 0 ? (

            filteredPackHouses.map((house, index) => (

              <div className="col-md-6 col-lg-4" key={index}>

                <div className="card h-100 p-4 shadow-sm">

                  <div className="fs-1 mb-3">
                    📦
                  </div>

                  <h4 className="text-success">
                    {house.name}
                  </h4>

                  <hr />

                  <p>
                    <strong>Services:</strong> {house.services}
                  </p>

                  <p>
                    <strong>Provider:</strong> {house.provider}
                  </p>

                  <p>
                    <strong>Location:</strong> {house.location}
                  </p>

                  <p>
                    <strong>Service Charge:</strong> {house.charge}
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
                No pack houses found.
              </div>
            </div>

          )}

        </div>

      </section>

    </div>
  )
}

export default PackHouse