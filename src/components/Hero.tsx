import FeatureCard from './FeatureCard'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '🚀',
    title: 'Fast Deployment',
    description: 'Automated deployments on every push to main',
  },
  {
    icon: '☁️',
    title: 'AWS S3 Hosting',
    description: 'Reliable and scalable cloud hosting',
  },
  {
    icon: '🔄',
    title: 'CI/CD Pipeline',
    description: 'Seamless integration with GitHub Actions',
  },
]

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title">Welcome to Your React Static Site</h2>
        <p className="hero-text">
          This React app is automatically built and deployed to AWS S3 using
          GitHub Actions CI/CD pipeline.
        </p>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} index={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
