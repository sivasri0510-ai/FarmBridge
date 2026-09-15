import { useState } from 'react'
import { Link } from 'react-router-dom'

function SellProduce() {

  const [formData, setFormData] = useState({
    crop: '',
    variety: '',
    quantity: '',
    quality: '',
    expectedPrice: '',
    harvestDate: '',
    location: '',
    image: ''
  })

  const [submitted, setSubmitted] = useState(false)

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

    const existingProduce =
      JSON.parse(localStorage.getItem('farmbridgeProduce')) || []

    const newProduce = {
      ...formData,
      id: Date.now()
    }

    existingProduce.push(newProduce)

    localStorage.setItem(
      'farmbridgeProduce',
      JSON.stringify(existingProduce)
    )

    setSubmitted(true)

    setFormData({
      crop: '',
      variety: '',
      quantity: '',
      quality: '',
      expectedPrice: '',
      harvestDate: '',
      location: '',
      image: ''
    })
  }


  return (
    <div>

      {/* Header */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Sell Your Produce
          </h1>

          <p className="text-muted">
            List your agricultural produce and connect with potential buyers.
          </p>

        </div>

      </section>


      {/* Main Form */}

      <section className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card shadow-sm border-0">

              <div className="card-body p-4 p-md-5">

                <h3 className="text-success fw-bold mb-4">
                  Produce Details
                </h3>


                <form onSubmit={handleSubmit}>

                  {/* Crop */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Crop
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="crop"
                      value={formData.crop}
                      onChange={handleChange}
                      placeholder="Enter crop name"
                      required
                    />

                  </div>


                  {/* Variety */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Variety
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="variety"
                      value={formData.variety}
                      onChange={handleChange}
                      placeholder="Enter crop variety"
                      required
                    />

                  </div>


                  {/* Quantity */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Quantity (kg)
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="Enter quantity"
                      min="1"
                      required
                    />

                  </div>


                  {/* Quality */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Quality / Grade
                    </label>

                    <select
                      className="form-select"
                      name="quality"
                      value={formData.quality}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select quality
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


                  {/* Expected Price */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Expected Price (₹ per kg)
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="expectedPrice"
                      value={formData.expectedPrice}
                      onChange={handleChange}
                      placeholder="Enter expected price"
                      min="0"
                      required
                    />

                  </div>


                  {/* Harvest Date */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Harvest Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      name="harvestDate"
                      value={formData.harvestDate}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* Location */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Location
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter village / city"
                      required
                    />

                  </div>


                  {/* Image */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Produce Image
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Enter image URL (optional)"
                    />

                    <div className="form-text">
                      You can add an image URL for your produce.
                    </div>

                  </div>


                  {/* Submit */}

                  <div className="d-grid">

                    <button
                      type="submit"
                      className="btn btn-success btn-lg"
                    >
                      List My Produce
                    </button>

                  </div>

                </form>


                {/* Success Message */}

                {submitted && (

                  <div
                    className="alert alert-success mt-4 mb-0"
                    role="alert"
                  >
                    <strong>Produce listed successfully.</strong>
                    <br />
                    Your produce details have been saved.
                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Buyer Connection Section */}

      <section className="container pb-5">

        <div className="bg-light rounded p-4 p-md-5">

          <div className="row align-items-center">

            <div className="col-md-8">

              <h3 className="text-success fw-bold">
                Looking for Buyers?
              </h3>

              <p className="mb-md-0">
                Explore available buyers and find suitable
                market opportunities for your produce.
              </p>

            </div>


            <div className="col-md-4 text-md-end mt-3 mt-md-0">

              <Link
                to="/find-buyers"
                className="btn btn-success"
              >
                Find Buyers
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default SellProduce