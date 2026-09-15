import { useState } from 'react'

function Processing() {
  const [search, setSearch] = useState('')

  const processingUnits = [
    {
      name: 'Rice Processing Unit',
      location: 'Eluru',
      service: 'Cleaning, Milling, Packaging',
      provider: 'Sri Sai Rice Processing',
      charge: '₹3 / kg'
    },
    {
      name: 'Pulse Processing Unit',
      location: 'Guntur',
      service: 'Cleaning, Sorting, Processing',
      provider: 'AgriPulse Processing',
      charge: '₹4 / kg'
    },
    {
      name: 'Fruit Processing Unit',
      location: 'Vijayawada',
      service: 'Juice, Pulp, Packaging',
      provider: 'FreshFruit Processing',
      charge: '₹5 / kg'
    },
    {
      name: 'Millet Processing Unit',
      location: 'Kakinada',
      service: 'Cleaning, Grinding, Packaging',
      provider: 'HealthyGrain Processing',
      charge: '₹4 / kg'
    }
  ]

  const filteredUnits = processingUnits.filter((unit) =>
    unit.name.toLowerCase().includes(search.toLowerCase()) ||
    unit.location.toLowerCase().includes(search.toLowerCase()) ||
    unit.service.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="text-success fw-bold">
            Processing & Value Addition
          </h1>

          <p className="text-muted">
            Find facilities for processing agricultural produce and creating value-added products.
          </p>
        </div>
      </section>

      <section className="container py-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search processing unit or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="container py-4">

        <h2 className="text-success fw-bold mb-4">
          Available Processing Units
        </h2>

        <div className="row g-4">

          {filteredUnits.length > 0 ? (

            filteredUnits.map((unit, index) => (

              <div className="col-md-6 col-lg-4" key={index}>

                <div className="card h-100 p-4 shadow-sm">

                  <div className="fs-1 mb-3">
                    🏭
                  </div>

                  <h4 className="text-success">
                    {unit.name}
                  </h4>

                  <hr />

                  <p>
                    <strong>Services:</strong> {unit.service}
                  </p>

                  <p>
                    <strong>Provider:</strong> {unit.provider}
                  </p>

                  <p>
                    <strong>Location:</strong> {unit.location}
                  </p>

                  <p>
                    <strong>Service Charge:</strong> {unit.charge}
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
                No processing units found.
              </div>
            </div>

          )}

        </div>

      </section>

    </div>
  )
}

export default Processing