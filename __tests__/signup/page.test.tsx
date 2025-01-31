import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Signup from "@/app/signup/page";

describe("Signup", () => {
  it("renders correctly", () => {
    render(<Signup />);
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
