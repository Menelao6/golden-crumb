import Styles from './Testimonials.module.css'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      comment: "The croissants are to die for! Flaky, buttery, and absolutely delicious. I come here every weekend!",
      rating: 5
    },
    {
      id: 2,
      name: "John D.",
      comment: "Best pastries in town. The macarons are perfect - crispy on the outside, chewy on the inside.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily R.",
      comment: "The chocolate éclair is heavenly. The cream filling is rich and not too sweet. Highly recommend!",
      rating: 4
    }
  ]

  return (
    <section className={`${Styles.testimonials} section section--alt-1`}>
      <div className="container">
        <div className={Styles.sectionHeader}>
          <h2>What Our Customers Say</h2>
          <p>Don&apos;t just take our word for it</p>
        </div>
        
        <div className={Styles.testimonialsGrid}>
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className={Styles.testimonialCard}>
              <div className={Styles.rating}>
                {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
              </div>
              <p className={Styles.comment}>{testimonial.comment}</p>
              <p className={Styles.name}>- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}