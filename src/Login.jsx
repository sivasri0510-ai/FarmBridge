import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Login status save
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userEmail', email)

    alert('Login successful!')

    navigate('/')
  }

  return (
    <div>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="text-success fw-bold">
            Login
          </h1>

          <p className="text-muted">
            Login to your FarmBridge account
          </p>
        </div>
      </section>

      <section className="container py-5">

        <div className="row justify-content-center">

          <div className="col-md-6 col-lg-5">

            <div className="card shadow-sm p-4">

              <h3 className="text-success text-center mb-4">
                Login to FarmBridge
              </h3>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Login