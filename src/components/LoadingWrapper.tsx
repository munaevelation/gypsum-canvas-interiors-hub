import { useLoading } from '../hooks/useLoading';
import Loader from './Loader';

interface LoadingWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

const LoadingWrapper = ({ children, delay = 1000 }: LoadingWrapperProps) => {
  const isLoading = useLoading(delay);

  return (
    <>
      {isLoading && <Loader />}
      {children}
    </>
  );
};

export default LoadingWrapper; 