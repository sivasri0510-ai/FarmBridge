import { useState } from 'react'

function Fertilizers() {

  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  const products = [
    {
      icon: '🧪',
      name: 'Urea Fertilizer',
      category: 'Fertilizer',
      provider: 'GreenGrow Inputs',
      location: 'Eluru',
      price: '₹280 / 50 kg',
      available: '200 bags'
    },
    {
      icon: '🌱',
      name: 'DAP Fertilizer',
      category: 'Fertilizer',
      provider: 'AgriCare Inputs',
      location: 'Guntur',
      price: '₹1350 / 50 kg',
      available: '150 bags'
    },
    {
      icon: '🌿',
      name: 'Organic Compost',
      category: 'Organic Input',
      provider: 'Natural Farm Solutions',
      location: 'Vijayawada',
      price: '₹12 / kg',
      available: '1000 kg'
    },
    {
      icon: '🌾',
      name: 'Bio Fertilizer',
      category: 'Bio Input',
      provider: 'EcoGrow Agriculture',
      location: 'Rajahmundry',
      price: '₹180 / litre',
      available: '300 litres'
    },
    {
      icon: '🍃',
      name: 'Potash Fertilizer',
      category: 'Fertilizer',
      provider: 'AgriPlus Centre',
      location: 'Kakinada',
      price: '₹1700 / 50 kg',
      available: '100 bags'
    },
    {
      icon: '🛡️',
      name: 'Crop Protection Input',
      category: 'Crop Protection',
      provider: 'FarmSafe Solutions',
      location: 'Vijayawada',
      price: '₹450 / litre',
      available: '100 litres'
    }
  ]

  const filteredProducts = products.filter((product) => {

    const searchText =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())

    const locationText =
      product.location.toLowerCase().includes(location.toLowerCase())

    return searchText && locationText
  })

  return (
    <div>

      {/* ================= PAGE HEADER ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Fertilizers & Inputs
          </h1>

          <p className="text-muted">
            Find fertilizers, organic inputs and crop protection products.
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
              placeholder="Search fertilizer or input"
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


      {/* ================= PRODUCTS ================= */}

      <section className="container py-4">

        <h2 className="text-success fw-bold mb-4">
          Available Fertilizers & Inputs
        </h2>

        <div className="row g-4">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product, index) => (

              <div
                className="col-md-6 col-lg-4"
                key={index}
              >

                <div className="card h-100 p-4 shadow-sm">

                  <div className="fs-1 mb-3">
                    {product.icon}
                  </div>

                  <h4 className="text-success">
                    {product.name}
                  </h4>

                  <p>
                    Quality agricultural input suitable
                    for farming requirements.
                  </p>

                  <hr />

                  <p className="mb-2">
                    <strong>Category:</strong> {product.category}
                  </p>

                  <p className="mb-2">
                    <strong>Provider:</strong> {product.provider}
                  </p>

                  <p className="mb-2">
                    <strong>Location:</strong> {product.location}
                  </p>

                  <p className="mb-2">
                    <strong>Price:</strong> {product.price}
                  </p>

                  <p className="mb-3">
                    <strong>Available:</strong> {product.available}
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
                No fertilizers or inputs found.
              </div>

            </div>

          )}

        </div>

      </section>


      {/* ================= PROVIDER SECTION ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h2 className="text-success fw-bold">
            Are You a Fertilizer or Input Provider?
          </h2>

          <p className="text-muted">
            Providers can list their agricultural products
            and connect with farmers.
          </p>

          <button className="btn btn-success px-4">
            Become a Provider
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

export default Fertilizers