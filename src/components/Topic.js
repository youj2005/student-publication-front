import {Link} from 'react-router-dom'

const Topic = (props) => {
  return (
    <li className='nav-item h5 fw-medium bt-1 m-0'>
      <Link className='nav-link' href='#' to={"/category/"+props.text}>{props.text}</Link>
    </li>
  )
}

export default Topic