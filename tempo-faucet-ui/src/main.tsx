// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { WagmiProvider } from "wagmi";
// import { wagmiConfig } from "./wagmi";
// import App from "./App";

// ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// ).render(
//   <React.StrictMode>
//     <WagmiProvider config={wagmiConfig}>
//       <App />
//     </WagmiProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "./wagmi";
import App from "./App";
import "./styles.css"

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <App />
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);