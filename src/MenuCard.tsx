import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function MenuCard(prop:{header: string, title: string, cardText: string, buttonText: string, onClick:() => void, disableButton:boolean}): JSX.Element {
    
    const card = (
        <>
            <Card style={{ width: '15rem', height: '20rem'}}>
                <Card.Header>{prop.header}</Card.Header>
                <Card.Body>
                <Card.Title>{prop.title}</Card.Title>
                <Card.Text>{prop.cardText}</Card.Text>
                </Card.Body>
                <Button variant="info" onClick={prop.onClick} disabled = {prop.disableButton}>{prop.buttonText} </Button>
            </Card>
            <br />
        </>
        
    )
    return card;
}