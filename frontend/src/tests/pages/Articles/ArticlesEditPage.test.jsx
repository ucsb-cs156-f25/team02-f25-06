import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import ArticlesEditPage from "main/pages/Articles/ArticlesEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "tests/testutils/mockConsole";

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
    useParams: vi.fn(() => ({
      id: 17,
    })),
    Navigate: vi.fn((x) => {
      mockNavigate(x);
      return null;
    }),
  };
});

let axiosMock;
describe("ArticlesEditPage tests", () => {
  describe("when the backend doesn't return data", () => {
    beforeEach(() => {
      axiosMock = new AxiosMockAdapter(axios);
      axiosMock.reset();
      axiosMock.resetHistory();
      axiosMock
        .onGet("/api/currentUser")
        .reply(200, apiCurrentUserFixtures.userOnly);
      axiosMock
        .onGet("/api/systemInfo")
        .reply(200, systemInfoFixtures.showingNeither);
      axiosMock.onGet("/api/articles", { params: { id: 17 } }).timeout();
    });

    afterEach(() => {
      mockToast.mockClear();
      mockNavigate.mockClear();
      axiosMock.restore();
      axiosMock.resetHistory();
    });

    const queryClient = new QueryClient();
    test("renders header but form is not present", async () => {
      const restoreConsole = mockConsole();

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ArticlesEditPage />
          </MemoryRouter>
        </QueryClientProvider>,
      );
      await screen.findByText("Edit Article");
      expect(screen.queryByTestId("Article-title")).not.toBeInTheDocument();
      restoreConsole();
    });
  });

  describe("tests where backend is working normally", () => {
    beforeEach(() => {
      axiosMock = new AxiosMockAdapter(axios);
      axiosMock.reset();
      axiosMock.resetHistory();
      axiosMock
        .onGet("/api/currentUser")
        .reply(200, apiCurrentUserFixtures.userOnly);
      axiosMock
        .onGet("/api/systemInfo")
        .reply(200, systemInfoFixtures.showingNeither);
      axiosMock.onGet("/api/articles", { params: { id: 17 } }).reply(200, {
        id: 17,
        title: "Team02 Github Main Page",
        url: "https://github.com/ucsb-cs156-f25/team02-f25-06",
        explanation: "Link to our main page",
        email: "natalieforte@ucsb.edu",
        dateAdded: "2025-10-29T19:10",
      });
      axiosMock.onPut("/api/articles").reply(200, {
        id: "17",
        title: "Team02 Github Repo",
        url: "github.com/ucsb-cs156-f25/team02-f25-06",
        explanation: "Link to our repo",
        email: "fortenatalie@ucsb.edu",
        dateAdded: "2025-11-03T18:59",
      });
    });

    afterEach(() => {
      mockToast.mockClear();
      mockNavigate.mockClear();
      axiosMock.restore();
      axiosMock.resetHistory();
    });

    const queryClient = new QueryClient();

    test("Is populated with the data provided, and changes when data is changed", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ArticlesEditPage />
          </MemoryRouter>
        </QueryClientProvider>,
      );

      await screen.findByTestId("ArticlesForm-id");

      const idField = screen.getByTestId("ArticlesForm-id");
      const titleField = screen.getByLabelText("Title");
      const urlField = screen.getByLabelText("Url");
      const explanationField = screen.getByLabelText("Explanation");
      const emailField = screen.getByLabelText("Email");
      const dateAddedField = screen.getByLabelText("Date Added (iso format)");
      const submitButton = screen.getByText("Update");

      expect(idField).toBeInTheDocument();
      expect(idField).toHaveValue("17");
      expect(titleField).toBeInTheDocument();
      expect(titleField).toHaveValue("Team02 Github Main Page");
      expect(urlField).toBeInTheDocument();
      expect(urlField).toHaveValue(
        "https://github.com/ucsb-cs156-f25/team02-f25-06",
      );
      expect(explanationField).toBeInTheDocument();
      expect(explanationField).toHaveValue("Link to our main page");
      expect(emailField).toBeInTheDocument();
      expect(emailField).toHaveValue("natalieforte@ucsb.edu");
      expect(dateAddedField).toBeInTheDocument();
      expect(dateAddedField).toHaveValue("2025-10-29T19:10");

      expect(submitButton).toHaveTextContent("Update");

      fireEvent.change(titleField, {
        target: { value: "Team02 Github Repo" },
      });
      fireEvent.change(urlField, {
        target: { value: "github.com/ucsb-cs156-f25/team02-f25-06" },
      });
      fireEvent.change(explanationField, {
        target: { value: "Link to our repo" },
      });
      fireEvent.change(emailField, {
        target: { value: "fortenatalie@ucsb.edu" },
      });
      fireEvent.change(dateAddedField, {
        target: { value: "2025-11-03T18:59" },
      });

      fireEvent.click(submitButton);

      await waitFor(() => expect(mockToast).toHaveBeenCalled());
      expect(mockToast).toHaveBeenCalledWith(
        "Article Updated - id: 17 title: Team02 Github Repo url: github.com/ucsb-cs156-f25/team02-f25-06 explanation: Link to our repo email: fortenatalie@ucsb.edu dateAdded: 2025-11-03T18:59",
      );

      expect(mockNavigate).toHaveBeenCalledWith({ to: "/articles" });

      expect(axiosMock.history.put.length).toBe(1); // times called
      expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
      expect(axiosMock.history.put[0].data).toBe(
        JSON.stringify({
          title: "Team02 Github Repo",
          url: "github.com/ucsb-cs156-f25/team02-f25-06",
          explanation: "Link to our repo",
          email: "fortenatalie@ucsb.edu",
          dateAdded: "2025-11-03T18:59",
        }),
      ); // posted object
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/articles" });
    });
  });
});
