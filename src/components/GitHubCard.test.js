import { render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import GitHubCard from "./githubCard";

const DEFAULT_MOCK_DATA = {
    name: 'alpha one',
    html_url: 'https://placekitten.com/200/300',
    bio:'crazy'
}

describe('Test GitHubCard',() => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify(DEFAULT_MOCK_DATA));
        render(<GitHubCard/>);
    })
    afterEach(() => {
        fetch.resetMocks();
    })
    test('it contains a photo of the github user', async () => {
        const avatarImage = await waitFor(() => screen.getAllByAltText('git by avatar'));
        expect(avatarImage).toHaveAttribute('src',
        expect.stringContaining(DEFAULT_MOCK_DATA.avatar_url)
        );
    });

    test('it contains the name of the github user', async() => {
        const userName = await waitFor(() => screen.getByRole('heading', { level: 2 }));
        expect(userName).toHaveTextContent(DEFAULT_MOCK_DATA.name)
    });

    test('it contains the blurb about the github user', async() => {
        const blurb = await waitFor(() => screen.getByRole('paragraph'));
        expect(blurb).toHaveTextContent(DEFAULT_MOCK_DATA.bio)
    });

    test('it renders a snapshot', () => {
        const tree = renderer.create(<GitHubCard/>).toJSON();
        expect(tree).toMatchSnapshot();
    });


})