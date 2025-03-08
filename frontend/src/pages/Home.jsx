function Home() {
  return (
    <div>
      <h3 className="mb-5 text-xl text-center ">
        You can check this web app through the following details.
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Role</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Admin</td>
              <td>admin@gmail.com</td>
              <td>1234</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Moderator</td>
              <td>moderator@gmail.com</td>
              <td>1234</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Editor</td>
              <td>editor@gmail.com</td>
              <td>1234</td>
            </tr>
            {/* row 4 */}
            <tr>
              <th>3</th>
              <td>User</td>
              <td>user@gmail.com</td>
              <td>1234</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
