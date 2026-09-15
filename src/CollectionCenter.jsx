import { useState } from 'react'

function CollectionCenter() {
  const [search, setSearch] = useState('')

  const centres = [
    {
      name: 'Agri Collection Centre',
      location: 'Guntur',
      type: 'Weighing & Collection',
      provider: 'FarmFresh Centre',
      charge: '₹2 / kg'
    },
    {
      name: 'Grain Collection Centre',
      location: 'Eluru',
      type: 'Grain Collection',
      provider: 'GreenHarvest Centre',
      charge: '₹2 / kg'
    },
    {
      name: 'Vegetable Collection Centre',
      location: 'Vijayawada',
      type: 'Vegetable Collection',
      provider: 'FreshCrop Centre',
      charge: '₹1.5 / kg'
    },
    {
      name: 'Grading Centre',
      location: 'Kakinada',
      type: 'Grading',
      provider: 'AgriGrade Services',
      charge: '₹3 / kg'
    }
  ]

  const filteredCentres = centres.filter((centre) =>
    centre.name.toLowerCase().includes(search.toLowerCase()) ||
    centre.location.toLowerCase().includes(search.toLowerCase()) ||
    centre.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>

      {/* Page Heading */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="text-success fw-bold">
            Collection Centres
          </h1>

          <p className="text-muted">
            Find centres for collecting, weighing and grading farm produce.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="container py-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search collection centre or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Cards */}
      <section className="container py-4">

        <h2 className="text-success fw-bold mb-4">
          Available Collection Centres
        </h2>

        <div className="row g-4">

          {filteredCentres.length > 0 ? (

            filteredCentres.map((centre, index) => (

              <div className="col-md-6 col-lg-4" key={index}>

                <div className="card h-100 p-4 shadow-sm">

                  <div className="fs-1 mb-3">
                    🏪
                  </div>

                  <h4 className="text-success">
                    {centre.name}
                  </h4>

                  <hr />

                  <p>
                    <strong>Type:</strong> {centre.type}
                  </p>

                  <p>
                    <strong>Provider:</strong> {centre.provider}
                  </p>

                  <p>
                    <strong>Location:</strong> {centre.location}
                  </p>

                  <p>
                    <strong>Service Charge:</strong> {centre.charge}
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
                No collection centres found.
              </div>
            </div>

          )}

        </div>

      </section>

    </div>
  )
}

export default CollectionCenter