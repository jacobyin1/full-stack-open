const Hello = (props) => {
  return (
    <div>
      <p>Hello world {props.name}</p>
    </div>
  )
}

const Foot = (props) => {
  return (
    <>
      <h1>LOUD</h1>
    </>
  )
}

const App = () => {
  console.log("hi")

  // return (
  //   <div>
  //     <p>Hello world, it is {new Date().toString()}</p>
  //   </div>
  // )
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George"/>
      <Hello name="G"></Hello>
      <Hello name="we"></Hello>
      <Hello />
      <Hello></Hello>
      <Hello></Hello>

    </div>
  )
}

export default App