import { useState } from 'react'

function FAQ() {

  const [openQuestion, setOpenQuestion] = useState(null)

  const faqs = [
    {
      question: 'What is FarmBridge?',
      answer:
        'FarmBridge is an agricultural service and market platform that helps farmers find services, sell produce and connect with suitable buyers.'
    },
    {
      question: 'Who can use FarmBridge?',
      answer:
        'Farmers, agricultural service providers and buyers can use FarmBridge.'
    },
    {
      question: 'How can farmers sell their produce?',
      answer:
        'Farmers can provide crop, variety, quantity, quality, price and location details through the Sell Produce section.'
    },
    {
      question: 'How can farmers find buyers?',
      answer:
        'Farmers can search for buyers based on crop, requirement, quantity, quality and location.'
    },
    {
      question: 'What is Aggregation?',
      answer:
        'Aggregation helps combine compatible produce from multiple farmers into a larger marketable lot.'
    },
    {
      question: 'What agricultural services are available?',
      answer:
        'FarmBridge includes seeds, fertilizers, irrigation, machinery, labour, logistics, collection centres, pack houses and processing services.'
    },
    {
      question: 'Can buyers list their requirements?',
      answer:
        'Yes. Buyers can specify the crop, quantity, quality and location they require.'
    },
    {
      question: 'Are the market prices real-time?',
      answer:
        'The current frontend displays sample market price information. Real-time prices can be connected to the backend later.'
    }
  ]

  const toggleQuestion = (index) => {

    if (openQuestion === index) {
      setOpenQuestion(null)
    } else {
      setOpenQuestion(index)
    }

  }

  return (
    <div>

      {/* ================= HEADER ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h1 className="text-success fw-bold">
            Frequently Asked Questions
          </h1>

          <p className="text-muted">
            Find answers to common questions about FarmBridge.
          </p>

        </div>

      </section>


      {/* ================= FAQ ================= */}

      <section className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-9">

            {faqs.map((faq, index) => (

              <div
                className="card border-0 shadow-sm mb-3"
                key={index}
              >

                <button
                  className="btn text-start w-100 p-4"
                  onClick={() => toggleQuestion(index)}
                >

                  <div className="d-flex justify-content-between align-items-center">

                    <span className="fw-bold text-success">
                      {faq.question}
                    </span>

                    <span className="fs-5">
                      {openQuestion === index ? '−' : '+'}
                    </span>

                  </div>

                </button>


                {openQuestion === index && (

                  <div className="card-body pt-0">

                    <p className="text-muted mb-0">
                      {faq.answer}
                    </p>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= CONTACT CTA ================= */}

      <section className="bg-light py-5">

        <div className="container text-center">

          <h2 className="text-success fw-bold">
            Still Have Questions?
          </h2>

          <p className="text-muted">
            Contact the FarmBridge team for more information.
          </p>

        </div>

      </section>

    </div>
  )
}

export default FAQ