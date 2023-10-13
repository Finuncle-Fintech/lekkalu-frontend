import { Link } from 'react-router-dom'
import { ErrorPageContainer } from './styled'
import PageNotFound from './static/404.png'

const ErrorPage = () => {
  return (
    <ErrorPageContainer>
      <img src={PageNotFound} alt='404 page not found' />
      <h3>Ohh! Page Not Found</h3>
      <p>We can&apos;t seem to find the page you&apos;re looking for</p>
      <Link to='/'>back home</Link>
    </ErrorPageContainer>
  )
}

export default ErrorPage
