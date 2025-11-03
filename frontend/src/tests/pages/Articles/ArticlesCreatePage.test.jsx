import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ArticlesCreatePage from "main/pages/Articles/ArticlesCreatePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = vi.fn();
vi.mock("react-toastify", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    toast: vi.fn((x) => mockToast(x)),
  };
});

const mockNavigate = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    Navigate: vi.fn((x) => {
      mockNavigate(x);
      return null;
    }),
  };
});

describe("ArticlesCreatePage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  beforeEach(() => {
    vi.clearAllMocks();
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  });

  const queryClient = new QueryClient();
  test("renders without crashing", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ArticlesCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Title")).toBeInTheDocument();
    });
  });

  test("on submit, makes request to backend, and redirects to /articles", async () => {
    const queryClient = new QueryClient();
    const article = {
      id: 1,
      title: "Team02 Github Main Page",
      url: "https://github.com/ucsb-cs156-f25/team02-f25-06",
      explanation: "Link to our main page",
      email: "test@ucsb.edu",
      dateAdded: "2025-10-29T19:10:00",
    };

    axiosMock.onPost("/api/articles/post").reply(202, article);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ArticlesCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Title")).toBeInTheDocument();
    });

    const titleInput = screen.getByLabelText("Title");

    const urlInput = screen.getByLabelText("Url");

    const explanationInput = screen.getByLabelText("Explanation");

    const emailInput = screen.getByLabelText("Email");

    const dateAddedInput = screen.getByLabelText("Date Added (iso format)");

    const createButton = screen.getByText("Create");

    fireEvent.change(titleInput, {
      target: { value: "Team02 Github Main Page" },
    });
    fireEvent.change(urlInput, {
      target: { value: "https://github.com/ucsb-cs156-f25/team02-f25-06" },
    });
    fireEvent.change(explanationInput, {
      target: { value: "Link to our main page" },
    });
    fireEvent.change(emailInput, { target: { value: "test@ucsb.edu" } });
    fireEvent.change(dateAddedInput, {
      target: { value: "2025-10-29T19:10" },
    });

    expect(createButton).toBeInTheDocument();
    fireEvent.click(createButton);

    await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

    expect(axiosMock.history.post[0].params).toEqual({
      title: "Team02 Github Main Page",
      url: "https://github.com/ucsb-cs156-f25/team02-f25-06",
      explanation: "Link to our main page",
      email: "test@ucsb.edu",
      dateAdded: "2025-10-29T19:10",
    });

    // assert - check that the toast was called with the expected message
    expect(mockToast).toBeCalledWith(
      "New article Created - id: 1 title: Team02 Github Main Page explanation: Link to our main page email: test@ucsb.edu dateAdded: 2025-10-29T19:10:00",
    );
    expect(mockNavigate).toBeCalledWith({ to: "/articles" });
  });
});
