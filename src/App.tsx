import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {QueryClientProvider} from '@tanstack/react-query';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import {queryClient} from './utils/queryClient';
import {ProtectedRoute, HomeRedirect} from './components/common/index';
import {AppLayout} from './layout/AppLayout';
import {Login, Registration, Dashboard, NotFound, AddTodo, EditTodo} from './pages/index';

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
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-todo"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <AddTodo />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-todo/:id"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <EditTodo />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
