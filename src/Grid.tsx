import * as React from "react";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CardDeck, parseDeck, shuffle } from './decks';
import { PlayingCard, EmptyCard, DisplayCard} from './PlayingCard';

//randomly deal cards out into a 5x5 grid
export function GridMode(prop: {deck:CardDeck}): JSX.Element {
    const flattened:PlayingCard[] = parseDeck(prop.deck.cards).reduce((accumulator, value) => accumulator.concat(value), []);
    const shuffled:PlayingCard[] = shuffle(flattened);
    const cardsUsed:PlayingCard[] = shuffled.slice(0, 24);
    const blankCard = new EmptyCard("shouldn't see this");

    const [cardsOpened, setCardsOpened] = React.useState(0);
    const [recentCard, setRecentCard] = React.useState<PlayingCard>(blankCard);

    //create two dim array of playing cards for grid
    const [cardGrid, setGrid] = React.useState([
        [cardsUsed[0], cardsUsed[1], cardsUsed[2], cardsUsed[3], cardsUsed[4]],
        [cardsUsed[5], cardsUsed[6], cardsUsed[7], cardsUsed[8], cardsUsed[9]],
        [cardsUsed[10], cardsUsed[11], new EmptyCard("Uncover any of the surrounding 8 cards"), cardsUsed[12], cardsUsed[13]],
        [cardsUsed[14], cardsUsed[15], cardsUsed[16], cardsUsed[17], cardsUsed[18]],
        [cardsUsed[19], cardsUsed[20], cardsUsed[21], cardsUsed[22], cardsUsed[23]]
    ]);

    //disable uncover buttons for all cards
    for (let card of cardsUsed) {
        card.disableButton();
    }

    function uncoverCard(row:number, col:number):void {
        cardGrid[row][col].uncover();
        cardGrid[row][col].select();
        if (recentCard !== blankCard) {
            recentCard.deselect();
        }
        if (cardsOpened === 0) {
            disableInnerMostCards();
            cardGrid[2][2] = new EmptyCard("Only cards next to previously opened cards can be uncovered")
        }
        if (row > 0) {
            cardGrid[row - 1][col].enableButton();
        }
        if (row < 4) {
            cardGrid[row + 1][col].enableButton();
        }
        if (col > 0) {
            cardGrid[row][col - 1].enableButton();
        }
        if (col < 4) {
            cardGrid[row][col + 1].enableButton();
        }
        setRecentCard(cardGrid[row][col]);
        setGrid(cardGrid);
        setCardsOpened(cardsOpened + 1);
    }

    function disableInnerMostCards() {
        cardGrid[1][1].disableButton();
        cardGrid[1][2].disableButton();
        cardGrid[1][3].disableButton();
        cardGrid[2][1].disableButton();
        cardGrid[2][3].disableButton();
        cardGrid[3][1].disableButton();
        cardGrid[3][2].disableButton();
        cardGrid[3][3].disableButton();
    }

    //enable the innermost cards
    if (cardsOpened === 0) {
        cardGrid[1][1].enableButton();
        cardGrid[1][2].enableButton();
        cardGrid[1][3].enableButton();
        cardGrid[2][1].enableButton();
        cardGrid[2][3].enableButton();
        cardGrid[3][1].enableButton();
        cardGrid[3][2].enableButton();
        cardGrid[3][3].enableButton();
    }

    function GridSquare(row:number, col:number):JSX.Element {
        return (
            <Col>{DisplayCard(cardGrid[row][col], ()=>{uncoverCard(row,col)})}</Col>
        )
    }

    function GridRow(row:number, cols:number):JSX.Element {

        let rowArr = [];
        for (let i = 0; i < cols; i++) {
            rowArr.push(GridSquare(row, i));
        }

        return (
            <Row className="justify-content-center" sm={5} xs = {5}>
                {rowArr}
            </Row>
        )
    }

    return (
        <Container>
            {GridRow(0, 5)}
            <br />
            {GridRow(1, 5)}
            <br />
            {GridRow(2, 5)}
            <br />
            {GridRow(3, 5)}
            <br />
            {GridRow(4, 5)}
        </Container>
    )
}