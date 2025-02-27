function Home() {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      <div className="w-[280px] bg-base-300 p-5 rounded-lg">
        <h2 className="font-bold text-xl">Admin</h2>
        <div className="flex gap-2">
          <h3 className="font-semibold">Email:</h3>
          <p>admin@gmail.com</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-semibold">Password:</h3>
          <p>1234</p>
        </div>
      </div>
      <div className="w-[280px] bg-base-300 p-5 rounded-lg">
        <h2 className="font-bold text-xl">Moderator</h2>
        <div className="flex gap-2">
          <h3 className="font-semibold">Email:</h3>
          <p>moderator@gmail.com</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-semibold">Password:</h3>
          <p>1234</p>
        </div>
      </div>
      <div className="w-[280px] bg-base-300 p-5 rounded-lg">
        <h2 className="font-bold text-xl">Editor</h2>
        <div className="flex gap-2">
          <h3 className="font-semibold">Email:</h3>
          <p>editor@gmail.com</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-semibold">Password:</h3>
          <p>1234</p>
        </div>
      </div>
      <div className="w-[280px] bg-base-300 p-5 rounded-lg">
        <h2 className="font-bold text-xl">User</h2>
        <div className="flex gap-2">
          <h3 className="font-semibold">Email:</h3>
          <p>user@gmail.com</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-semibold">Password:</h3>
          <p>1234</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
