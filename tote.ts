/**
 * Represents a score object with home and away scores.
 *
 * @interface
 * @property {number} home - The home score.
 * @property {number} away - The away score.
 */
interface IScore {
    home: number;
    away: number;
}

/**
 * Represents a collection of predictions made by different users.
 * @interface
 */
interface IPredictions {
    [user: string]: string;
}

/**
 * Represents the points associated with each user.
 * @interface
 */
interface IUserPoints {
    [user: string]: number
}

/**
 * Parses a score string and returns the score as an object.
 *
 * @param {string} score - The score string in the format "home:away".
 * @returns {IScore} - The parsed score object with home and away properties representing the scores.
 */
const parseScore = (score: string): IScore => {
    const [home, away] = score.split(':').map(Number);
    return {home, away};
};

/**
 * Calculates points for each user based on their predictions and the actual result.
 * @param {IPredictions} predictions - The predictions made by each user.
 * @param {string} actualResult - The actual result.
 * @returns {Object} - An object containing each user and their corresponding points.
 */
const calculatePoints = (predictions: IPredictions, actualResult: string): IUserPoints => {
    const actualScore = parseScore(actualResult);
    const userPoints: IUserPoints = {};

    Object.entries(predictions).forEach(([user, guess]) => {
        const guessedScore = parseScore(guess); // Ensure we are parsing the guess correctly
        userPoints[user] = calculateOutcome(guessedScore, actualScore);
    });

    return userPoints;
};

/**
 * Calculates the outcome based on the provided guess and actual scores.
 * @param {IScore} guess - The guessed score.
 * @param {IScore} actual - The actual score.
 * @return {number} - The outcome:
 *  - 2 if the guess matches the actual score (both home and away).
 *  - 1 if the guess has the same result as the actual score (win-win, lose-lose, or draw-draw).
 *  - 0 if the guess does not match the actual score.
 */
const calculateOutcome = (guess: IScore, actual: IScore): number => {
    if (guess.home === actual.home && guess.away === actual.away) {
        return 2;
    } else if ((guess.home > guess.away && actual.home > actual.away) ||
        (guess.home < guess.away && actual.home < actual.away) ||
        (guess.home === guess.away && actual.home === actual.away)) {
        return 1;
    }
    return 0;
};


const predictions = {
    'user1': '3:2',
    'user2': '1:0',
    'user3': '2:3',
    'user4': '3:4',
};

const actualResult = '3:4';
const points = calculatePoints(predictions, actualResult);

console.log(points);