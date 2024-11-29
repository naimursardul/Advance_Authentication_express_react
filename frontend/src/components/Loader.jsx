const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="flex space-x-2">
          <div className="w-10 h-10 animate-spin border-4 border-white border-t-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
