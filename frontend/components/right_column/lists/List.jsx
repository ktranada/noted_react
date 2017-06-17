import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import ListCardForm from './ListCardForm';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.createCard = this.createCard.bind(this);
    this.viewCard = this.viewCard.bind(this);
  }
  createCard(data) {
    const card = Object.assign({}, data, {
      ord: this.props.cards.length,
      list_id: this.props.list.id
    })
    return this.props.createCard(card);
  }

  viewCard(id) {
    return () => {
      this.props.history.push(`/boards/${this.props.list.board_id}/card/${id}`);
    }
  }

  render() {
    const { list, cards} = this.props;

    return (
      <div className="list-index__item-wrapper">
        <div className="list-index__item">
          <header>{list.title}</header>
          <hr />
          <ul className="list__cards">
            {
              cards.map(card => (
                <Card
                  viewCard={this.viewCard(card.id)}
                  key={card.id}
                  title={card.title} />)
              )
            }
          </ul>

          <ListCardForm type="card" createItem={this.createCard} />
        </div>
      </div>
    )
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default List;
