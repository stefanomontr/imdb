import {render, screen} from '@testing-library/react'
import App from "../App.tsx";

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    expect(screen.getByText("Advanced Title Search")).toBeInTheDocument();
  });
})
