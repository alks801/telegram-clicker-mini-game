import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Clicker } from "../../src/components/Clicker/Clicker"

describe("Clicker Component", () => {
  it("should increment coins on button click", () => {
    render(<Clicker />)
    const button = screen.getByText("Click Me!")
    fireEvent.click(button)
    expect(screen.getByText("Coins: 1")).toBeInTheDocument()
  })
})
