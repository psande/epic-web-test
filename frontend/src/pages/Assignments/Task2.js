const Task2 = () => (
  <div className='container'>
    <h1>Exercise Description</h1>
    <h3>Sent by company. Leaving as is.</h3>

    <div className='row text-center'>
      <div className='col-xs-12'>
        <p className='App-intro'>
          Write a small app that can be used to CRUD users from the service that
          you wrote in Question 3 in the Web Engineering Assignment pdf.
        </p>
      </div>
    </div>
    <div className='row'>
      <div className='col-xs-12 text-center'>
        <h1>TO DO</h1>
        <ul className='text-left'>
          <li>
            Startup the mock service:&nbsp; <code>yarn start:task2</code>
          </li>
          <li>
            Setup Model and fetch data over AJAX. The mock service is
            available for use&nbsp;
            <a href='http:///localhost:4000/accounts'>here</a>.
          </li>
          <li>List Users</li>
          <li>Create Form for adding users</li>
          <li>Delete Users</li>
          <li>Update Users</li>
        </ul>
      </div>
    </div>
  </div>
)

export default Task2
