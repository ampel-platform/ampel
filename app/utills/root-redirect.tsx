import { LoaderFunction, redirect } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return redirect('/alerts/patients/123/cases/456');
};
