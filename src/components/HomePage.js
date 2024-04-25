import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const LAUNCHES_QUERY = gql`
  query LaunchesPast($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      mission_name
      details
    }
  }
`;

/* Prefetches Launches onMouseOver the next button */

export const HomePage = () => {
  const [offset, setOffset] = useState(0); // Initialize offset state
  const limit = 3; // Set the limit per page

  const { data, loading, error, client } = useQuery(LAUNCHES_QUERY, {
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
    <div className="container-fluid p-4 border h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Check out the SPACEX Launches below
      </h1>
      {launchDataPast.map((launch, index) => (
        <div key={index} className="border w-1/3 p-4 h-40 rounded mt-5 mb-5">
          <h2 className="text-lg font-bold mb-2 truncate">
            {launch.mission_name}
          </h2>
          <div className="h-20 overflow-auto">
            <p className="text-sm text-gray-700">
              {launch.details || 'No description'}
            </p>
          </div>
        </div>
      ))}
      {/* PREV + NEXT BUTTONS BELOW */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          /* NOTE: dynamic classes in TailwindCSS must be complete */
          className={`${disablePrev ? 'bg-red-200' : 'bg-gray-200'} ${
            disablePrev ? '' : 'hover:bg-gray-300'
          } px-4 py-2 rounded`}
          disabled={disablePrev}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          onMouseOver={async () => {
            const prefetchedQuery = await client.query({
              query: LAUNCHES_QUERY,
              /* offset + limit prefetches query */
              variables: { limit, offset: offset + limit },
            });

            return prefetchedQuery;
          }}
          /* NOTE: dynamic classes in TailwindCSS must be complete */
          className={`${disableNext ? 'bg-red-200' : 'bg-gray-200'} ${
            disableNext ? '' : 'hover:bg-gray-300'
          } px-4 py-2 rounded`}
          disabled={disableNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
