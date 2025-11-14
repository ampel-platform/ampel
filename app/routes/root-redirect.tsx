import { LoaderFunction, redirect } from 'react-router';

export const loader: LoaderFunction = async () => {
  return redirect('/alerts/cases/0001949132');
};
