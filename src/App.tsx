import React, {Suspense, lazy} from 'react';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import theme from './theme';
import GlobalStyles from './GlobalStyles';
import {queryClient} from './utils/queryClient';
import {ProtectedRoute, HomeRedirect} from './components/common';
import {AppLayout} from './layout/AppLayout';

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/auth/Login').then((module) => ({default: module.Login})));
const Registration = lazy(() =>
  import('./pages/auth/Registration').then((module) => ({default: module.Registration}))
);
const Dashboard = lazy(() =>
  import('./pages/dashboard/Dashboard').then((module) => ({default: module.Dashboard}))
);
const AddTodo = lazy(() =>
  import('./pages/todos/AddTodo').then((module) => ({default: module.AddTodo}))
);
const EditTodo = lazy(() =>
  import('./pages/todos/EditTodo').then((module) => ({default: module.EditTodo}))
);
const NotFound = lazy(() =>
  import('./pages/error/NotFound').then((module) => ({default: module.NotFound}))
);

// Loading component
const PageLoader: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    Loading...
  </div>
);

// Error fallback component
const ErrorFallback: React.FC<{error: Error}> = ({error}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      padding: '20px',
      textAlign: 'center',
    }}
  >
    <h2>Oops! Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={() => window.location.reload()}>Reload Page</button>
  </div>
);

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ComponentType<{error: Error}>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Route configuration for better maintainability
const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  DASHBOARD: '/dashboard',
  ADD_TODO: '/add-todo',
  EDIT_TODO: '/edit-todo/:id',
  NOT_FOUND: '/404',
} as const;

// Protected route wrapper component
const ProtectedRouteWrapper: React.FC<{children: React.ReactNode}> = ({children}) => (
  <ProtectedRoute>
    <AppLayout>{children}</AppLayout>
  </ProtectedRoute>
);

const App: React.FC = () => {
  const {i18n, t} = useTranslation();

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <GlobalStyles />
          <Router>
            <Helmet
              titleTemplate={`%s - ${t('app.title')}`}
              defaultTitle={t('app.title')}
              htmlAttributes={{lang: i18n.language}}
            >
              <meta name="description" content={t('app.description')} />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>

            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Home route - redirects based on auth status */}
                <Route path={ROUTES.HOME} element={<HomeRedirect />} />

                {/* Public routes */}
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTRATION} element={<Registration />} />

                {/* Protected routes */}
                <Route
                  path={ROUTES.DASHBOARD}
                  element={
                    <ProtectedRouteWrapper>
                      <Dashboard />
                    </ProtectedRouteWrapper>
                  }
                />

                <Route
                  path={ROUTES.ADD_TODO}
                  element={
                    <ProtectedRouteWrapper>
                      <AddTodo />
                    </ProtectedRouteWrapper>
                  }
                />

                <Route
                  path={ROUTES.EDIT_TODO}
                  element={
                    <ProtectedRouteWrapper>
                      <EditTodo />
                    </ProtectedRouteWrapper>
                  }
                />

                {/* Error routes */}
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
              </Routes>
            </Suspense>
          </Router>
        </ChakraProvider>

        {/* React Query DevTools - only in development */}
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
