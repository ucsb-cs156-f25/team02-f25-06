import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HelpRequestCreatePage from "main/pages/HelpRequests/HelpRequestCreatePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { expect } from "vitest";

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

describe("HelpRequestCreatePage tests", () => {
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
                    <HelpRequestCreatePage/>
                </MemoryRouter>
            </QueryClientProvider>,
        );

        await waitFor(() => {
            expect(screen.getByLabelText("RequesterEmail")).toBeInTheDocument();
        });
    });

    test("when you fill in the form and hit submit, it makes a request to /helprequests", async () => {
        const queryClient = new QueryClient();

        const expectedPost = {
            requesterEmail: "andrewshen@ucsb.edu",
            teamId: "team06",
            tableOrBreakoutRoom: "Table 6",
            requestTime: "2025-11-10T12:00:00",
            explanation: "Help me please",
            solved: "false",
        };

        const helpRequest = {
            id: 7,
            ...expectedPost,
        };

        axiosMock.onPost("/api/helprequests/post").reply(202, helpRequest);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestCreatePage/>
                </MemoryRouter>
            </QueryClientProvider>,
        );

        await waitFor(() => {
            expect(screen.getByLabelText("RequesterEmail")).toBeInTheDocument();
        });

        const requesterEmailInput = screen.getByLabelText("RequesterEmail");
        expect(requesterEmailInput).toBeInTheDocument();

        const teamIdInput = screen.getByLabelText("TeamId");
        expect(teamIdInput).toBeInTheDocument();

        const tableOrBreakoutRoomInput = screen.getByLabelText("TableOrBreakoutRoom");
        expect(tableOrBreakoutRoomInput).toBeInTheDocument();

        const requestTimeInput = screen.getByLabelText("RequestTime");
        expect(requestTimeInput).toBeInTheDocument();

        const explanationInput = screen.getByLabelText("Explanation");
        expect(explanationInput).toBeInTheDocument();

        const solvedInput = screen.getByLabelText("Solved");
        expect(solvedInput).toBeInTheDocument();

        const createButton = screen.getByText("Create");
        expect(createButton).toBeInTheDocument();

        fireEvent.change(requesterEmailInput, { target: { value: "andrewshen@ucsb.edu" } });
        fireEvent.change(teamIdInput, { target: { value: "team06" } });
        fireEvent.change(tableOrBreakoutRoomInput, { target: { value: "Table 6" } });
        fireEvent.change(requestTimeInput, { target: { value: "2025-11-10T12:00:00" } });
        fireEvent.change(explanationInput, { target: { value: "Help me please" } });
        fireEvent.change(solvedInput, { target: { value: "false" } });

        fireEvent.click(createButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(expectedPost);

        expect(mockToast).toHaveBeenCalledWith("New HelpRequest Created - id: 7 requesterEmail: andrewshen@ucsb.edu");
        expect(mockNavigate).toHaveBeenCalledWith({ to: "/helprequests" });
    });
});
