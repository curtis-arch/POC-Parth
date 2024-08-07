import React from "react";
import ButtonAndModal from "./components/ButtonAndModal";

const App: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-4">React App</h1>
      <ButtonAndModal targetSelector="body :nth-child(2) :nth-child(2) :nth-child(2) :nth-child(2) :nth-child(2)" />
      {/* Add any other components here */}
    </div>
  );
};

export default App;