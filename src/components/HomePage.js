import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const FILMS_QUERY = gql`
  query LaunchesPast($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      mission_name
      details
    }
  }
`;

export const HomePage = () => {
  const [offset, setOffset] = useState(0); // Initialize offset state
  const limit = 3; // Set the limit per page

  const { data, loading, error } = useQuery(FILMS_QUERY, {
    variables: { limit, offset }, // Pass limit and offset variables to the query
  });

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit); // Increment offset to fetch next page
  };

  const handlePrevPage = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - limit)); // Decrement offset to fetch previous page
  };

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;

  const launchDataPast = data.launchesPast;
  const disableNext = launchDataPast.length < limit; // Disable "Next" button if there are fewer items than the limit
  const disablePrev = offset === 0; // Disable "Previous" button if on the first page

  return (
    <div className="container-fluid p-4 border ">
      <h1 className="text-2xl font-bold mb-4">
        Check out the SPACEX Launches below
      </h1>
      {launchDataPast.map((launch, index) => (
        <div key={index} className="w-1/4 p-4">
          <div className="border p-4">
            <h2 className="text-lg font-bold mb-2">{launch.mission_name}</h2>
            <p className="text-sm text-gray-700">
              {launch.details || 'No description'}
            </p>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          className={`bg-${disablePrev ? 'red' : 'gray'}-200 hover:bg-${
            disablePrev ? '' : 'gray'
          }-300 px-4 py-2 rounded`}
          disabled={disablePrev}
        >
          Previous
        </button>
        <button
          onMouseEnter={() => console.log('enter button')}
          onClick={handleNextPage}
          className={`bg-${disableNext ? 'red' : 'gray'}-200 hover:bg-${
            disableNext ? '' : 'gray'
          }-300 px-4 py-2 rounded`}
          disabled={disableNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
