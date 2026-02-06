const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
    )}
  </div>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total total={course.parts.reduce((acc, part) => acc+part.exercises, 0)}></Total>
        </div>
    )
}


export default Course