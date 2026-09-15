import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function FindBuyers() {

  const navigate = useNavigate()

  const [crop, setCrop] = useState('')
  const [location, setLocation] = useState('')
  const [results, setResults] = useState([])


  const buyers = [
    {
      id: 1,
      name: 'Sri Lakshmi Foods',
      crop: 'Paddy',
      quantity: '5000 kg',
      quality: 'Grade A',
      location: 'Hyderabad',
      price: '₹28/kg',
      description:
        'Looking for quality paddy for food processing and rice production.'
    },

    {
      id: 2,
      name: 'Green Harvest Traders',
      crop: 'Maize',
      quantity: '3000 kg',
      quality: 'Grade A',
      location: 'Guntur',
      price: '₹24/kg',
      description:
        'Buyer looking for maize for feed and agricultural processing.'
    },

    {
      id: 3,
      name: 'Fresh Market Hub',
      crop: 'Tomato',
      quantity: '2000 kg',
      quality: 'Grade A',
      location: 'Hyderabad',
      price: '₹22/kg',
      description:
        'Fresh vegetable buyer looking for good quality tomatoes.'
    },

    {
      id: 4,
      name: 'Andhra Agro Traders',
      crop: 'Chilli',
      quantity: '1500 kg',
      quality: 'Grade A',
      location: 'Guntur',
      price: '₹180/kg',
      description:
        'Agricultural trader looking for quality chilli produce.'
    },

    {
      id: 5,
      name: 'Deccan Cotton Buyers',
      crop: 'Cotton',
      quantity: '8000 kg',
      quality: 'Grade A',
      location: 'Warangal',
      price: '₹72/kg',
      description:
        'Cotton buyer looking for good quality cotton from farmers.'
    },

    {
      id: 6,
      name: 'Farm Fresh Organics',
      crop: 'Groundnut',
      quantity: '2500 kg',
      quality: 'Grade A',
      location: 'Hyderabad',
      price: '₹65/kg',
      description:
        'Buyer interested in quality groundnut for food products.'
    }
  ]


  const handleSearch = (e) => {

    e.preventDefault()

    const cropSearch = crop.trim().toLowerCase()
    const locationSearch = location.trim().toLowerCase()

    const filteredBuyers = buyers.filter((buyer) => {

      const cropMatch =
        cropSearch === '' ||
        buyer.crop.toLowerCase().includes(cropSearch)

      const locationMatch =
        locationSearch === '' ||
        buyer.location.toLowerCase().includes(locationSearch)

      return cropMatch && locationMatch
    })

    setResults(filteredBuyers)
  }


  const handleViewDetails = (buyer) => {

    navigate('/buyer-details', {
      state: {
        buyer: buyer
      }
    })
  }


  return (
    <div>

      {/* Header */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Find Buyers
          </h1>

          <p className="text-muted">
            Find suitable buyers for your agricultural produce.
          </p>

        </div>

      </section>


      {/* Search Section */}

      <section className="container py-5">

        <div className="card shadow-sm border-0">

          <div className="card-body p-4">

            <h3 className="text-success fw-bold mb-4">
              Search for Buyers
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
                    Location
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
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

          </div>

        </div>

      </section>


      {/* Buyer Results */}

      <section className="container pb-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h3 className="text-success fw-bold mb-0">
            Available Buyers
          </h3>

          {results.length > 0 && (
            <span className="text-muted">
              {results.length} buyer(s) found
            </span>
          )}

        </div>


        <div className="row g-4">

          {(results.length > 0 ? results : buyers).map((buyer) => (

            <div
              className="col-md-6 col-lg-4"
              key={buyer.id}
            >

              <div className="card h-100 shadow-sm border-0">

                <div className="card-body p-4">

                  <h5 className="text-success fw-bold">
                    {buyer.name}
                  </h5>

                  <hr />


                  <p className="mb-2">
                    <strong>Crop:</strong> {buyer.crop}
                  </p>

                  <p className="mb-2">
                    <strong>Required Quantity:</strong> {buyer.quantity}
                  </p>

                  <p className="mb-2">
                    <strong>Quality:</strong> {buyer.quality}
                  </p>

                  <p className="mb-2">
                    <strong>Location:</strong> {buyer.location}
                  </p>

                  <p className="mb-3">
                    <strong>Expected Price:</strong> {buyer.price}
                  </p>

                  <p className="text-muted">
                    {buyer.description}
                  </p>


                  <button
                    type="button"
                    className="btn btn-success w-100 mt-2"
                    onClick={() => handleViewDetails(buyer)}
                  >
                    View Buyer Details
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* No Results */}

        {results.length === 0 &&
          crop.trim() !== '' &&
          location.trim() !== '' && (

            <div className="alert alert-warning mt-4 text-center">

              No buyers found for the selected crop and location.

            </div>

          )}

      </section>


      {/* Information Section */}

      <section className="container pb-5">

        <div className="bg-light rounded p-4 p-md-5">

          <h3 className="text-success fw-bold mb-3">
            How Buyer Matching Works
          </h3>

          <p className="mb-0">
            Farmers can search for buyers based on crop and
            location. FarmBridge displays suitable buyer
            requirements such as quantity, quality and expected
            price. Farmers can then view buyer details and
            continue the connection process.
          </p>

        </div>

      </section>

    </div>
  )
}

export default FindBuyers