import React from "react";


function ErrorNotFound() {

  return (
    <div >
      <div
        className="flex flex-col items-center justify-center h-screen "
      >
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold  mb-4">404</h1>
          <h2 className="text-xl font-semibold  mb-4">
            Page Not Found
          </h2>
          <p className=" mb-8">
            Sorry, the page you are looking for might have been removed or does
            not exist.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-md bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default ErrorNotFound;
