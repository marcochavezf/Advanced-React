import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [signup, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refectch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  console.log({ data, error, loading });
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await signup().catch(console.error);
    console.log(res);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}
