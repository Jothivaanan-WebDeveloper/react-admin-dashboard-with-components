import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import UserLayout from "./Layout/UserLayout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import EmployeeDashboard from "./scenes/Employee Dashboard/EmployeeDashboard";

function App() {
  const [theme, colorMode] = useMode();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserLayout />,
      // errorElement: <ErrorElement />,  
      children: [
        {
          index: true,
          element: <EmployeeDashboard />
        },
        {
          path: '/team',
          element: <Team />,
        },
      ]
    }
        
  
  ]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
            <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;


            {/* <Routes>
              <Route path="/" element={<EmployeeDashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes> */}