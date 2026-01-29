import { useState } from "react"

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ text, num }) => {
    return (
        <tbody>
            <tr>
                <td>{text}</td>
                <td>{num}</td>
            </tr>
        </tbody>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const getAverage = () => {
        if (good + neutral + bad === 0) {
            return 0
        } else {
            return (good - bad) / (good + neutral + bad)
        }
    }

    const getPercentPos = () => {
        if (good === 0) {
            return 0
        } else {
            return (good) / (good + neutral + bad)
        }
    }
    if (good + neutral + bad === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    return (
        <>
            <h1>statistics</h1>
            <table>
                <StatisticLine text="good" num={good}></StatisticLine>
                <StatisticLine text="neutral" num={neutral}></StatisticLine>
                <StatisticLine text="bad" num={bad}></StatisticLine>
                <StatisticLine text="average" num={getAverage()} />
                <StatisticLine text="positive" num={getPercentPos()}></StatisticLine>
            </table>
        </>
    )
}


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button text="good" onClick={() => setGood(good+1)}></Button>
            <Button text="neutral" onClick={() => setNeutral(neutral+1)}></Button>
            <Button text="bad" onClick={() => setBad(bad+1)}></Button>
            <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
        </div>
    )
}

export default App