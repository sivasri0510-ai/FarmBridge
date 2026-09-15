import { useState } from 'react'

function MarketPrices() {

  const [crop, setCrop] = useState('')
  const [location, setLocation] = useState('')
  const [results, setResults] = useState([])

  const marketPrices = [
    {
      id: 1,
      crop: 'Paddy',
      variety: 'BPT 5204',
      market: 'Hyderabad',
      price: 28,
      unit: 'kg',
      trend: 'Stable'
    },
    {
      id: 2,
      crop: 'Maize',
      variety: 'Hybrid Maize',
      market: 'Guntur',
      price: 24,
      unit: 'kg',
      trend: 'Rising'
    },
    {
      id: 3,
      crop: 'Cotton',
      variety: 'Long Staple',
      market: 'Warangal',
      price: 72,
      unit: 'kg',
      trend: 'Rising'
    },
    {
      id: 4,
      crop: 'Tomato',
      variety: 'Hybrid',
      market: 'Hyderabad',
      price: 22,
      unit: 'kg',
      trend: 'Falling'
    },
    {
      id: 5,
      crop: 'Chilli',
      variety: 'Dry Chilli',
      market: 'Guntur',
      price: 180,
      unit: 'kg',
      trend: 'Rising'
    },
    {
      id: 6,
      crop: 'Groundnut',
      variety: 'Bold',
      market: 'Hyderabad',
      price: 65,
      unit: 'kg',
      trend: 'Stable'
    }
  ]


  const handleSearch = (e) => {

    e.preventDefault()

    const cropSearch = crop.trim().toLowerCase()
    const locationSearch = location.trim().toLowerCase()

    const filtered = marketPrices.filter((item) => {

      const cropMatch =
        cropSearch === '' ||
        item.crop.toLowerCase().includes(cropSearch) ||
        item.variety.toLowerCase().includes(cropSearch)

      const locationMatch =
        locationSearch === '' ||
        item.market.toLowerCase().includes(locationSearch)

      return cropMatch && locationMatch
    })

    setResults(filtered)
  }


  const handleClear = () => {

    setCrop('')
    setLocation('')
    setResults([])

  }


  const displayedPrices =
    results.length > 0 || crop !== '' || location !== ''
      ? results
      : marketPrices


  return (
    <div>

      {/* Header */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Market Prices
          </h1>

          <p className="text-muted">
            Check sample market prices and make better selling decisions.
          </p>

        </div>

      </section>


      {/* Search */}

      <section className="container py-5">

        <div className="card shadow-sm border-0">

          <div className="card-body p-4">

            <h3 className="text-success fw-bold mb-4">
              Search Market Prices
            </h3>

            <form onSubmit={handleSearch}>

              <div className="row g-3">

                <div className="col-md-5">

                  <label className="form-label fw-semibold">
                    Crop
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter crop name"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                  />

                </div>


                <div className="col-md-5">

                  <label className="form-label fw-semibold">
                    Market / Location
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter market or location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />

                </div>


                <div className="col-md-2 d-flex align-items-end">

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                  >
                    Search
                  </button>

                </div>

              </div>

            </form>


            <button
              type="button"
              className="btn btn-outline-secondary mt-3"
              onClick={handleClear}
            >
              Clear Search
            </button>

          </div>

        </div>

      </section>


      {/* Prices */}

      <section className="container pb-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h3 className="text-success fw-bold mb-0">
            Current Market Prices
          </h3>

          <span className="text-muted">
            {displayedPrices.length} result(s)
          </span>

        </div>


        {displayedPrices.length > 0 ? (

          <div className="row g-4">

            {displayedPrices.map((item) => (

              <div
                className="col-md-6 col-lg-4"
                key={item.id}
              >

                <div className="card shadow-sm border-0 h-100">

                  <div className="card-body p-4">

                    <h4 className="text-success fw-bold">
                      {item.crop}
                    </h4>

                    <p className="text-muted mb-3">
                      {item.variety}
                    </p>

                    <hr />

                    <p className="mb-2">
                      <strong>Market:</strong> {item.market}
                    </p>

                    <p className="mb-2">
                      <strong>Price:</strong> ₹{item.price}/{item.unit}
                    </p>

                    <p className="mb-0">
                      <strong>Trend:</strong> {item.trend}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="alert alert-warning text-center">
            No market prices found for the selected crop or location.
          </div>

        )}

      </section>


      {/* Information */}

      <section className="container pb-5">

        <div className="bg-light rounded p-4 p-md-5">

          <h3 className="text-success fw-bold mb-3">
            Make Better Selling Decisions
          </h3>

          <p className="mb-0">
            Farmers can compare market prices before deciding where
            and when to sell their produce. Market information can
            help farmers understand price differences and choose
            suitable selling opportunities.
          </p>

        </div>

      </section>

    </div>
  )
}

export default MarketPrices