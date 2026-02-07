function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Static Site. Deployed with ❤️ using
        AWS S3 &amp; GitHub Actions
      </p>
    </footer>
  )
}

export default Footer
