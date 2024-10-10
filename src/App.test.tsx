import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./components/mole', () => ({
  __esModule: true,
  default: ({ onClick, onClickNoMole, isVisible }: any) => (
    <div data-testid="mole-hole">
      <div className="mole" onClick={isVisible ? onClick : onClickNoMole}>
        {isVisible && <img src="mole.png" alt="mole-pic" width={60} />}
      </div>
    </div>
  ),
}));

describe('Whack-A-Mole Game', () => {
  beforeEach(() => {
    jest.useFakeTimers(); 
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should render the game and start the timer when "Start The Game" is clicked', () => {
    render(<App />);
    
    const startButton = screen.getByText('Start The Game');
    expect(startButton).toBeInTheDocument();
    
    fireEvent.click(startButton);

    // Expect the timer to start at 0
    expect(screen.getByText('Time Elapsed: 0 seconds')).toBeInTheDocument();
    
    // Fast-forward 3 seconds
    jest.advanceTimersByTime(3000);

    // Expect the time elapsed to be updated
    expect(screen.getByText('Time Elapsed: 3 seconds')).toBeInTheDocument();
  });

  test('should display an alert when the mole is clicked', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<App />);
    
    // Start the game
    const startButton = screen.getByText('Start The Game');
    fireEvent.click(startButton);

    // Fast-forward to show the mole
    jest.advanceTimersByTime(200); // Fast-forward to random time

    // Find the mole hole and simulate a mole click
    const moleHole = screen.getAllByTestId('mole-hole')[0]; // Assuming it's the first one
    fireEvent.click(moleHole);

    // Expect the alert to show time and clicks info
    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Time Elapsed: 0 seconds\nTotal Click: 1'));
    
    // Cleanup
    alertMock.mockRestore();
  });

  test('should increment clicks when clicking on a non-mole hole', () => {
    render(<App />);

    // Start the game
    const startButton = screen.getByText('Start The Game');
    fireEvent.click(startButton);

    // Find the first mole hole and simulate a click when no mole is visible
    const moleHole = screen.getAllByTestId('mole-hole')[0];
    fireEvent.click(moleHole);

    // Check that the clicks counter increased
    expect(screen.getByText('Clicks: 1')).toBeInTheDocument();
  });

  test('should stop the game when mole is clicked', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<App />);

    // Start the game
    const startButton = screen.getByText('Start The Game');
    fireEvent.click(startButton);

    // Fast-forward to show the mole
    jest.advanceTimersByTime(200);

    // Find the mole hole and simulate a mole click
    const moleHole = screen.getAllByTestId('mole-hole')[0];
    fireEvent.click(moleHole);

    // Fast-forward some time after mole click
    jest.advanceTimersByTime(1000);

    // Ensure that the timer stopped at 0 after mole is clicked
    expect(screen.getByText('Time Elapsed: 0 seconds')).toBeInTheDocument();

    // Cleanup
    alertMock.mockRestore();
  });
});
