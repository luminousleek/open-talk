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

    //disable uncover buttons for all cards
    for (let card of cardsUsed) {
        card.disableButton();
    }

    function uncoverCard(row:number, col:number):void {
        gridArray[row][col].uncover();
        gridArray[row][col].select();
        if (recentCard !== blankCard) {
            recentCard.deselect();
        }
        if (cardsOpened === 0) {
            disableInnerMostCards();
            gridArray[2][2] = new EmptyCard("Only cards adjacent to previously opened cards can be uncovered")
        }
        if (row > 0) {
            gridArray[row - 1][col].enableButton();
        }
        if (row < 4) {
            gridArray[row + 1][col].enableButton();
        }
        if (col > 0) {
            gridArray[row][col - 1].enableButton();
        }
        if (col < 4) {
            gridArray[row][col + 1].enableButton();
        }
        setRecentCard(gridArray[row][col]);
        setGrid(gridArray);
        setCardsOpened(cardsOpened + 1);
    }

    function disableInnerMostCards() {
        gridArray[1][1].disableButton();
        gridArray[1][2].disableButton();
        gridArray[1][3].disableButton();
        gridArray[2][1].disableButton();
        gridArray[2][3].disableButton();
        gridArray[3][1].disableButton();
        gridArray[3][2].disableButton();
        gridArray[3][3].disableButton();
    }

    //create two dim array of playing cards for grid
    const [gridArray, setGrid] = React.useState([
        [cardsUsed[0], cardsUsed[1], cardsUsed[2], cardsUsed[3], cardsUsed[4]],
        [cardsUsed[5], cardsUsed[6], cardsUsed[7], cardsUsed[8], cardsUsed[9]],
        [cardsUsed[10], cardsUsed[11], new EmptyCard("Uncover any of the surrounding 8 cards"), cardsUsed[12], cardsUsed[13]],
        [cardsUsed[14], cardsUsed[15], cardsUsed[16], cardsUsed[17], cardsUsed[18]],
        [cardsUsed[19], cardsUsed[20], cardsUsed[21], cardsUsed[22], cardsUsed[23]]
    ]);

    //enable the innermost cards
    if (cardsOpened === 0) {
        gridArray[1][1].enableButton();
        gridArray[1][2].enableButton();
        gridArray[1][3].enableButton();
        gridArray[2][1].enableButton();
        gridArray[2][3].enableButton();
        gridArray[3][1].enableButton();
        gridArray[3][2].enableButton();
        gridArray[3][3].enableButton();
    }

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md="auto">{DisplayCard(gridArray[0][0], ()=>{uncoverCard(0,0)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[0][1], ()=>{uncoverCard(0,1)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[0][2], ()=>{uncoverCard(0,2)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[0][3], ()=>{uncoverCard(0,3)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[0][4], ()=>{uncoverCard(0,4)})}</Col>
            </Row>
            <br />
            <Row className="justify-content-center">
                <Col md="auto">{DisplayCard(gridArray[1][0], ()=>{uncoverCard(1,0)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[1][1], ()=>{uncoverCard(1,1)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[1][2], ()=>{uncoverCard(1,2)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[1][3], ()=>{uncoverCard(1,3)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[1][4], ()=>{uncoverCard(1,4)})}</Col>
            </Row>
            <br />
            <Row className="justify-content-center">
                <Col md="auto">{DisplayCard(gridArray[2][0], ()=>{uncoverCard(2,0)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[2][1], ()=>{uncoverCard(2,1)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[2][2], ()=>{uncoverCard(2,2)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[2][3], ()=>{uncoverCard(2,3)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[2][4], ()=>{uncoverCard(2,4)})}</Col>
            </Row>
            <br />
            <Row className="justify-content-center">
                <Col md="auto">{DisplayCard(gridArray[3][0], ()=>{uncoverCard(3,0)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[3][1], ()=>{uncoverCard(3,1)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[3][2], ()=>{uncoverCard(3,2)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[3][3], ()=>{uncoverCard(3,3)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[3][4], ()=>{uncoverCard(3,4)})}</Col>
            </Row>
            <br />
            <Row className="justify-content-center">
                <Col md="auto">{DisplayCard(gridArray[4][0], ()=>{uncoverCard(4,0)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[4][1], ()=>{uncoverCard(4,1)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[4][2], ()=>{uncoverCard(4,2)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[4][3], ()=>{uncoverCard(4,3)})}</Col>
                <Col md="auto">{DisplayCard(gridArray[4][4], ()=>{uncoverCard(4,4)})}</Col>
            </Row>
        </Container>
    )
}