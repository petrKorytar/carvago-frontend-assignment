import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {QueryClientProvider} from '@tanstack/react-query';
// import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import {queryClient} from './utils/queryClient';
// AuthProvider removed - using useAuth hook directly
import {ProtectedRoute, HomeRedirect} from './components/common/index';
import {Login, Registration, Dashboard, NotFound} from './pages/index';

function App() {
  const {i18n, t} = useTranslation();

  return (
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
          </Helmet>

          <Routes>
            {/* Home route - redirects based on auth status */}
            <Route path="/" element={<HomeRedirect />} />

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
