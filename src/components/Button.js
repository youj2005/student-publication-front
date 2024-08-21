import {Link} from 'react-router-dom'

const Button = (props) => {
  return (
      <Link
      onClick={props.onClick}
      to={props.uri}
      style={{backgroundColor: props.color}}
      class={props.class + " btn"}>{props.children}
      </Link>
  )
}

export default Button