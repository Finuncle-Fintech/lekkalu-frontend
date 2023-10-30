import "App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "provider/Provider";
import Router from "Router";
function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Provider>
          <Router />
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;