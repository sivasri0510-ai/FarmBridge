import { Link, useLocation, useNavigate } from 'react-router-dom'

function BuyerDetails() {

  const location = useLocation()
  const navigate = useNavigate()

  const buyer = location.state?.buyer


  const handleContactBuyer = () => {

    const isLoggedIn =
      localStorage.getItem('isLoggedIn') === 'true'

    if (isLoggedIn) {
      navigate('/contact-buyer', {
        state: {
          buyer: buyer
        }
      })
    } else {
      navigate('/login', {
        state: {
          from: '/contact-buyer',
          buyer: buyer
        }
      })
    }
  }


  if (!buyer) {

    return (
      <div>

        <section className="bg-light py-5">

          <div className="container text-center">

            <h1 className="text-success fw-bold">
              Buyer Details
            </h1>

            <p className="text-muted">
              No buyer information was selected.
            </p>

          </div>

        </section>


        <section className="container py-5 text-center">

          <p className="mb-4">
            Please go back to Find Buyers and select a buyer.
          </p>

          <Link
            to="/find-buyers"
            className="btn btn-success"
          >
            Find Buyers
          </Link>

        </section>

      </div>
    )
  }


  return (
    <div>

      {/* Header */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Buyer Details
          </h1>

          <p className="text-muted">
            View the requirements and information of the selected buyer.
          </p>

        </div>

      </section>


      {/* Buyer Information */}

      <section className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card shadow-sm border-0">

              <div className="card-body p-4 p-md-5">

                <h2 className="text-success fw-bold mb-4">
                  {buyer.name}
                </h2>


                <div className="row g-4">

                  <div className="col-md-6">

                    <div className="bg-light rounded p-3">

                      <h6 className="text-success fw-bold">
                        Crop
                      </h6>

                      <p className="mb-0">
                        {buyer.crop}
                      </p>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="bg-light rounded p-3">

                      <h6 className="text-success fw-bold">
                        Required Quantity
                      </h6>

                      <p className="mb-0">
                        {buyer.quantity}
                      </p>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="bg-light rounded p-3">

                      <h6 className="text-success fw-bold">
                        Quality / Grade
                      </h6>

                      <p className="mb-0">
                        {buyer.quality}
                      </p>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="bg-light rounded p-3">

                      <h6 className="text-success fw-bold">
                        Location
                      </h6>

                      <p className="mb-0">
                        {buyer.location}
                      </p>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="bg-light rounded p-3">

                      <h6 className="text-success fw-bold">
                        Expected Price
                      </h6>

                      <p className="mb-0">
                        {buyer.price}
                      </p>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="bg-light rounded p-3">

                      <h6 className="text-success fw-bold">
                        Buyer Type
                      </h6>

                      <p className="mb-0">
                        Agricultural Buyer
                      </p>

                    </div>

                  </div>

                </div>


                <div className="mt-4">

                  <h5 className="text-success fw-bold mb-2">
                    Buyer Requirement
                  </h5>

                  <p className="text-muted">
                    {buyer.description}
                  </p>

                </div>


                {/* Actions */}

                <div className="d-flex flex-column flex-md-row gap-3 mt-4">

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleContactBuyer}
                  >
                    Contact Buyer
                  </button>


                  <Link
                    to="/find-buyers"
                    className="btn btn-outline-success"
                  >
                    Back to Find Buyers
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Information */}

      <section className="container pb-5">

        <div className="bg-light rounded p-4 p-md-5">

          <h3 className="text-success fw-bold mb-3">
            Before Contacting the Buyer
          </h3>

          <p className="mb-0">
            Check the buyer's crop requirement, quantity, quality,
            location and expected price before contacting them.
            Make sure your produce matches the buyer's requirement.
          </p>

        </div>

      </section>

    </div>
  )
}

export default BuyerDetails