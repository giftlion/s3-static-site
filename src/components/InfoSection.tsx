function InfoSection() {
  return (
    <section className="info-section">
      <div className="info-content">
        <h2>Getting Started</h2>
        <p>
          Make changes to your React app and push to GitHub. The CI/CD pipeline
          will automatically build and deploy your changes to S3.
        </p>
        <div className="code-block">
          <code>git add .</code>
          <br />
          <code>git commit -m &quot;Update site&quot;</code>
          <br />
          <code>git push origin main</code>
        </div>
      </div>
    </section>
  )
}

export default InfoSection
