import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.viewCard = this.viewCard.bind(this);
  }

  viewCard(id) {
    return () => this.props.viewCard(id);
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
          <button
            type="button"
            className="button button-bluegrey-light">
            <i className="material-icons">&#xE145;</i>
          </button>
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
