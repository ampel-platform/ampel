import { LoaderFunction, redirect } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return redirect('/alerts/cases/0001949132');
};
