import { useLocationProperty, navigate } from 'wouter/use-location';

// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
const hashLocation = () => window.location.hash.replace(/^#/, '') || '/';

const hashNavigate = (to: string | URL) => navigate('#' + to);

export const useHashLocation = () => {
  const location = useLocationProperty(hashLocation);
  return [location, hashNavigate] as [string, (to: string | URL) => void];
};
