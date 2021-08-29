import * as React from "react";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CardDeck, parseDeck, shuffleDeck } from './decks';
import { PlayingCard, EmptyCard, DisplayCard} from './PlayingCard';

function Pile(cards:PlayingCard[], category:string): JSX.Element {
    cards.unshift(new EmptyCard("No more cards"));
    const [coveredPile, setCovered] = React.useState<PlayingCard[]>(cards);
    const [uncoveredPile, setUncovered] = React.useState<PlayingCard[]>([new EmptyCard("No cards opened")]);
    const [render, toggleRender] = React.useState(true); // used to force React to render

    const nextCard = () => {
        const temp:PlayingCard | undefined = coveredPile.pop()
        const next:PlayingCard = temp === undefined ? new EmptyCard("No more cards") : temp;
        next.uncover();
        next.disableButton();
        uncoveredPile.push(next);
        setCovered(coveredPile);
        setUncovered(uncoveredPile);
        toggleRender(render === true ? false : true);
    }

    return (
        <Container>
          <Col>
            <Row className="justify-content-md-center"><h2>{category}</h2></Row>
            <Row className="justify-content-md-center"><h5>Cards Remaining: {coveredPile.length - 1}</h5></Row>
            <Row className="justify-content-md-center">
              {DisplayCard(coveredPile[coveredPile.length - 1], nextCard)}
            </Row>
            <br />
            <br />
            <Row className="justify-content-md-center">{DisplayCard(uncoveredPile[uncoveredPile.length - 1], () => {})}</Row>
          </Col>
        </Container>
    )

}

export function CategoriesMode(prop:{deck: CardDeck}) {
  const shuffled:PlayingCard[][] = shuffleDeck(parseDeck(prop.deck.cards));
  let categories:string[] = prop.deck.categories;
  let display:JSX.Element[] = categories.map(category => <Col md="auto">{Pile(shuffled[categories.indexOf(category)], category)}</Col>);
  return (
        <Container fluid>
          <Row className="justify-content-md-center">
            {display}
          </Row>
        </Container>
      )
}