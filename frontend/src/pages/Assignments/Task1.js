/**
 * Implement the unwind logic here. This method is attached to the window because it is used by the
 * test harness to verify the results.
 */

const Task1Page = () => {
  return (
    <div className='container'>
      <h1>Exercise Description</h1>
      <h3>Sent by company. Leaving as is.</h3>
      <div className='row text-center'>
        <div className='col-xs-12'>
          <div className='alert alert-warning'>
            The function should accept a string representing the matrix as
            shown below: brackets around each row of comma-separated integers,
            and a newline between each row.
            <br />
            The function should return the solution string of comma-separated
            integers.
          </div>
          <p className='App-intro'>
            Write a function that given a matrix of integers, builds a string
            with the entries of that matrix appended in clockwise order. Feel
            free to change this view as much as necessary to adequately solve
            the problem.
          </p>
          <span>Example input:</span>
          <pre>{`[ 1, 2, 3, 4]
[ 5, 6, 7, 8]
[ 9,10,11,12]
[13,14,15,16]`}</pre>
        </div>
      </div>
    </div>
  )
}

export default Task1Page
