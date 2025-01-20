function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-primary-content p-5 rounded-lg">
        <h2 className="font-bold text-2xl">Admin</h2>
        <div className="flex gap-2">
          <h3 className="font-bold">Email:</h3>
          <p>admin@gmail.com</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-bold">Password:</h3>
          <p>1234</p>
        </div>
      </div>
      <div className="bg-primary-content p-5 rounded-lg">
        <h2 className="font-bold text-2xl">Moderator</h2>
        <div className="flex gap-2">
          <h3 className="font-bold">Email:</h3>
          <p>moderator@gmail.com</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-bold">Password:</h3>
          <p>1234</p>
        </div>
      </div>
      <div className="bg-primary-content p-5 rounded-lg">
        <h2 className="font-bold text-2xl">Editor</h2>
        <div className="flex gap-2">
          <h3 className="font-bold">Email:</h3>
          <p>editor@gmail.com</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-bold">Password:</h3>
          <p>1234</p>
        </div>
      </div>
      <div className="bg-primary-content p-5 rounded-lg">
        <h2 className="font-bold text-2xl">User</h2>
        <div className="flex gap-2">
          <h3 className="font-bold">Email:</h3>
          <p>user@gmail.com</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-bold">Password:</h3>
          <p>1234</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
