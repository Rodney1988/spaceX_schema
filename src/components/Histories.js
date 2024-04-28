import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';

const GET_HISTORIES = gql`
  query ($limit: Int!, $offset: Int!) {
    histories(limit: $limit, offset: $offset) {
      id
      title
      details
    }
  }
`;

/* Prefetches Histories on load */

export const Histories = () => {
  const [offset, setOffset] = useState(0);
  const limit = 3;
  /* Client deconstruction to prefetch the same query */
  const { data, loading, error, client } = useQuery(GET_HISTORIES, {
    variables: { limit, offset },
  });

  if (loading) return <span>Loading...</span>;

  if (error) return <span>{error.message}</span>;

  client.query({
    query: GET_HISTORIES,
    variables: { limit, offset: offset + limit },
  });

  const histories = data.histories;

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };
  const handlePrevPage = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - limit)); // Max ensures no negative offset numbers
  };

  const disableNext = histories.length < limit;
  const disablePrev = offset === 0;

  if (histories.length === 0)
    return (
      <>
        <pre>No more histories...</pre>
        <button
          onClick={handlePrevPage}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Previous
        </button>
      </>
    );

  return (
    <div className="container-fluid p-4">
      <h1>
        Check out the <b>SPACEX Histories</b> below
      </h1>
      {histories.map((history) => (
        <div
          key={history.id}
          className="border w-1/3 p-4 h-40 rounded mt-5 mb-5"
        >
          <h2 className="text-lg font-bold mb-2 truncate">{history.title}</h2>
          <div className="h-20 overflow-auto">
            <p className="text-sm text-gray-700 ">
              {history.details || 'No description'}
            </p>
          </div>
        </div>
      ))}
      {/* PREV + NEXT BUTTONS BELOW */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={disablePrev}
          className={`${disablePrev ? 'bg-red-200' : 'bg-gray-200'} ${
            disablePrev ? '' : 'hover:bg-gray-300'
          } px-4 py-2 rounded`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={disableNext}
          className={`${disableNext ? 'bg-red-200' : 'bg-gray-200'} ${
            disableNext ? '' : 'hover:bg-gray-300'
          } px-4 py-2 rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
