import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu, Popup } from 'semantic-ui-react';

class MenuQuestbook extends React.Component {
  render() {
    return (
      <Menu inverted>
        <Menu.Item as={NavLink} name="Completed" activeClassName="active" to="/questbook" color="green" exact>
          All
        </Menu.Item>
        <Menu.Item as={NavLink} name="Completed" activeClassName="active" to="/questbook/completed" color="green" exact>
          Completed
        </Menu.Item>

        <Menu.Item as={NavLink} name="Uncompleted" color="green" to="/questbook/uncomleted">
          Uncompleted
        </Menu.Item>
        <Menu.Item as={NavLink} name="Failed" color="green" to="/questbook/failed">
          Failed
        </Menu.Item>
        <Popup
          content="Add your own quest now!"
          trigger={
            <Menu.Item as={NavLink} name="Failed" color="green" to="/questbook/newQuest" position="right">
              <Icon name="add" />
              Add new quest
            </Menu.Item>
          }
        />
      </Menu>
    );
  }
}

export default MenuQuestbook;
