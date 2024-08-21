import Topic from './Topic'

const Topics = (props) => {
  return (
    <div className='me-auto align-self-center'>
      <button className="navbar-toggler border-0" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse ms-2" id="navbarNav">
        <ul className='navbar-nav ms-2'>
          {props.topics.map((topic) => (
          <Topic text={topic}></Topic>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Topics