import { useState } from 'react'

function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    alert('Your message has been submitted successfully!')

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div>

      {/* ================= HEADER ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Contact Us
          </h1>

          <p className="text-muted">
            Get in touch with the FarmBridge team.
          </p>

        </div>

      </section>


      {/* ================= CONTACT CONTENT ================= */}

      <section className="container py-5">

        <div className="row g-4">

          {/* CONTACT INFORMATION */}

          <div className="col-lg-5">

            <div className="card h-100 border-0 shadow-sm p-4">

              <h3 className="text-success fw-bold mb-4">
                Get in Touch
              </h3>

              <p className="text-muted">
                If you have questions, suggestions or need
                assistance with FarmBridge, you can contact us.
              </p>

              <div className="mt-4">

                <h5 className="text-success">
                  📧 Email
                </h5>

                <p className="text-muted">
                  support@farmbridge.com
                </p>

              </div>

              <div className="mt-3">

                <h5 className="text-success">
                  📞 Phone
                </h5>

                <p className="text-muted">
                  +91 98765 43210
                </p>

              </div>

              <div className="mt-3">

                <h5 className="text-success">
                  📍 Location
                </h5>

                <p className="text-muted">
                  Andhra Pradesh, India
                </p>

              </div>

              <div className="mt-4">

                <h5 className="text-success">
                  FarmBridge Support
                </h5>

                <p className="text-muted mb-0">
                  We aim to make it easier for farmers,
                  buyers and service providers to connect.
                </p>

              </div>

            </div>

          </div>


          {/* CONTACT FORM */}

          <div className="col-lg-7">

            <div className="card border-0 shadow-sm p-4">

              <h3 className="text-success fw-bold mb-4">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="mb-3">

                  <label className="form-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="mb-3">

                  <label className="form-label">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="mb-3">

                  <label className="form-label">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Enter subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="mb-4">

                  <label className="form-label">
                    Message
                  </label>

                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Write your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>

                </div>


                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BOTTOM SECTION ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h2 className="text-success fw-bold">
            We Are Here to Help
          </h2>

          <p className="text-muted mb-0">
            FarmBridge connects farmers with agricultural
            services, buyers and market opportunities.
          </p>

        </div>

      </section>

    </div>
  )
}

export default Contact