import { useState } from 'react'

function SmartAggregation() {

  const [formData, setFormData] = useState({
    crop: '',
    variety: '',
    quantity: '',
    quality: '',
    location: '',
    harvestDate: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const [matchedFarmers, setMatchedFarmers] = useState([])


  const farmers = [
    {
      id: 1,
      name: 'Farmer A',
      crop: 'Paddy',
      variety: 'BPT 5204',
      quantity: 3000,
      quality: 'Grade A',
      location: 'Hyderabad',
      harvestDate: '2026-10-10'
    },
    {
      id: 2,
      name: 'Farmer B',
      crop: 'Paddy',
      variety: 'BPT 5204',
      quantity: 2500,
      quality: 'Grade A',
      location: 'Hyderabad',
      harvestDate: '2026-10-12'
    },
    {
      id: 3,
      name: 'Farmer C',
      crop: 'Paddy',
      variety: 'BPT 5204',
      quantity: 4500,
      quality: 'Grade A',
      location: 'Hyderabad',
      harvestDate: '2026-10-15'
    },
    {
      id: 4,
      name: 'Farmer D',
      crop: 'Maize',
      variety: 'Hybrid Maize',
      quantity: 2000,
      quality: 'Grade A',
      location: 'Guntur',
      harvestDate: '2026-10-18'
    }
  ]


  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

    setSubmitted(false)

  }


  const handleSubmit = (e) => {

    e.preventDefault()

    const filteredFarmers = farmers.filter((farmer) => {

      const cropMatch =
        farmer.crop.toLowerCase() === formData.crop.toLowerCase()

      const varietyMatch =
        formData.variety === '' ||
        farmer.variety.toLowerCase().includes(
          formData.variety.toLowerCase()
        )

      const qualityMatch =
        formData.quality === '' ||
        farmer.quality === formData.quality

      const locationMatch =
        formData.location === '' ||
        farmer.location.toLowerCase().includes(
          formData.location.toLowerCase()
        )

      return cropMatch &&
        varietyMatch &&
        qualityMatch &&
        locationMatch

    })

    setMatchedFarmers(filteredFarmers)
    setSubmitted(true)

  }


  const totalQuantity = matchedFarmers.reduce(
    (total, farmer) => total + farmer.quantity,
    0
  )


  return (
    <div>

      {/* Header */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Smart Produce Aggregation
          </h1>

          <p className="text-muted">
            Combine compatible farmer produce into larger marketable lots.
          </p>

        </div>

      </section>


      {/* Explanation */}

      <section className="container py-5">

        <div className="row g-4">

          <div className="col-md-4">

            <div className="bg-light rounded p-4 h-100">

              <h4 className="text-success fw-bold">
                1. Collect
              </h4>

              <p className="mb-0">
                Collect produce details from different farmers.
              </p>

            </div>

          </div>


          <div className="col-md-4">

            <div className="bg-light rounded p-4 h-100">

              <h4 className="text-success fw-bold">
                2. Match
              </h4>

              <p className="mb-0">
                Match farmers based on crop, quality and location.
              </p>

            </div>

          </div>


          <div className="col-md-4">

            <div className="bg-light rounded p-4 h-100">

              <h4 className="text-success fw-bold">
                3. Aggregate
              </h4>

              <p className="mb-0">
                Combine compatible produce into one larger lot.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Aggregation Form */}

      <section className="container pb-5">

        <div className="card shadow-sm border-0">

          <div className="card-body p-4 p-md-5">

            <h3 className="text-success fw-bold mb-4">
              Create Aggregation Request
            </h3>


            <form onSubmit={handleSubmit}>

              <div className="row g-3">

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Crop
                  </label>

                  <input
                    type="text"
                    name="crop"
                    className="form-control"
                    value={formData.crop}
                    onChange={handleChange}
                    placeholder="Example: Paddy"
                    required
                  />

                </div>


                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Variety
                  </label>

                  <input
                    type="text"
                    name="variety"
                    className="form-control"
                    value={formData.variety}
                    onChange={handleChange}
                    placeholder="Example: BPT 5204"
                  />

                </div>


                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Required Quantity (kg)
                  </label>

                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Enter required quantity"
                    min="1"
                    required
                  />

                </div>


                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Quality / Grade
                  </label>

                  <select
                    name="quality"
                    className="form-select"
                    value={formData.quality}
                    onChange={handleChange}
                  >

                    <option value="">
                      Any Quality
                    </option>

                    <option value="Grade A">
                      Grade A
                    </option>

                    <option value="Grade B">
                      Grade B
                    </option>

                    <option value="Grade C">
                      Grade C
                    </option>

                  </select>

                </div>


                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Example: Hyderabad"
                  />

                </div>


                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Harvest Date
                  </label>

                  <input
                    type="date"
                    name="harvestDate"
                    className="form-control"
                    value={formData.harvestDate}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <button
                type="submit"
                className="btn btn-success mt-4"
              >
                Find Compatible Farmers
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* Results */}

      {submitted && (

        <section className="container pb-5">

          <h3 className="text-success fw-bold mb-4">
            Matching Farmers
          </h3>


          {matchedFarmers.length > 0 ? (

            <>

              <div className="row g-4">

                {matchedFarmers.map((farmer) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={farmer.id}
                  >

                    <div className="card shadow-sm border-0 h-100">

                      <div className="card-body p-4">

                        <h5 className="text-success fw-bold">
                          {farmer.name}
                        </h5>

                        <p className="mb-2">
                          <strong>Crop:</strong> {farmer.crop}
                        </p>

                        <p className="mb-2">
                          <strong>Variety:</strong> {farmer.variety}
                        </p>

                        <p className="mb-2">
                          <strong>Quantity:</strong> {farmer.quantity} kg
                        </p>

                        <p className="mb-2">
                          <strong>Quality:</strong> {farmer.quality}
                        </p>

                        <p className="mb-0">
                          <strong>Location:</strong> {farmer.location}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>


              <div className="bg-success text-white rounded p-4 mt-4">

                <h4 className="fw-bold">
                  Aggregated Lot Summary
                </h4>

                <p className="mb-2">
                  Total compatible farmers: {matchedFarmers.length}
                </p>

                <p className="mb-2">
                  Total available quantity: {totalQuantity} kg
                </p>

                <p className="mb-0">
                  Requested quantity: {formData.quantity} kg
                </p>

              </div>

            </>

          ) : (

            <div className="alert alert-warning">
              No compatible farmers found. Try changing the crop,
              variety, quality or location.
            </div>

          )}

        </section>

      )}


      {/* Information */}

      <section className="container pb-5">

        <div className="bg-light rounded p-4 p-md-5">

          <h3 className="text-success fw-bold mb-3">
            Why Smart Aggregation?
          </h3>

          <p className="mb-0">
            Smart aggregation helps farmers combine small quantities
            of compatible produce into larger lots. This can make
            transportation, storage and buyer connections easier.
          </p>

        </div>

      </section>

    </div>
  )
}

export default SmartAggregation