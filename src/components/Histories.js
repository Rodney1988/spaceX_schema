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

export const Histories = () => {
  const [offset, setOffset] = useState(0);
  const limit = 3;
  const { data, loading, error } = useQuery(GET_HISTORIES, {
    variables: { limit, offset },
  });

  if (loading) return <span>Loading...</span>;

  if (error) return <span>{error.message}</span>;

  const histories = data.histories;
  console.log('histories', histories);
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
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
};
