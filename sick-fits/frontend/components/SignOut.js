import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    endSession
  }
`;

export default function SignOut() {
  const [signout, { data, loading }] = useMutation(SIGNOUT_MUTATION, {
    // refectch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button type="button" disabled={loading} onClick={signout}>
      Sign Out
    </button>
  );
}
