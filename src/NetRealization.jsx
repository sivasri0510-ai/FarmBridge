import { useState } from 'react'

function NetRealization() {

  const [formData, setFormData] = useState({
    quantity: '',
    sellingPrice: '',
    transportCost: '',
    serviceCharges: '',
    otherCosts: ''
  })

  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

    setResult(null)
  }

  const handleCalculate = (e) => {
    e.preventDefault()

    const quantity = Number(formData.quantity)
    const sellingPrice = Number(formData.sellingPrice)
    const transportCost = Number(formData.transportCost)
    const serviceCharges = Number(formData.serviceCharges)
    const otherCosts = Number(formData.otherCosts)

    const grossValue = quantity * sellingPrice

    const totalCost =
      transportCost +
      serviceCharges +
      otherCosts

    const netRealization =
      grossValue - totalCost

    setResult({
      grossValue,
      totalCost,
      netRealization
    })
  }

  return (
    <div>

      <section className="bg-light py-5">
        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Net Realization
          </h1>

          <p className="text-muted">
            Calculate the amount you receive after selling and related costs.
          </p>

        </div>
      </section>


      <section className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card shadow-sm border-0">

              <div className="card-body p-4 p-md-5">

                <h3 className="text-success fw-bold mb-4">
                  Calculate Net Realization
                </h3>

                <form onSubmit={handleCalculate}>

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


                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Selling Price (₹ per kg)
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="sellingPrice"
                      value={formData.sellingPrice}
                      onChange={handleChange}
                      placeholder="Enter selling price"
                      min="0"
                      required
                    />

                  </div>


                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Transport Cost (₹)
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="transportCost"
                      value={formData.transportCost}
                      onChange={handleChange}
                      placeholder="Enter transport cost"
                      min="0"
                      required
                    />

                  </div>


                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Service Charges (₹)
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="serviceCharges"
                      value={formData.serviceCharges}
                      onChange={handleChange}
                      placeholder="Enter service charges"
                      min="0"
                      required
                    />

                  </div>


                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Other Costs (₹)
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="otherCosts"
                      value={formData.otherCosts}
                      onChange={handleChange}
                      placeholder="Enter other costs"
                      min="0"
                      required
                    />

                  </div>


                  <div className="d-grid">

                    <button
                      type="submit"
                      className="btn btn-success btn-lg"
                    >
                      Calculate Net Realization
                    </button>

                  </div>

                </form>


                {result && (

                  <div className="mt-5">

                    <h3 className="text-success fw-bold mb-4">
                      Calculation Result
                    </h3>


                    <div className="row g-3">

                      <div className="col-md-4">

                        <div className="bg-light rounded p-4 text-center h-100">

                          <h6 className="text-success fw-bold">
                            Gross Value
                          </h6>

                          <h4 className="fw-bold">
                            ₹{result.grossValue.toLocaleString()}
                          </h4>

                        </div>

                      </div>


                      <div className="col-md-4">

                        <div className="bg-light rounded p-4 text-center h-100">

                          <h6 className="text-success fw-bold">
                            Total Cost
                          </h6>

                          <h4 className="fw-bold">
                            ₹{result.totalCost.toLocaleString()}
                          </h4>

                        </div>

                      </div>


                      <div className="col-md-4">

                        <div className="bg-success text-white rounded p-4 text-center h-100">

                          <h6 className="fw-bold">
                            Net Realization
                          </h6>

                          <h4 className="fw-bold">
                            ₹{result.netRealization.toLocaleString()}
                          </h4>

                        </div>

                      </div>

                    </div>


                    <div className="bg-light rounded p-4 mt-4">

                      <h5 className="text-success fw-bold mb-3">
                        Calculation Summary
                      </h5>

                      <p className="mb-2">
                        <strong>Gross Value:</strong> ₹
                        {result.grossValue.toLocaleString()}
                      </p>

                      <p className="mb-2">
                        <strong>Total Costs:</strong> ₹
                        {result.totalCost.toLocaleString()}
                      </p>

                      <p className="mb-0">
                        <strong>Net Realization:</strong> ₹
                        {result.netRealization.toLocaleString()}
                      </p>

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      <section className="container pb-5">

        <div className="bg-light rounded p-4 p-md-5">

          <h3 className="text-success fw-bold mb-3">
            Why Calculate Net Realization?
          </h3>

          <p className="mb-0">
            Net realization helps farmers understand how much
            money remains after deducting transportation, service
            charges and other selling costs from the total value
            of their produce.
          </p>

        </div>

      </section>

    </div>
  )
}

export default NetRealization