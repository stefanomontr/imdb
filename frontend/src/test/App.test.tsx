import {render, screen} from '@testing-library/react'
import App from "../App.tsx";

describe("General rendering", () => {
  it("Advanced Title Search", () => {
    render(<App />);
    expect(screen.getByText("Advanced Title Search")).toBeInTheDocument();
  });
})
